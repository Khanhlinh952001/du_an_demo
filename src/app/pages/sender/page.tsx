"use client";
import MainLayout from "@/layout/MainLayout";
import AddSenderModal from '@/components/modals/AddSenderModal';
import { useState, useEffect } from 'react';
import type { Sender } from '@/types/Sender';
import { Table, Button, Checkbox, Modal, Input, Card } from 'antd';
import { senderMockData } from '@/mocks/senderMockData';
import ColumnVisibilityControl from '@/components/common/ColumnVisibilityControl';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import { columns } from './columns';
import { EditOutlined, DeleteOutlined, UsergroupAddOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import RecipientPage from "../recipients/page";
import * as XLSX from 'xlsx';
import { senderExportConfig, createExportData } from '@/configs/exportConfig';
import ExportModal from '@/components/common/ExportModal';
import RecipientList from "@/components/recipients/RecipientList";

export default function SenderPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSender, setEditingSender] = useState<Sender | undefined>();
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [senders, setSenders] = useState<Sender[]>([]);
  const [isRecipientModalOpen, setIsRecipientModalOpen] = useState(false);
  const [selectedSenderId, setSelectedSenderId] = useState<string | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Sender[]>(senderMockData);

  const rowClassName = (record: any, index: number) => {
    return index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
  };

  const columnConfigs = [
    { key: 'senderId', label: 'Mã KH' },
    { key: 'name', label: 'Tên KH' },
    { key: 'contact', label: 'Thông tin liên hệ' },
    { key: 'social', label: 'Mạng xã hội' },
    { key: 'contactChannel', label: 'Kênh liên hệ' },
    { key: 'orderInfo', label: 'Thông tin đơn hàng' },
    { key: 'dates', label: 'Thời gian' },
    { key: 'phone', label: 'SĐT' },
    { key: 'management', label: 'Quản lý' },
  ];

  const defaultVisibleColumns = {
    senderId: true,
    name: true,
    contact: true,
    social: true,
    contactChannel: true,
    orderInfo: true,
    dates: true,
    phone: true,
    management: false,
  };

  const {
    visibleColumns,
    handleColumnVisibilityChange,
    filteredColumns
  } = useColumnVisibility(columns, defaultVisibleColumns);

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

  const handleSearch = (value: string) => {
    if (!value.trim()) {
      setSearchResults(senders);
      return;
    }

    const filtered = senders.filter(sender =>
      sender.name.toLowerCase().includes(value.toLowerCase()) ||
      sender.phone.includes(value)
    );
    setSearchResults(filtered);
  };

  const columnsWithActions = [
    ...filteredColumns,
    {
      key: 'actions',
      title: 'Hành động',
      render: (_: unknown, record: Sender) => (
        <div className="flex ">
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
            icon={<UsergroupAddOutlined />}
            onClick={() => {
              setSelectedSenderId(record.senderId);
              setIsRecipientModalOpen(true);
            }}
          />


        </div>
      ),
    },
  ];

  const handleDelete = (record: Sender) => {
    // TODO: Implement delete functionality
    console.log('Delete:', record);
  };

  const handleExport = (selectedFields: string[]) => {
    const exportData = createExportData(senders, selectedFields, senderExportConfig);

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Danh sách người gửi");
    XLSX.writeFile(wb, "danh-sach-nguoi-gui.xlsx");
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
      const jsonData = XLSX.utils.sheet_to_json<Sender>(worksheet);

      // Cập nhật state với dữ liệu mới
      setSenders(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  return <MainLayout>
    <Card>
      <div className="flex justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Danh sách  Người Gửi
          </h1>
          <p className="text-gray-500 mt-1 mb-4">Quản lý và theo dõi người gửi</p>
        </div>
        <div className="flex gap-2">
          <Input.Search
            placeholder="Tìm theo tên/số điện thoại"
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 300 }}
          />
          <Button
            icon={<DownloadOutlined />}
            onClick={() => setIsExportModalOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Xuất Excel
          </Button>
          <label htmlFor="upload-excel" className="bg-blue-500 hover:bg-blue-600 text-white px-4 h-8 rounded cursor-pointer flex items-center gap-2">
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
          <Button
            type="primary"
            onClick={() => setIsModalOpen(true)}
          >
            Thêm người gửi
          </Button>

        </div>
      </div>

      <ColumnVisibilityControl
        columns={columnConfigs}
        visibleColumns={visibleColumns}
        onChange={handleColumnVisibilityChange}
        className="mb-4"
      />

      <Table
        columns={columnsWithActions}
        dataSource={searchResults}
        rowKey="id"
        size="small"
        rowClassName={rowClassName}
        className="bg-white rounded-lg shadow-sm"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng số ${total} người gửi`,
        }}
      />
    </Card>



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
      <RecipientList senderId={selectedSenderId || ''} />
    </Modal>

    <ExportModal
      open={isExportModalOpen}
      onCancel={() => setIsExportModalOpen(false)}
      onExport={handleExport}
      fields={senderExportConfig}
    />
  </MainLayout>;
}
