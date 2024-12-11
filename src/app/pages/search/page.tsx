"use client"
import { useState } from 'react';
import { Order } from '@/types/Order';
import { Card, Form, Input, DatePicker, Select, Button, Table, Space, Tabs, Row, Col, Tooltip } from 'antd';
import { SearchOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import type { ColumnType, ColumnGroupType } from 'antd/es/table';
import MainLayout from '@/layout/MainLayout';
import { OrderMockData } from '@/mocks/OrderMock';
import ColumnVisibilityControl from '@/components/common/ColumnVisibilityControl';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import * as XLSX from 'xlsx';
import { orderExportConfig, createExportData } from '@/configs/exportConfig';
import ExportModal from '@/components/common/ExportModal';
import { recipientMockData } from '@/mocks/recipientMockData';
import { PaymentMockData } from '@/mocks/PaymentMockData';

import { columns } from '@/components/common/Columns';
import SearchModal from '@/components/common/SearchModal';
import { senderMockData } from '@/mocks/senderMockData';
import { getCustomerForOrder, getRecipientForOrder } from '@/utils/orderHelpers';
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
        { key: 'serviceType', label: 'Loại Vận Chuyển' },
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
        serviceType: true,
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
        try {
            let filtered = [...OrderMockData];

            // Xử lý điều kiện ngày
            if (values.createdAt?.length === 2) {
                const startDate = values.createdAt[0].startOf('day').toDate();
                const endDate = values.createdAt[1].endOf('day').toDate();
                filtered = filtered.filter(order => {
                    const orderDate = new Date(order.createdAt);
                    return orderDate >= startDate && orderDate <= endDate;
                });
            }

            // Xử lý điều kiện dịch vụ
            if (values.shippingService) {
                filtered = filtered.filter(order => 
                    order.serviceType.toLowerCase() === values.shippingService.toLowerCase()
                );
            }

            // Xử lý điều kiện vận chuyển
            if (values.shippingMethod) {
                filtered = filtered.filter(order => 
                    order.shippingType.toLowerCase() === values.shippingMethod.toLowerCase()
                );
            }

            // Xử lý điều kiện khu vực
            if (values.receiverRegion) {
                filtered = filtered.filter(order => {
                    const recipient = recipientMockData.find(r => r.recipientId === order.recipientId);
                    return recipient?.region === values.receiverRegion;
                });
            }

            // Xử lý điều kiện thanh toán
            if (values.paymentStatus) {
                filtered = filtered.filter(order => {
                    const payment = PaymentMockData.find(p => p.orderId === order.orderId);
                    return payment?.status === values.paymentStatus;
                });
            }

            // Xử lý tìm kiếm người gửi
            if ( values.sender || values.senderPhone) {
                filtered = filtered.filter(order => {
                    const sender = getCustomerForOrder(senderMockData, order.senderId);
                    return (
                        // (!values.customerCode || sender?.senderId === values.customerCode) &&
                        (!values.sender || sender?.name.toLowerCase().includes(values.sender.toLowerCase())) &&
                        (!values.senderPhone || sender?.phone.includes(values.senderPhone))
                    );
                });
            }

            // Xử lý tìm kiếm người nhận
            if (values.receiverCode || values.receiver || values.receiverPhone) {
                filtered = filtered.filter(order => {
                    console.log(values);
                    const receiver = getRecipientForOrder(recipientMockData, order.recipientId);
                    return (
                        (!values.receiverCode || receiver?.recipientId === values.receiverCode) &&
                        (!values.receiver || receiver?.name.toLowerCase().includes(values.receiver.toLowerCase())) &&
                        (!values.receiverPhone || receiver?.phone.includes(values.receiverPhone))
                    );
                });
            }

            setSearchResults(filtered);
            setHasSearched(true);

        } catch (error) {
            console.error("Lỗi khi tìm kiếm:", error);
        }
    };
    const onReset = () => {
        form.resetFields();
        setSearchResults([]);
        setHasSearched(false);
    };

    const handleExport = (selectedFields: string[]) => {
        // Tạo dữ liệu xuất với thông tin đầy đủ
        const exportData = searchResults.map(order => {
            const sender = getCustomerForOrder(senderMockData, order.senderId);
            const recipient = getRecipientForOrder(recipientMockData, order.recipientId);
            
            return {
                ...order,
                // Thêm thông tin người gửi
                senderName: sender?.name || '',
                senderPhone: sender?.phone || '',
                senderAddress: sender?.address || '',
                
                // Thêm thông tin người nhận
                receiverName: recipient?.name || '',
                receiverPhone: recipient?.phone || '',
                receiverAddress: recipient?.address || '',
                receiverRegion: recipient?.region || '',
            };
        });

        const ws = XLSX.utils.json_to_sheet(
            createExportData(exportData, selectedFields, orderExportConfig)
        );
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

                <div className="mb-4 flex w-full justify-end space-x-2">
                    <Button 
                        icon={<DownloadOutlined />}
                        onClick={() => setIsExportModalOpen(true)}
                        disabled={!hasSearched || searchResults.length === 0}
                    >
                        Xuất Excel
                    </Button>
                    <Button 
                        type="primary" 
                        icon={<SearchOutlined />}
                        onClick={() => setIsSearchModalOpen(true)}
                    >
                        Tìm kiếm
                    </Button>
                    <Tooltip title="Tùy chỉnh hiển thị">

                    <ColumnVisibilityControl
                                columns={columnConfigs}
                                visibleColumns={visibleColumns}
                                onChange={handleColumnVisibilityChange}
                            />
                    </Tooltip>

                </div>

                {hasSearched && (
                    <>
                           
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
