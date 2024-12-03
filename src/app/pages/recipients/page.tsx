"use client";
import MainLayout from "@/layout/MainLayout";
import { useState, useEffect } from 'react';
import type { Recipient } from '@/types/Recipient';
import { Table, Button } from 'antd';
import ColumnVisibilityControl from '@/components/common/ColumnVisibilityControl';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import { columns } from './columns';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddRecipientModal from '@/components/modals/AddRecipientModal';
import { recipientsBySender, recipientMockData } from '@/mocks/recipientMockData';

interface RecipientPageProps {
  senderId?: string | null;
}

export default function RecipientPage({ senderId }: RecipientPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipient, setEditingRecipient] = useState<Recipient | undefined>();
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [recipients, setRecipients] = useState<Recipient[]>([]);

  const columnConfigs = [
    { key: 'recipientId', label: 'Mã người nhận' },
    { key: 'name', label: 'Tên người nhận' },
    { key: 'phone', label: 'Số điện thoại' },
    { key: 'address', label: 'Địa chỉ' },
    { key: 'region', label: 'Khu vực' },
    { key: 'shipper', label: 'Đơn vị vận chuyển' },
    { key: 'isConfirmed', label: 'Trạng thái' },
  ];

  const defaultVisibleColumns = {
    recipientId: true,
    name: true,
    phone: true,
    email: true,
    address: true,
    region: true,
    shipper: true,
    isConfirmed: true,
  };

  const {
    visibleColumns,
    handleColumnVisibilityChange,
    filteredColumns
  } = useColumnVisibility(columns, defaultVisibleColumns);

  useEffect(() => {
    if (senderId) {
      // Nếu có senderId, lấy danh sách người nhận của sender đó
      const senderRecipients = recipientsBySender[senderId] || [];
      setRecipients(senderRecipients);
    } else {
      // Nếu không có senderId, hiển thị tất cả người nhận
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

  const columnsWithActions = [
    ...filteredColumns,
    {
      key: 'actions',
      title: 'Hành động',
      render: (_: unknown, record: Recipient) => (
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            danger
          />
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">Danh sách người nhận</h1>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Thêm người nhận
          </Button>
        </div>

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
          className="bg-white rounded-lg shadow-sm"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số ${total} người nhận`,
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
    </MainLayout>
  );
} 