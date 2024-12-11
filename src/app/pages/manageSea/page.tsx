"use client"
import { useState } from 'react';
import { Order } from '@/types/Order';
import { OrderMockData } from '@/mocks/OrderMock';
import { Table, Button, Card, Input, DatePicker, Select, Modal, message } from 'antd';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import ColumnVisibilityControl from '@/components/common/ColumnVisibilityControl';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import ExportModal from '@/components/common/ExportModal';
import { orderExportConfig, createExportData } from '@/configs/exportConfig';
import { columns as seaColumns } from "@/components/common/Columns";
import MainLayout from '@/layout/MainLayout';
import type { ColumnType, ColumnGroupType } from 'antd/es/table';
import dayjs from 'dayjs';
import { getCustomerForOrder, getPaymentForOrder, getRecipientForOrder } from '@/utils/orderHelpers';
import { Sender } from '@/types/Sender';
import { Recipient } from '@/types/Recipient';
import { PaymentMockData } from '@/mocks/PaymentMockData';
import { senderMockData } from '@/mocks/senderMockData';
import { recipientMockData } from '@/mocks/recipientMockData';
const { RangePicker } = DatePicker;
const { Search } = Input;

export default function ManageOrders() {
    const [filter, setFilter] = useState("");
    const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);
    const [phoneFilter, setPhoneFilter] = useState("");
    const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>("");
    const [customerIdFilter, setCustomerIdFilter] = useState("");
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [senders, setSenders] = useState<Sender[]>(senderMockData);
    const [recipients, setRecipients] = useState<Recipient[]>(recipientMockData);
    const [editingOrder, setEditingOrder] = useState<Order | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const columnConfigs = [
        { key: 'orderId', label: 'Mã Đơn Hàng' },
        { key: 'senderId', label: 'Mã KH' },
        { key: 'senderName', label: 'Người Gửi' },
        { key: 'senderPhone', label: 'SĐT Người Gửi' },
        {
          key: 'senderAddress', label: 'Dia chi gui'
        },
        {
          key: 'serviceType', label: 'Loại Vận Chuyển'
        },
        {
          key: 'receiverName', label: 'Nguoi nhan'
        },
        {
          key: 'receiverPhone', label: 'SDT Nguoi nhan'
        },
        {
          key: 'receiverRegion', label: 'Khu vuc '
          },
        {
              key: 'receiverAddress', label: 'Dia chi nhan '
        },
        { key: 'totalPackages', label: 'Số Kiện' },
        { key: 'weight', label: 'Trọng Lượng' },
        { key: 'price', label: 'Giá' },
        { key: 'totalAmount', label: 'Thành Tiền' },
        { key: 'paymentStatus', label: 'Thanh Toán' },
        {key: 'paymentDetails', label:  'Chi tiết thanh toán'},
        { key: 'note', label: 'Ghi Chú' },
      ];
    
      // Mặc định hiển thị các cột quan trọng
      const defaultVisibleColumns = {
        orderId: true,
        senderId: true,
        createdAt: true,
        senderName: true,
        senderPhone: true,
        senderAddress: true,
        serviceType: true,
        totalPackages: true,
        weight: true,
        price: true,
        receiverName: true,
        receiverPhone: true,
        receiverRegion: true,
        receiverAddress: true,
        totalAmount: true,
        paymentStatus: true,
        paymentDetails: true,
        note: false,
      };
    

    const {
        visibleColumns,
        handleColumnVisibilityChange,
        filteredColumns
    } = useColumnVisibility(seaColumns, defaultVisibleColumns);

    const filteredOrders = OrderMockData
        .filter(order => order.serviceType === 'sea')
        .filter(order => {
            // Lọc theo thời gian
            if (dateRange[0] && dateRange[1]) {
                const orderDate = dayjs(order.createdAt);
                return orderDate.isAfter(dateRange[0]) && orderDate.isBefore(dateRange[1]);
            }
            return true;
        })
        .filter(order => {
            // Improved search by name or ID
            if (filter) {
                const sender = getCustomerForOrder(senders, order.senderId);
                const recipient = getRecipientForOrder(recipients, order.recipientId);
                const searchTerm = filter.toLowerCase();
                
                return (
                    sender?.name?.toLowerCase().includes(searchTerm) ||
                    recipient?.name?.toLowerCase().includes(searchTerm) ||
                    order.orderId.toLowerCase().includes(searchTerm)
                );
            }
            return true;
        })
        .filter(order => {
            // Improved phone number search
            if (phoneFilter) {
                const sender = getCustomerForOrder(senders, order.senderId);
                const recipient = getRecipientForOrder(recipients, order.recipientId);
                const searchPhone = phoneFilter.trim();
                
                return (
                    sender?.phone?.includes(searchPhone) ||
                    recipient?.phone?.includes(searchPhone)
                );
            }
            return true;
        })
        .filter(order => {
            // Lọc theo trạng thái thanh toán
            if (paymentStatusFilter) {
                const payment = getPaymentForOrder(PaymentMockData, order.paymentId || '');
                return payment?.status === paymentStatusFilter;
            }
            return true;
        })
        .filter(order => {
            // Cải thiện tìm kiếm mã khách hàng
            if (customerIdFilter) {
                const sender = getCustomerForOrder(senders, order.senderId);
                return (
                    order.orderId.includes(customerIdFilter) ||
                    sender?.senderId.includes(customerIdFilter)
                );
            }
            return true;
        });

    const renderFilters = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <RangePicker
                className="w-full"
                placeholder={['Từ ngày', 'Đến ngày']}
                onChange={(dates) => setDateRange(dates as [dayjs.Dayjs | null, dayjs.Dayjs | null])}
            />
            
            <Search
                placeholder="Tìm theo mã khách hàng..."
                value={customerIdFilter}
                onChange={(e) => setCustomerIdFilter(e.target.value)}
                className="w-full"
            />

            <Search
                placeholder="Tìm theo số điện thoại..."
                value={phoneFilter}
                onChange={(e) => setPhoneFilter(e.target.value)}
                className="w-full"
            />

            <Select
                placeholder="Trạng thái thanh toán"
                value={paymentStatusFilter}
                onChange={setPaymentStatusFilter}
                className="w-full"
                allowClear
            >
                <Select.Option value="PAID">Đã thanh toán</Select.Option>
                <Select.Option value="PARTIAL">Thanh toán một phần</Select.Option>
                <Select.Option value="UNPAID">Chưa thanh toán</Select.Option>
            </Select>

            <Search
                placeholder="Tìm theo tên hoặc ID..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full"
            />
        </div>
    );

    const renderOrderContent = (
        title: string,
        description: string,
        columns: any[]
    ) => {
        // Tính toán các tổng
        const totalOrders = filteredOrders.length;
        const totalWeight = filteredOrders.reduce((sum, order) => sum + (order.weight || 0), 0);
        const totalAmount = filteredOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

        return (
            <>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                        <p className="text-gray-500 mt-1">{description}</p>
                    </div>
                    <div className="flex gap-3">
                        <input
                            id="upload-excel"
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={handleUpdateFromExcel}
                            className="hidden"
                        />
                        <Button
                            icon={<UploadOutlined />}
                            onClick={() => setIsExportModalOpen(true)}
                            className="bg-green-500 hover:bg-green-600 text-white border-none"
                        >
                            Xuất Excel
                        </Button>
                    </div>
                </div>

                {/* Thêm phần filters */}
                {renderFilters()}

                {/* Thêm phần hiển thị thống kê */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Tổng số đơn</p>
                        <p className="text-xl font-bold text-blue-600">{totalOrders}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Tổng khối lượng</p>
                        <p className="text-xl font-bold text-green-600">{totalWeight.toFixed(2)} kg</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Tổng tiền</p>
                        <p className="text-xl font-bold text-purple-600">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
                        </p>
                    </div>
                </div>

                <div className="mb-4 bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Tùy chỉnh hiển thị</h3>
                    <ColumnVisibilityControl
                        columns={columnConfigs}
                        visibleColumns={visibleColumns}
                        onChange={handleColumnVisibilityChange}
                    />
                </div>
                <Table 
                    columns={allColumns}
                    dataSource={filteredOrders}
                    rowKey="orderId"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Tổng số ${total} đơn hàng`,
                    }}
                    className="shadow-sm"
                    scroll={{ x: 2000 }}
                    bordered
                    size="middle"
                    rowClassName={(record, index) => 
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }
                />
            </>
        );
    };

    // Export handling
    const handleExport = (selectedFields: string[]) => {
        const exportData = createExportData(filteredOrders, selectedFields, orderExportConfig);
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Danh sách đơn hàng");
        XLSX.writeFile(wb, `danh-sach-don-hang-sea.xlsx`);
        setIsExportModalOpen(false);
    };

    // Import handling
    const handleUpdateFromExcel = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json<Order>(worksheet);
            console.log(jsonData);
        };
        reader.readAsArrayBuffer(file);
    };

    const handleEdit = (record: Order) => {
        setEditingOrder(record);
        setIsEditModalOpen(true);
    };

    const handleDelete = (orderId: string) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa đơn hàng này không?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                // Implement actual delete logic here
                message.success('Đã xóa đơn hàng thành công');
            },
        });
    };

    // Update the columns configuration to include action buttons
    const actionColumn: ColumnType<Order> = {
        title: 'Thao tác',
        key: 'action',
        width: 120,
        render: (_, record) => (
            <div className="flex gap-2">
                <Button
                    type="primary"
                    size="small"
                    onClick={() => handleEdit(record)}
                >
                    Sửa
                </Button>
                <Button
                    type="primary"
                    danger
                    size="small"
                    onClick={() => handleDelete(record.orderId)}
                >
                    Xóa
                </Button>
            </div>
        ),
    };

    // Modify the filteredColumns usage in the Table component
    const allColumns = [...filteredColumns, actionColumn] as (ColumnGroupType<Order> | ColumnType<Order>)[];

    return (
        <MainLayout>
            <Card className="shadow-lg rounded-lg">
                {renderOrderContent(
                    "Quản lý đơn hàng đường biển",
                    "Danh sách đơn hàng vận chuyển đường biển",
                    seaColumns
                )}

                <ExportModal
                    open={isExportModalOpen}
                    onCancel={() => setIsExportModalOpen(false)}
                    onExport={handleExport}
                    fields={orderExportConfig}
                />

                <Modal
                    title="Chỉnh sửa đơn hàng"
                    open={isEditModalOpen}
                    onCancel={() => {
                        setIsEditModalOpen(false);
                        setEditingOrder(null);
                    }}
                    footer={[
                        <Button 
                            key="cancel" 
                            onClick={() => {
                                setIsEditModalOpen(false);
                                setEditingOrder(null);
                            }}
                        >
                            Hủy
                        </Button>,
                        <Button 
                            key="submit" 
                            type="primary"
                            onClick={() => {
                                // Implement save logic here
                                message.success('Đã cập nhật đơn hàng thành công');
                                setIsEditModalOpen(false);
                                setEditingOrder(null);
                            }}
                        >
                            Lưu
                        </Button>,
                    ]}
                >
                    {/* Add your edit form fields here */}
                    <p>Form chỉnh sửa đơn hàng sẽ được thêm vào đây</p>
                </Modal>
            </Card>
        </MainLayout>
    );
}
