"use client"

import React, { useState, useEffect } from 'react';
import {
  Table,
  Card,
  Space,
  DatePicker,
  Input,
  Button,
  Select,
  Modal,
} from 'antd';
import { SearchOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import MainLayout from '@/layout/MainLayout';
import { Order } from '@/types/Order';
import { columns } from './columns';
import ExportModal from '@/components/common/ExportModal';
import { OrderMockData } from '@/mocks/OrderMock';
const { Search } = Input;
import { filterUnpaidOrPartialPaidOrders } from '@/utils/filters';
export default function DebtPage() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<Order[]>([]);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const data = filterUnpaidOrPartialPaidOrders(OrderMockData)
  console.log(data)
  const debtExportConfig = [
    { key: 'customerCode', label: 'Mã khách hàng' },
    { key: 'customerName', label: 'Tên khách hàng' },
    { key: 'phone', label: 'Số điện thoại' },
    { key: 'email', label: 'Email' },
    { key: 'totalDebt', label: 'Tổng nợ' },
    { key: 'paidAmount', label: 'Đã thanh toán' },
    { key: 'remainingDebt', label: 'Còn lại' },
    { key: 'status', label: 'Trạng thái' },
  ];
  

  const handleSearch = (value: string) => {
    // Implement search logic here
  };

  const handleExport = async () => {
    // Implement export logic here
  };

  const handleImport = async (file: File) => {
    // Implement import logic here
  };

  const rowSelection = {
    type: 'checkbox' as const,
    onChange: (_: React.Key[], selectedRows: Order[]) => {
      setSelectedRows(selectedRows);
    },
    selectedRowKeys: selectedRows.map(row => row.orderId),
  };

  const handleBulkPayment = () => {
    Modal.confirm({
      title: 'Xác nhận thanh toán hàng loạt',
      content: `Bạn có chắc muốn thanh toán ${selectedRows.length} đơn hàng đã chọn?`,
      onOk: () => {
        // Xử lý thanh toán hàng loạt
        console.log('Thanh toán các đơn:', selectedRows);
      },
    });
  };

  const handleBulkQuote = () => {
    Modal.confirm({
      title: 'Tạo báo giá hàng loạt',
      content: `Tạo báo giá cho ${selectedRows.length} đơn hàng đã chọn?`,
      onOk: () => {
        // Xử lý tạo báo giá hàng loạt
        console.log('Tạo báo giá cho các đơn:', selectedRows);
      },
    });
  };

  return (
    <MainLayout>
      <Card className="shadow-lg rounded-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Quản lý công nợ
          </h1>
          <p className="text-gray-500 mt-1">
            Quản lý công nợ khách hàng
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <Search
              placeholder="Tìm kiếm"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onSearch={handleSearch}
              enterButton
              allowClear
            />
          </div>
          <div className="flex items-center">
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleExport}
            >
              Xuất file
            </Button>
            <Button
              type="primary"
              icon={<UploadOutlined />}
              onClick={() => setIsExportModalOpen(true)}
            >
              Nhập file
            </Button>
          </div>
        </div>
        <div className="mb-4">
          <Space>
            <Button 
              type="primary"
              disabled={selectedRows.length === 0}
              onClick={handleBulkPayment}
            >
              Thanh toán hàng loạt
            </Button>
            <Button
              disabled={selectedRows.length === 0}
              onClick={handleBulkQuote}
            >
              Tạo báo giá hàng loạt
            </Button>
          </Space>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="orderId"
          pagination={{
            pageSize: 10,
            total: data.length,
            showSizeChanger: true,
          }}
          rowSelection={rowSelection}
        />
      </Card>
      <ExportModal
        open={isExportModalOpen}
        onCancel={() => setIsExportModalOpen(false)}
        onExport={handleExport}
        fields={debtExportConfig}
      />
    </MainLayout>
  );
}
