"use client"
import { useState } from 'react';
import { Order } from '@/types/Order';
import { Card, Form, Input, DatePicker, Select, Button, Table, Space, Tabs, Row, Col } from 'antd';
import { SearchOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import type { ColumnType, ColumnGroupType } from 'antd/es/table';
import MainLayout from '@/layout/MainLayout';
import { REGION,ORDER_TYPE } from '@/constants';
const { RangePicker } = DatePicker;
import { columns } from './columns';
import { OrderMockData } from '@/mocks/OrderMock';
import ColumnVisibilityControl from '@/components/common/ColumnVisibilityControl';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import * as XLSX from 'xlsx';
import { orderExportConfig, createExportData } from '@/configs/exportConfig';
import ExportModal from '@/components/common/ExportModal';
import { formatDate } from '@/utils/format';
import { 
    filterByDateRange, 
    filterBySender, 
    filterByReceiver, 
    filterByRegion, 
    filterByPaymentStatus, 
    filterByOrderType,
    filterByServiceType 
} from '@/utils/filters';
import SearchModal from '@/components/common/SearchModal';

export default function SearchPage() {
    const [form] = Form.useForm();
    const [activeTab, setActiveTab] = useState<'sea' | 'air'>('sea');
    const [hasSearched, setHasSearched] = useState(false);
    const [searchResults, setSearchResults] = useState<Order[]>([]);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    // Column configurations
    const columnConfigs = [
        { key: 'createdAt', label: 'Ngày Xuất' },
        { key: 'orderId', label: 'Mã Đơn Hàng' },
        { key: 'senderName', label: 'Người Gửi' },
        { key: 'senderPhone', label: 'SĐT Người Gửi' },
        { key: 'senderAddress', label: 'Địa Chỉ Người Gửi' },
        { key: 'receiverName', label: 'Người Nhận' },
        { key: 'receiverPhone', label: 'SĐT Người Nhận' },
        { key: 'receiverRegion', label: 'Khu Vực' },
        { key: 'receiverAddress', label: 'Địa Chỉ Người Nhận' },
        { key: 'totalPackages', label: 'Số Kiện' },
        { key: 'weight', label: 'Trọng Lượng' },
        { key: 'price', label: 'Giá' },
        { key: 'totalAmount', label: 'Thành Tiền' },
        { key: 'paymentStatus', label: 'Trạng Thái Thanh Toán' },
        { key: 'note', label: 'Ghi Chú' },
    ];

    const defaultVisibleColumns = {
        createdAt: true,
        orderId: true,
        senderName: true,
        senderPhone: true,
        senderAddress: true,
        receiverName: true,
        receiverPhone: true,
        receiverRegion: true,
        receiverAddress: true,
        totalPackages: true,
        weight: true,
        price: true,
        totalAmount: true,
        paymentStatus: true,
        note: true,
    };

    const {
        visibleColumns,
        handleColumnVisibilityChange,
        filteredColumns
    } = useColumnVisibility(columns, defaultVisibleColumns);

    const onFinish = (values: any) => {
        let filtered = [...OrderMockData];
        
        // Lọc theo ngày gửi
        if (values.createdAt && values.createdAt.length === 2) {
            const [startDate, endDate] = values.createdAt;
            filtered = filterByDateRange(
                filtered, 
                startDate.toDate(), 
                endDate.toDate(), 
                'createdAt'  // hoặc 'createdAt' tùy theo trường ngày trong data
            );
        }

        // Lọc theo dịch vụ vận chuyển (air/sea)
        if (values.shippingService) {
            filtered = filterByServiceType(filtered, values.shippingService);
        }

        // Lọc theo hình thức vận chuyển (import/export)
        if (values.shippingMethod) {
            filtered = filterByOrderType(filtered, values.shippingMethod);
        }

        // Lọc theo khu vực
        if (values.receiverRegion) {
            filtered = filterByRegion(filtered, values.receiverRegion);
        }

        // Lọc theo trạng thái vận chuyển
        if (values.shippingStatus) {
            filtered = filtered.filter(order => order.status === values.shippingStatus);
        }

        // Lọc theo trạng thái thanh toán
        if (values.paymentStatus) {
            filtered = filterByPaymentStatus(filtered, values.paymentStatus);
        }

        // Lọc theo thông tin người gửi (bao gồm mã, tên, số điện thoại)
        if (values.customerCode || values.sender || values.senderPhone) {
            if (values.customerCode) {
                filtered = filterBySender(filtered, values.customerCode);
            }
            if (values.sender) {
                filtered = filterBySender(filtered, values.sender);
            }
            if (values.senderPhone) {
                filtered = filterBySender(filtered, values.senderPhone);
            }
        }

        // Lọc theo thông tin người nhận (bao gồm mã, tên, số điện thoại)
        if (values.receiverCode || values.receiver || values.receiverPhone) {
            if (values.receiverCode) {
                filtered = filterByReceiver(filtered, values.receiverCode);
            }
            if (values.receiver) {
                filtered = filterByReceiver(filtered, values.receiver);
            }
            if (values.receiverPhone) {
                filtered = filterByReceiver(filtered, values.receiverPhone);
            }
        }

        setSearchResults(filtered);
        setHasSearched(true);
    };
    const onReset = () => {
        form.resetFields();
        setSearchResults([]);
        setHasSearched(false);
    };

    const handleExport = (selectedFields: string[]) => {
        const exportData = createExportData(searchResults, selectedFields, orderExportConfig);
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Danh sách đơn hàng");
        XLSX.writeFile(wb, `don_hang_${activeTab}_${new Date().toISOString().slice(0,10)}.xlsx`);
        setIsExportModalOpen(false);
    };

    return (
        <MainLayout>
            <Card className="shadow-lg rounded-lg">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Tra cứu đơn hàng</h1>
                    <p className="text-gray-500 mt-1">Tìm kiếm thông tin đơn hàng</p>
                </div>

                <div className="mb-4 flex w-full justify-end">
                    <Button 
                        type="primary" 
                        icon={<SearchOutlined />}
                        onClick={() => setIsSearchModalOpen(true)}
                    >
                        Tìm kiếm
                    </Button>
                </div>

                {hasSearched && (
                    <>
                        <Card title="Tùy chỉnh hiển thị" className="mb-4">
                            <ColumnVisibilityControl
                                columns={columnConfigs}
                                visibleColumns={visibleColumns}
                                onChange={handleColumnVisibilityChange}
                            />
                        </Card>

                        {searchResults.length > 0 ? (
                            <div className="overflow-x-auto">
                                <Table
                                    columns={filteredColumns as (ColumnGroupType<Order> | ColumnType<Order>)[]}
                                    dataSource={searchResults}
                                    rowKey="orderId"
                                    scroll={{ 
                                        x: 2500, // Tổng chiều rộng tối thiểu của bảng
                                        y: 500   // Chiều cao cố định của bảng
                                    }}
                                    bordered
                                    size="middle"
                                    pagination={{
                                        pageSize: 10,
                                        showSizeChanger: true,
                                        showTotal: (total) => `Tổng số ${total} đơn hàng`,
                                        position: ['bottomCenter'],
                                        style: { marginTop: 16 }
                                    }}
                                    rowClassName={(record, index) => 
                                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                    }
                                    sticky={{
                                        offsetHeader: 0,
                                        offsetScroll: 0,
                                        getContainer: () => window
                                    }}
                                    style={{ 
                                        maxWidth: '100%',
                                        whiteSpace: 'nowrap'
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="text-center p-10 bg-gray-50 rounded-lg">
                                <p className="text-gray-500">Không tìm thấy đơn hàng nào phù hợp</p>
                            </div>
                        )}
                    </>
                )}

                <SearchModal
                    open={isSearchModalOpen}
                    onCancel={() => setIsSearchModalOpen(false)}
                    onSearch={(values) => {
                        onFinish(values);
                        setIsSearchModalOpen(false);
                    }}
                    onReset={onReset}
                />

                <ExportModal
                    open={isExportModalOpen}
                    onCancel={() => setIsExportModalOpen(false)}
                    onExport={handleExport}
                    fields={orderExportConfig}
                />
            </Card>
        </MainLayout>
    );
}
