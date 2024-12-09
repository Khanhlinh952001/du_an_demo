"use client"
import { useState } from 'react';
import { Order } from '@/types/Order';
import { OrderMockData } from '@/mocks/OrderMock';
import { Table, Button, Card, Input, Tabs } from 'antd';
import { DownloadOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import ColumnVisibilityControl from '@/components/common/ColumnVisibilityControl';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import ExportModal from '@/components/common/ExportModal';
import { orderExportConfig, createExportData } from '@/configs/exportConfig';
import { columns as seaColumns } from "./columns";
import MainLayout from '@/layout/MainLayout';
import type { ColumnType, ColumnGroupType } from 'antd/es/table';

const { Search } = Input;

export default function ManageOrders() {
    const [filter, setFilter] = useState("");
    const [activeTab, setActiveTab] = useState<'sea' | 'air'>('sea');
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);

    // Column configurations
    const columnConfigs = [
        { key: 'orderId', label: 'Mã Đơn Hàng' },
        { key: 'createdAt', label: 'Ngày Xuất' },
        { key: 'senderName', label: 'Người Gửi' },
        { key: 'receiverName', label: 'Người Nhận' },
        { key: 'receiverRegion', label: 'Khu Vực' },
        { key: 'totalAmount', label: 'Thành Tiền' },
        { key: 'status', label: 'Trạng Thái' },
        { key: 'note', label: 'Ghi Chú' },
    ];

    const defaultVisibleColumns = {
        orderId: true,
        createdAt: true,
        senderName: true,
        receiverName: true,
        receiverRegion: true,
        totalAmount: true,
        status: true,
        note: false,
    };

    const {
        visibleColumns,
        handleColumnVisibilityChange,
        filteredColumns
    } = useColumnVisibility(seaColumns, defaultVisibleColumns);

    const filteredOrders = OrderMockData
        .filter(order => order.serviceType === activeTab)
        .filter(order => 
            order.senderName.toLowerCase().includes(filter.toLowerCase()) || 
            order.orderId.toLowerCase().includes(filter.toLowerCase())
        );

    // Export handling
    const handleExport = (selectedFields: string[]) => {
        const exportData = createExportData(filteredOrders, selectedFields, orderExportConfig);
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Danh sách đơn hàng");
        XLSX.writeFile(wb, `danh-sach-don-hang-${activeTab}.xlsx`);
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
            // Handle imported data as needed
            console.log(jsonData);
        };
        reader.readAsArrayBuffer(file);
    };

    const renderOrderContent = (
        title: string,
        description: string,
        columns: any[]
    ) => (
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
                    <Search
                        placeholder="Tìm kiếm theo ID hoặc tên người gửi..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="max-w-md"
                        size="middle"
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

            <div className="mb-4 bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Tùy chỉnh hiển thị</h3>
                <ColumnVisibilityControl
                    columns={columnConfigs}
                    visibleColumns={visibleColumns}
                    onChange={handleColumnVisibilityChange}
                />
            </div>
            <Table 
                columns={filteredColumns as (ColumnGroupType<Order> | ColumnType<Order>)[]}
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

    return (
        <MainLayout>
            <Card className="shadow-lg rounded-lg">
                <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key as 'sea' | 'air')}>
                    <Tabs.TabPane tab="Quản lý đường biển" key="sea">
                        {renderOrderContent(
                            "Quản lý đơn hàng đường biển",
                            "Danh sách đơn hàng vận chuyển đường biển",
                            seaColumns
                        )}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Quản lý đường bay" key="air">
                        {renderOrderContent(
                            "Quản lý đơn hàng đường bay",
                            "Danh sách đơn hàng vận chuyển đường bay",
                            seaColumns
                        )}
                    </Tabs.TabPane>
                </Tabs>

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
