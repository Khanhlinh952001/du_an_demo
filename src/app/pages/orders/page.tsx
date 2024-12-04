"use client"
import { useState } from 'react';
import { Order } from '@/types/Order';
import AddOrderModal from '@/components/modals/AddOrderModal';
import { OrderMockData } from '@/mocks/OrderMock';
import { Table, Button, Tag, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DownloadOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import ColumnVisibilityControl from '@/components/common/ColumnVisibilityControl';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import ExportModal from '@/components/common/ExportModal';
import { orderExportConfig, createExportData } from '@/configs/exportConfig';
import { columns}  from './columns'
import MainLayout from '@/layout/MainLayout';
import AddMultiOrderModal from '@/components/modals/AddMultiOrderModal';

export default function CreateSingleOrder() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMultiModalOpen, setIsMultiModalOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(OrderMockData);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Cấu hình các cột quan trọng nhất
  const columnConfigs = [
    { key: 'orderId', label: 'Mã Đơn Hàng' },
    { key: 'createdAt', label: 'Ngày Xuất' },
    { key: 'senderName', label: 'Người Gửi' },
    { key: 'receiverName', label: 'Người Nhận' },
    { key: 'receiverRegion', label: 'Khu Vực' },
    { key: 'totalAmount', label: 'Thành Tiền' },
    { key: 'paymentStatus', label: 'Thanh Toán' },
    { key: 'note', label: 'Ghi Chú' },
  ];

  // Mặc định hiển thị các cột quan trọng
  const defaultVisibleColumns = {
    orderId: true,
    createdAt: true,
    senderName: true,
    receiverName: true,
    receiverRegion: true,
    totalAmount: true,
    paymentStatus: true,
    note: false,
  };

  const {
    visibleColumns,
    handleColumnVisibilityChange,
    filteredColumns
  } = useColumnVisibility(columns, defaultVisibleColumns);

  const handleSubmit = (values: Order) => {
    setOrders([...orders, values]);
    setIsModalOpen(false);
  };

  const handleMultiSubmit = (values: Order[]) => {
    setOrders([...orders, ...values]);
    setIsMultiModalOpen(false);
  };

  // Cập nhật hàm xử lý xuất Excel
  const handleExport = (selectedFields: string[]) => {
    const exportData = createExportData(orders, selectedFields, orderExportConfig);
    
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Danh sách đơn hàng");
    XLSX.writeFile(wb, "danh-sach-don-hang.xlsx");
    setIsExportModalOpen(false);
  };

  // Xử lý nhập Excel
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
      setOrders(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <MainLayout>
      <Card className="shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Danh sách đơn hàng
            </h1>
            <p className="text-gray-500 mt-1">Quản lý và theo dõi các đơn hàng</p>
          </div>
          <div className="flex gap-3">
            <Button
              icon={<DownloadOutlined />}
              onClick={() => setIsExportModalOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white border-none"
            >
              Xuất Excel
            </Button>
            <Button
              icon={<UploadOutlined />}
              className="bg-blue-500 hover:bg-blue-600 text-white border-none"
              onClick={() => document.getElementById('upload-excel')?.click()}
            >
              Nhập Excel
            </Button>
            <input
              id="upload-excel"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleUpdateFromExcel}
              className="hidden"
            />
            <Button 
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsMultiModalOpen(true)}
            >
              Tạo nhiều đơn
            </Button>
            <Button 
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen(true)}
            >
              Tạo một đơn
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
          columns={filteredColumns}
          dataSource={orders}
          rowKey="orderId"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số ${total} đơn hàng`,
          }}
          className="shadow-sm"
          scroll={{ x: 'max-content' }}
          bordered
          size="middle"
          rowClassName={(record, index) => 
            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
          }
        />
      </Card>

      <AddOrderModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        mode="add"
      />

      <AddMultiOrderModal
        open={isMultiModalOpen}
        onCancel={() => setIsMultiModalOpen(false)}
        onSubmit={handleMultiSubmit}
      />

      <ExportModal
        open={isExportModalOpen}
        onCancel={() => setIsExportModalOpen(false)}
        onExport={handleExport}
        fields={orderExportConfig}
      />
    </MainLayout>
  );
}
