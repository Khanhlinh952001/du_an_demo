"use client";
import MainLayout from "@/layout/MainLayout";
import AddSenderModal from '@/components/modals/AddSenderModal';
import { useState, useEffect } from 'react';
import type { Sender } from '@/types/Sender';
import { Table, Button, Checkbox, Modal } from 'antd';
import { senderMockData } from '@/mocks/senderMockData';
import ColumnVisibilityControl from '@/components/common/ColumnVisibilityControl';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import { columns } from './columns';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import RecipientPage from "../recipients/page";
export default function SenderPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSender, setEditingSender] = useState<Sender | undefined>();
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [senders, setSenders] = useState<Sender[]>([]);
  const [isRecipientModalOpen, setIsRecipientModalOpen] = useState(false);
  const [selectedSenderId, setSelectedSenderId] = useState<string | null>(null);

  const columnConfigs = [
    { key: 'senderId', label: 'Mã KH' },
    { key: 'name', label: 'Tên KH' },
    { key: 'contact', label: 'Thông tin liên hệ' },
    { key: 'social', label: 'Kênh liên hệ' },
    { key: 'orderInfo', label: 'Thông tin đơn hàng' },
    { key: 'dates', label: 'Thời gian' },
    { key: 'phone', label: 'SĐT' },
    {key :'zalo', label: 'Zalo'},
    {key :'kakaoTalk', label: 'KakaoTalk'},
    {key :'facebook', label: 'Facebook'},
    

    { key: 'management', label: 'Quản lý' },
  ];

  const defaultVisibleColumns = {
    senderId: true,
    name: true,
    contact: true,
    social: true,
    orderInfo: true,
    dates: true,
    phone: true,
    zalo: true,
    kakaoTalk: true,
    facebook: true,
    management: true,
  };

  const {
    visibleColumns,
    handleColumnVisibilityChange,
    filteredColumns
  } = useColumnVisibility(columns,defaultVisibleColumns);

  useEffect(() => {
    setSenders(senderMockData);
  }, []);

  const handleEdit = (record: Sender) => {
    setEditingSender(record);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleSubmit = (values: Sender) => {
    if (modalMode === 'edit') {
      // TODO: Implement update API call
      console.log('Updating:', values);
    } else {
      // TODO: Implement create API call
      console.log('Creating:', values);
    }
    setIsModalOpen(false);
    setEditingSender(undefined);
    setModalMode('add');
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setEditingSender(undefined);
    setModalMode('add');
  };

  const columnsWithActions = [
    ...filteredColumns,
    {
      key: 'actions',
      title: 'Hành động',
      render: (_: unknown, record: Sender) => (
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
            style={{ marginRight: 8 }}
          />
          <Button
            onClick={() => {
              setSelectedSenderId(record.senderId);
              setIsRecipientModalOpen(true);
            }}
          >
            Xem người nhận
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = (record: Sender) => {
    // TODO: Implement delete functionality
    console.log('Delete:', record);
  };

  return <MainLayout>
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Danh sách người gửi</h1>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Thêm người gửi
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
        dataSource={senders}
        rowKey="id"
        className="bg-white rounded-lg shadow-sm"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng số ${total} người gửi`,
        }}
      />
    </div>

    

    <AddSenderModal 
      open={isModalOpen}
      onCancel={handleModalCancel}
      onSubmit={handleSubmit}
      initialData={editingSender}
      mode={modalMode}
    />

    <Modal
      title="Danh sách người nhận"
      open={isRecipientModalOpen}
      onCancel={() => setIsRecipientModalOpen(false)}
      width={1200}
      footer={null}
    >
      <RecipientPage senderId={selectedSenderId} />
    </Modal>
  </MainLayout>;
}
