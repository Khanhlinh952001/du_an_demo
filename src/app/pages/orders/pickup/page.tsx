"use client"
import { useState, useEffect } from 'react';
import MainLayout from "@/layout/MainLayout";
import { mockPickups } from "@/mocks/PickupMock";
import { Input, Table, Button, DatePicker, Space, Card, Modal, message, Dropdown, Tabs, Calendar, Tag, Select } from "antd";
import { PickupModal } from "@/components/modals/PickupModal";
import type { PickupInfo } from "@/types/Pickup";
import dayjs from 'dayjs';
import { createColumns } from './columns';
import * as XLSX from 'xlsx';
import { DownloadOutlined, UploadOutlined, PlusOutlined, CalendarOutlined, LinkOutlined, QrcodeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ColumnVisibilityControl from '@/components/common/ColumnVisibilityControl';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import ExportModal from '@/components/common/ExportModal';
import { QRCodeSVG } from 'qrcode.react';
import { nanoid } from 'nanoid';
import { formatDate } from '@/utils/format';
import { senderMockData } from '@/mocks/senderMockData';
import { getCustomerById } from '@/utils/orderHelpers';

const { Search } = Input;
const { RangePicker } = DatePicker;

function PickUpPage() {
    const [searchResults, setSearchResults] = useState<PickupInfo[]>(mockPickups);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPickup, setSelectedPickup] = useState<PickupInfo | undefined>();
    const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [todayPickups, setTodayPickups] = useState<PickupInfo[]>([]);
    const [selectedPickups, setSelectedPickups] = useState<PickupInfo[]>([]);
    const [qrModalVisible, setQrModalVisible] = useState(false);
    const [currentQrUrl, setCurrentQrUrl] = useState('');
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
    const [historyPickups, setHistoryPickups] = useState<PickupInfo[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => {
        // Lọc các đơn pickup của ngày hôm nay
        const today = dayjs().format('YYYY-MM-DD');
        const todaysList = mockPickups.filter(pickup => 
            pickup.isAddedToTodayList && 
            dayjs(pickup.pickupDate).format('YYYY-MM-DD') === today
        );
        setTodayPickups(todaysList);
    }, []);

    const refreshData = () => {
        setSearchResults(mockPickups);
        setDateRange([null, null]);
    };

    const handleSearch = (value: string) => {
        let filtered = mockPickups;

        // Lọc theo trạng thái trước
        if (statusFilter !== 'all') {
            filtered = filtered.filter(pickup => pickup.status === statusFilter);
        }

        // Sau đó lọc theo text search nếu có
        if (value.trim()) {
            filtered = filtered.filter(pickup => {
                const sender = getCustomerById(senderMockData, pickup.senderId || '');
                return (
                    sender?.name?.toLowerCase().includes(value.toLowerCase()) ||
                    sender?.phone?.includes(value)
                );
            });
        }

        setSearchResults(filtered);
    };

    const handleStatusChange = (value: string) => {
        setStatusFilter(value);
        let filtered = mockPickups;

        if (value !== 'all') {
            filtered = mockPickups.filter(pickup => pickup.status === value);
        }

        setSearchResults(filtered);
    };

    const handleDateRangeChange = (dates: any) => {
        if (!dates) {
            setSearchResults(mockPickups);
            return;
        }

        const [start, end] = dates;
        const filtered = mockPickups.filter(pickup => {
            const pickupDate = dayjs(pickup.pickupDate);
            return pickupDate.isAfter(start) && pickupDate.isBefore(end);
        });
        setSearchResults(filtered);
    };

    const columns = createColumns(setSelectedPickup, setIsModalOpen);

    const columnConfigs = [
        { key: 'pickupId', label: 'Mã PickUp' },
        { key: 'SenderInformation', label: 'Thông tin người gửi' },
        { key: 'PickUpInformation', label: 'Thông tin lấy hàng' },
        { key: 'PackInformation', label: 'Chi tiết gói hàng' },
        { key: 'status', label: 'Trạng Thái' },
        { key: 'pickupFee', label: 'Phí pickup' },
    ];

    const defaultVisibleColumns = {
        pickupId: true,
        SenderInformation: true,
        PickUpInformation: true,
        PackInformation: true,
        status: true,
        pickupFee: false,
    };

    const {
        visibleColumns,
        handleColumnVisibilityChange,
        filteredColumns
    } = useColumnVisibility(columns, defaultVisibleColumns);

    const pickupExportConfig = [
        { key: 'pickupId', label: 'Mã PickUp' },
        { key: 'pickupDate', label: 'Ngày Lấy Hàng' },
        { key: 'senderName', label: 'Người Gửi' },
        { key: 'senderPhone', label: 'Số Điện Thoại' },
        { key: 'address', label: 'Địa Chỉ' },
        { key: 'status', label: 'Trạng Thái' },
        { key: 'note', label: 'Ghi Chú' },
    ];

    const handleExport = (selectedFields: string[]) => {
        const exportData = searchResults.map(pickup => {
            const exportItem: any = {};
            selectedFields.forEach(field => {
                exportItem[pickupExportConfig.find(c => c.key === field)?.label || field] = pickup[field as keyof PickupInfo];
            });
            return exportItem;
        });
        
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Danh sách pickup");
        XLSX.writeFile(wb, "danh-sach-pickup.xlsx");
        setIsExportModalOpen(false);
    };

    const handleUpdateFromExcel = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json<PickupInfo>(worksheet);
            setSearchResults(jsonData);
        };
        reader.readAsArrayBuffer(file);
    };

    const generateTemporaryLink = (pickup: PickupInfo) => {
        const tempId = nanoid(10);
        const expiryDate = new Date();
        expiryDate.setHours(23, 59, 59, 999); // Hết hạn cuối ngày

        const newLink = {
            url: `${window.location.origin}/pickup/temp/${tempId}`,
            expiresAt: expiryDate,
            isActive: true
        };

        // Cập nhật pickup với link mới
        const updatedPickup = {
            ...pickup,
            temporaryLink: newLink
        };

        // Cập nhật state
        setSearchResults(prevResults =>
            prevResults.map(p => p.pickupId === pickup.pickupId ? updatedPickup : p)
        );

        return newLink;
    };

    const addToTodayList = (pickups: PickupInfo[]) => {
        const updatedPickups = pickups.map(pickup => ({
            ...pickup,
            isAddedToTodayList: true,
            addedToListAt: formatDate(new Date()) 
        }));

        setTodayPickups(prev => [...prev, ...updatedPickups]);
        message.success(`Đã thêm ${pickups.length} đơn vào danh sách lấy hàng hôm nay`);
    };

    const showQrCode = (url: string) => {
        setCurrentQrUrl(url);
        setQrModalVisible(true);
    };

    const getPickupsByDate = (date: dayjs.Dayjs) => {
        return mockPickups.filter(pickup => 
            pickup.isAddedToTodayList && 
            dayjs(pickup.pickupDate).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
        );
    };

    const handleDateSelect = (date: dayjs.Dayjs) => {
        setSelectedDate(date);
        const datePickups = getPickupsByDate(date);
        setHistoryPickups(datePickups);
    };

    const rescheduleToToday = (pickup: PickupInfo) => {
        const updatedPickup = {
            ...pickup,
            pickupDate: dayjs().format('YYYY-MM-DD'),
            isAddedToTodayList: true,
            addedToListAt: formatDate(new Date())
        };

        // Update both search results and today's pickups
        setSearchResults(prev => 
            prev.map(p => p.pickupId === pickup.pickupId ? updatedPickup : p)
        );
        setTodayPickups(prev => [...prev, updatedPickup]);
        message.success('Đã đặt lại lịch lấy hàng cho hôm nay');
    };

    const actionColumn = {
        title: 'Thao tác',
        key: 'action',
       
        width: 100,
        render: (_: any, record: PickupInfo) => (
            <Space>
                <Button 
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => {
                        setSelectedPickup(record);
                        setIsModalOpen(true);
                    }}
                />
                <Button 
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => {
                        Modal.confirm({
                            title: 'Xác nhận xóa',
                            content: 'Bạn có chắc chắn muốn xóa đơn pickup này?',
                            onOk() {
                                setSearchResults(prev => 
                                    prev.filter(item => item.pickupId !== record.pickupId)
                                );
                                message.success('Đã xóa đơn pickup');
                            },
                        });
                    }}
                />
            </Space>
        ),
    };

    const renderBulkActions = () => (
        <div className="mb-4 w-full flex justify-end">
            {selectedPickups.length > 0 && (
                <Space >
                    <Button
                        icon={<CalendarOutlined />}
                        onClick={() => addToTodayList(selectedPickups)}
                        type="primary"
                    >
                        Thêm {selectedPickups.length} đơn vào danh sách hôm nay
                    </Button>
                </Space>
            )}
        </div>
    );

    const generateTodayListLink = () => {
        const today = dayjs().format('YYYY-MM-DD');
        const url = `${window.location.origin}/pickup-list/${today}`;
        
        Modal.success({
            title: 'Link danh sách lấy hàng hôm nay',
            content: (
                <div>
                    <p>Link có hiệu lực trong ngày {dayjs().format('DD/MM/YYYY')}:</p>
                    <Input.TextArea 
                        value={url} 
                        readOnly 
                        autoSize 
                    />
                    <Button 
                        icon={<QrcodeOutlined />}
                        onClick={() => showQrCode(url)}
                        className="mt-2"
                    >
                        Xem QR Code
                    </Button>
                </div>
            ),
        });
    };

    return (
        <MainLayout>
            <Card className="shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 ">
                        Danh sách PickUp
                    </h1>
                    <p className="text-gray-500 mt-1 mb-4">Quản lý và theo dõi các đơn pickUp</p>
                </div>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <Space>
                            <Search
                                placeholder="Tìm theo tên/số điện thoại"
                                onSearch={handleSearch}
                                onChange={(e) => handleSearch(e.target.value)}
                                style={{ width: 300 }}
                            />
                            <Select
                                defaultValue="all"
                                style={{ width: 200 }}
                                onChange={handleStatusChange}
                                options={[
                                    { value: 'all', label: 'Tất cả trạng thái' },
                                    { value: 'completed', label: 'Đã lấy hàng' },
                                    { value: 'pending', label: 'Chưa lấy hàng' },
                                    { value: 'cancelled', label: 'Đã hủy' }
                                ]}
                            />
                            <RangePicker
                                onChange={handleDateRangeChange}
                                format="DD/MM/YYYY"
                                value={dateRange}
                            />
                        </Space>
                    </div>
                    <div className="flex space-x-3">
                        <input
                            type="file"
                            id="upload-excel"
                            accept=".xlsx,.xls"
                            onChange={handleUpdateFromExcel}
                            style={{ display: 'none' }}
                        />
                        <Button
                            icon={<UploadOutlined />}
                            onClick={() => setIsExportModalOpen(true)}
                            className="bg-green-500 hover:bg-green-600 text-white border-none"
                        >
                            Xuất Excel
                        </Button>
                        <Button
                            icon={<DownloadOutlined />}
                            className="bg-blue-500 hover:bg-blue-600 text-white border-none"
                            onClick={() => document.getElementById('upload-excel')?.click()}
                        >
                            Nhập Excel
                        </Button>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setIsModalOpen(true)}
                        >
                            Thêm yêu cầu lấy hàng
                        </Button> 
                        <Button
                            icon={<LinkOutlined />}
                            onClick={generateTodayListLink}
                            className="bg-purple-500 hover:bg-purple-600 text-white border-none"
                        >
                            Tạo link danh sách hôm nay
                        </Button>
                    </div>
                </div>

                <div className="mb-4 bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Tùy chọn hiển thị</h3>
                    <ColumnVisibilityControl
                        columns={columnConfigs}
                        visibleColumns={visibleColumns}
                        onChange={handleColumnVisibilityChange}
                    />
                </div>

                <Tabs defaultActiveKey="all" className="mb-4">
                    <Tabs.TabPane tab="Tất cả đơn" key="all">
                        {renderBulkActions()}
                        <Table 
                            rowSelection={{
                                selectedRowKeys: selectedPickups.map(p => p.pickupId),
                                onChange: (_, rows) => setSelectedPickups(rows)
                            }}
                            columns={[...filteredColumns, actionColumn]}
                            dataSource={searchResults}
                            rowKey="pickupId"
                            scroll={{ x: 1500 }}
                            pagination={{
                                pageSize: 10,
                                showSizeChanger: true,
                                showTotal: (total) => `Tổng ${total} đơn`,
                            }}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane 
                        tab={`Danh sách hôm nay (${todayPickups.length} đơn)`} 
                        key="today"
                    >
                        <Table 
                            columns={filteredColumns}
                            dataSource={todayPickups}
                            rowKey="pickupId"
                            scroll={{ x: 1500 }}
                            pagination={{
                                pageSize: 10,
                                showSizeChanger: true,
                                showTotal: (total) => `Tổng ${total} đơn`,
                            }}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Lịch sử lấy hàng" key="history">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-4">
                                <Card className="shadow-sm">
                                    <Calendar
                                        fullscreen={false}
                                        onSelect={handleDateSelect}
                                        dateCellRender={(date) => {
                                            const pickups = getPickupsByDate(date);
                                            return pickups.length > 0 ? (
                                                <div className="text-xs text-blue-500">
                                                    {pickups.length} đơn
                                                </div>
                                            ) : null;
                                        }}
                                    />
                                </Card>
                            </div>
                            <div className="col-span-8">
                                <Card 
                                    className="shadow-sm"
                                    title={selectedDate ? 
                                        `Danh sách lấy hàng ngày ${selectedDate.format('DD/MM/YYYY')}` : 
                                        'Chọn ngày để xem danh sách'
                                    }
                                >
                                    {selectedDate ? (
                                        <>
                                            <div className="mb-4">
                                                <Space>
                                                    <Tag color="blue">
                                                        Tổng số: {historyPickups.length} đơn
                                                    </Tag>
                                                    <Tag color="green">
                                                        Đã lấy: {historyPickups.filter(p => p.status === 'completed').length} đơn
                                                    </Tag>
                                                    <Tag color="orange">
                                                        Chưa lấy: {historyPickups.filter(p => p.status !== 'completed').length} đơn
                                                    </Tag>
                                                </Space>
                                            </div>
                                            <Table
                                                columns={[
                                                    ...filteredColumns,
                                                    {
                                                        title: 'Thao tác',
                                                        key: 'action',
                                                        width: 100,
                                                        render: (_: any, record: PickupInfo) => (
                                                            record.status !== 'completed' && (
                                                                <Button
                                                                    type="primary"
                                                                    size="small"
                                                                    onClick={() => rescheduleToToday(record)}
                                                                >
                                                                    Lấy hôm nay
                                                                </Button>
                                                            )
                                                        ),
                                                    }
                                                ]}
                                                dataSource={historyPickups}
                                                rowKey="pickupId"
                                                pagination={false}
                                                scroll={{ y: 400 }}
                                                rowClassName={(record) => 
                                                    record.status === 'completed' ? 'bg-green-50' : 'bg-red-50'
                                                }
                                            />
                                        </>
                                    ) : (
                                        <div className="text-center text-gray-500 py-8">
                                            Vui lòng chọn ngày từ lịch để xem danh sách
                                        </div>
                                    )}
                                </Card>
                            </div>
                        </div>
                    </Tabs.TabPane>
                </Tabs>

                <Modal
                    title="QR Code"
                    open={qrModalVisible}
                    onCancel={() => setQrModalVisible(false)}
                    footer={null}
                >
                    <div className="flex justify-center">
                        <QRCodeSVG value={currentQrUrl} size={256} />
                    </div>
                </Modal>

                <PickupModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    selectedSender={selectedPickup}
                    mode={selectedPickup ? 'edit' : 'create'}
                    onSuccess={refreshData}
                />

                <ExportModal
                    open={isExportModalOpen}
                    onCancel={() => setIsExportModalOpen(false)}
                    onExport={handleExport}
                    fields={pickupExportConfig}
                />
            </Card>
        </MainLayout>
    );
}
export default PickUpPage;

