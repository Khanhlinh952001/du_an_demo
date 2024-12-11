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
  Tag,
} from 'antd';
import { SearchOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import MainLayout from '@/layout/MainLayout';
import { Order } from '@/types/Order';
import { columns } from './columns';
import ExportModal from '@/components/common/ExportModal';
import { OrderMockData } from '@/mocks/OrderMock';
import { PaymentMockData } from '@/mocks/PaymentMockData';
const { Search } = Input;
import QuotationPDF from '@/components/QuotationPDF';
import { getPaymentForOrder } from '@/utils/orderHelpers';
import * as XLSX from 'xlsx';
import { getCustomerForOrder } from '@/utils/orderHelpers';
import { senderMockData } from '@/mocks/senderMockData';
import { formatDate } from '@/utils/format';

export default function DebtPage() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<Order[]>([]);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const data = OrderMockData.filter(order => {
    const payment = getPaymentForOrder(PaymentMockData, order.paymentId || '');
    if (!payment) return false;
    
    return payment.paidAmount === 0 || 
           (payment.isPartialPayment && payment.remainingAmount > 0);
  });
  console.log(data)
  const debtExportConfig = [
    { key: 'customerCode', label: 'Mã khách hàng' },
    { key: 'customerName', label: 'Tên khách hàng' },
    { key: 'contactInfo', label: 'Số điện thoại' },
    { key: 'email', label: 'Email' },
    { key: 'totalDebt', label: 'Tổng nợ' },
    { key: 'paidAmount', label: 'Đã thanh toán' },
    { key: 'remainingDebt', label: 'Còn lại' },
    { key: 'status', label: 'Trạng thái' },
  ];
  
  const statusConfig = {
    UNPAID: { color: 'red', text: 'Chưa thanh toán' },
    PARTIAL_PAID: { color: 'orange', text: 'Thanh toán một phần' },
    PAID: { color: 'green', text: 'Đã thanh toán' },
    PENDING: { color: 'blue', text: 'Đang xử lý' },
    REFUNDED: { color: 'purple', text: 'Đã hoàn tiền' }
  };

  const handleSearch = (value: string) => {
    // Implement search logic here
  };

  const handleExport = () => {
    // Nếu có hàng được chọn thì xuất những hàng đó, không thì xuất tất cả
    const dataToExport = selectedRows.length > 0 ? selectedRows : data;
    
    const exportData = dataToExport.map(order => {
      const sender = getCustomerForOrder(senderMockData, order.senderId);
      const payment = getPaymentForOrder(PaymentMockData, order.paymentId || '');
      
      return {
        'Ngày Xuất': formatDate(order.createdAt),
        'Mã Đơn': order.orderId,
        'Người Gửi': sender?.name || '',
        'SĐT Người Gửi': sender?.phone || '',
        'Địa Chỉ': sender?.address || '',
        'Thành Tiền': order.totalAmount?.toLocaleString('vi-VN') + ' VNĐ',
        'Đã Thanh Toán': payment?.paidAmount?.toLocaleString('vi-VN') + ' VNĐ',
        'Còn Nợ': ((payment?.amount || 0) - (payment?.paidAmount || 0))?.toLocaleString('vi-VN') + ' VNĐ',
        'Trạng Thái': payment?.status === 'PAID' ? 'Đã thanh toán' : 
                      payment?.status === 'PARTIAL' ? 'Thanh toán một phần' : 
                      'Chưa thanh toán',
        'Ghi Chú': payment?.paymentNote || ''
      };
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Công nợ');
    
    // Điều chỉnh độ rộng cột
    const colWidths = [
      { wch: 15 }, // Ngày Xuất
      { wch: 10 }, // Mã Đơn
      { wch: 25 }, // Người Gửi
      { wch: 15 }, // SĐT
      { wch: 30 }, // Địa Chỉ
      { wch: 15 }, // Thành Tiền
      { wch: 15 }, // Đã Thanh Toán
      { wch: 15 }, // Còn Nợ
      { wch: 15 }, // Trạng Thái
      { wch: 30 }, // Ghi Chú
    ];
    ws['!cols'] = colWidths;

    XLSX.writeFile(wb, `cong_no_${formatDate(new Date())}.xlsx`);
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
        return <QuotationPDF orders={selectedRows} />;
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
          <div className="flex items-center space-x-2">
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleExport}
            >
              Xuất Excel
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
        <div className="my-4">
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
          scroll={{ x: 2000 }}
          bordered
          size="middle"
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
