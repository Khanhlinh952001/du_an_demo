"use client"
import { useState } from 'react';
import { Order } from '@/types/Order';
import { Card, Form, Input, DatePicker, Select, Button, Table, Space, Tabs } from 'antd';
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
import { filterByDateRange, filterBySender, filterByReceiver, filterByRegion, filterByPaymentStatus, filterByOrderType } from '@/utils/filters';
export default function SearchPage() {
    const [form] = Form.useForm();
    const [activeTab, setActiveTab] = useState<'sea' | 'air'>('sea');
    const [hasSearched, setHasSearched] = useState(false);
    const [searchResults, setSearchResults] = useState<Order[]>([]);
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
    } = useColumnVisibility(columns, defaultVisibleColumns);

    const onFinish = (values: any) => {
        let filtered = [...OrderMockData];
        
        // Lọc theo ngày tạo đơn
        if (values.createdAt) {
            const [startDate, endDate] = values.createdAt;
            filtered = filterByDateRange(filtered, startDate.toDate(), endDate.toDate(), 'createdAt');
        }

        // Lọc theo người gửi
        if (values.sender) {
            filtered = filterBySender(filtered, values.sender);
        }

        // Lọc theo người nhận
        if (values.receiver) {
            filtered = filterByReceiver(filtered, values.receiver);
        }

        // Lọc theo khu vực
        if (values.region) {
            filtered = filterByRegion(filtered, values.region);
        }

        if (values.paymentStatus) {
            filtered = filterByPaymentStatus(filtered, values.paymentStatus);
        }

        // Thêm lọc theo loại đơn hàng
        if (values.orderType) {
            filtered = filterByOrderType(filtered, values.orderType);
        }

        // Cập nhật kết quả tìm kiếm
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

    const renderSearchForm = () => (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                <Form.Item label="Ngày tạo đơn" name="createdAt">
                    <RangePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Người gửi" name="sender">
                    <Input placeholder="Nhập tên người gửi" />
                </Form.Item>
                <Form.Item label="Người nhận" name="receiver">
                    <Input placeholder="Nhập tên người nhận" />
                </Form.Item>
                <Form.Item label="Khu vực" name="region">
                    <Select placeholder="Chọn khu vực">
                        {Object.entries(REGION).map(([key, value]) => (
                            <Select.Option key={key} value={key}>
                                {value}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Tình trạng thanh toán" name="paymentStatus">
                    <Select placeholder="Chọn tình trạng">
                        <Select.Option value="paid">Đã thanh toán</Select.Option>
                        <Select.Option value="unpaid">Chưa thanh toán</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Loại đơn hàng" name="orderType">
                    <Select placeholder="Chọn loại đơn hàng">
                        <Select.Option value={ORDER_TYPE.EXPORT}>Xuất khẩu</Select.Option>
                        <Select.Option value={ORDER_TYPE.IMPORT}>Nhập khẩu</Select.Option>
                    </Select>
                </Form.Item>
            </div>

            <Form.Item style={{ marginTop: '24px', textAlign: 'right' }}>
                <Space>
                    <Button onClick={onReset}>Làm mới</Button>
                    <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                        Tìm kiếm
                    </Button>
                    {hasSearched && searchResults.length > 0 && (
                        <Button
                            icon={<DownloadOutlined />}
                            onClick={() => setIsExportModalOpen(true)}
                            className="bg-green-500 hover:bg-green-600 text-white border-none"
                        >
                            Xuất Excel
                        </Button>
                    )}
                </Space>
            </Form.Item>
        </Form>
    );

    const renderSearchContent = (
        title: string,
        description: string
    ) => (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                <p className="text-gray-500 mt-1">{description}</p>
            </div>

            <Card title="Tham số tra cứu" className="mb-4">
                {renderSearchForm()}
            </Card>

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
                        <Table
                            columns={filteredColumns as (ColumnGroupType<Order> | ColumnType<Order>)[]}
                            dataSource={searchResults}
                            rowKey="orderId"
                            scroll={{ x: 'max-content' }}
                            bordered
                            size="middle"
                            pagination={{
                                pageSize: 10,
                                showSizeChanger: true,
                                showTotal: (total) => `Tổng số ${total} đơn hàng`,
                            }}
                            rowClassName={(record, index) => 
                                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            }
                        />
                    ) : (
                        <div className="text-center p-10 bg-gray-50 rounded-lg">
                            <p className="text-gray-500">Không tìm thấy đơn hàng nào phù hợp</p>
                        </div>
                    )}
                </>
            )}
        </>
    );

    return (
        <MainLayout>
            <Card className="shadow-lg rounded-lg">
                <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key as 'sea' | 'air')}>
                    <Tabs.TabPane tab="Tra cứu đường biển" key="sea">
                        {renderSearchContent(
                            "Tra cứu đơn hàng đường biển",
                            "Tìm kiếm đơn hàng vận chuyển đường biển"
                        )}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Tra cứu đường bay" key="air">
                        {renderSearchContent(
                            "Tra cứu đơn hàng đường bay",
                            "Tìm kiếm đơn hàng vận chuyển đường bay"
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
