"use client";
import MainLayout from "@/layout/MainLayout";
import { useState, useEffect } from 'react';
import type { Recipient } from '@/types/Recipient';
import { Table, Button } from 'antd';
import ColumnVisibilityControl from '@/components/common/ColumnVisibilityControl';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import { columns } from './columns';
import { EditOutlined, DeleteOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import AddRecipientModal from '@/components/modals/AddRecipientModal';
import { recipientsBySender, recipientMockData } from '@/mocks/recipientMockData';
import * as XLSX from 'xlsx';
import { recipientExportConfig, createExportData } from '@/configs/exportConfig';
import ExportModal from '@/components/common/ExportModal';

interface RecipientPageProps {
  senderId?: string | null;
}

export default function RecipientPage({ senderId }: RecipientPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipient, setEditingRecipient] = useState<Recipient | undefined>();
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const columnConfigs = [
    { key: 'recipientId', label: 'Mã người nhận' },
    { key: 'name', label: 'Tên người nhận' },
    { key: 'contact', label: 'Thông tin liên hệ' },
    { key: 'region', label: 'Khu vực' },
    { key: 'shipper', label: 'Đơn vị vận chuyển' },
    { key: 'status', label: 'Trạng thái' },
    { key: 'management', label: 'Quản lý' },
  ];

  const defaultVisibleColumns = {
    recipientId: true,
    name: true,
    contact: true,
    region: true,
    shipper: true,
    status: true,
    management: true,
  };

  const {
    visibleColumns,
    handleColumnVisibilityChange,
    filteredColumns
  } = useColumnVisibility(columns, defaultVisibleColumns);

  useEffect(() => {
    if (senderId) {
      // If senderId is provided, fetch recipients for that sender
      const senderRecipients = recipientsBySender[senderId] || [];
      setRecipients(senderRecipients);
    } else {
      // Otherwise, show all recipients
      setRecipients(recipientMockData);
    }
  }, [senderId]);

  const handleEdit = (record: Recipient) => {
    setEditingRecipient(record);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDelete = (record: Recipient) => {
    // TODO: Implement delete functionality
    console.log('Delete:', record);
  };

  const handleSubmit = (values: Recipient) => {
    if (modalMode === 'edit') {
      // TODO: Implement update API call
      console.log('Updating:', values);
    } else {
      // TODO: Implement create API call
      console.log('Creating:', values);
    }
    setIsModalOpen(false);
    setEditingRecipient(undefined);
    setModalMode('add');
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setEditingRecipient(undefined);
    setModalMode('add');
  };

  const handleExport = (selectedFields: string[]) => {
    const exportData = createExportData(recipients, selectedFields, recipientExportConfig);
    
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Danh sách người nhận");
    XLSX.writeFile(wb, "danh-sach-nguoi-nhan.xlsx");
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
      const jsonData = XLSX.utils.sheet_to_json<Recipient>(worksheet);

      // Cập nhật state với dữ liệu mới
      setRecipients(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const columnsWithActions = [
    ...filteredColumns,
    {
      key: 'actions',
      title: 'Hành động',
      render: (_: unknown, record: Recipient) => (
        <div className="space-x-2 flex">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="hover:bg-blue-50"
            type="default"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            danger
            className="hover:bg-red-50"
          />
        </div>
      ),
    },
  ];

  const content = (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Danh sách người nhận
        </h1>
        <div className="flex gap-2">
          <Button
            icon={<DownloadOutlined />}
            onClick={() => setIsExportModalOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Xuất Excel
          </Button>
          <label htmlFor="upload-excel" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded cursor-pointer flex items-center gap-2">
            <UploadOutlined />
            Cập nhật từ Excel
            <input
              id="upload-excel"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleUpdateFromExcel}
              style={{ display: 'none' }}
            />
          </label>
          {senderId && (
            <Button 
              type="primary" 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 flex items-center gap-2"
            >
              <span className="text-lg">+</span>
              Thêm người nhận
            </Button>
          )}
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <ColumnVisibilityControl
          columns={columnConfigs}
          visibleColumns={visibleColumns}
          onChange={handleColumnVisibilityChange}
          className="mb-4"
        />
        
        <Table 
          columns={columnsWithActions}
          dataSource={recipients}
          rowKey="recipientId"
          className="hover:shadow-lg transition-shadow duration-300"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số ${total} người nhận`,
            className: "pb-4"
          }}
        />
      </div>

      <AddRecipientModal 
        open={isModalOpen}
        onCancel={handleModalCancel}
        onSubmit={handleSubmit}
        initialData={editingRecipient}
        mode={modalMode}
      />

      <ExportModal
        open={isExportModalOpen}
        onCancel={() => setIsExportModalOpen(false)}
        onExport={handleExport}
        fields={recipientExportConfig}
      />
    </div>
  );

  return senderId ? (
    content
  ) : (

   <MainLayout>{content}</MainLayout> 
  );
} 
