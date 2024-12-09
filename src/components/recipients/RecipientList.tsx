import { Table, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined, DownloadOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import type { Recipient } from '@/types/Recipient';
import Search from "antd/es/transfer/search";
import ColumnVisibilityControl from '@/components/common/ColumnVisibilityControl';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import { columns } from '@/app/pages/recipients/columns';
import { useEffect, useState } from 'react';
import { recipientsBySender, recipientMockData } from '@/mocks/recipientMockData';
import AddRecipientModal from '@/components/modals/AddRecipientModal';
import ExportModal from '@/components/common/ExportModal';
import { recipientExportConfig, createExportData } from '@/configs/exportConfig';
import * as XLSX from 'xlsx';

interface RecipientListProps {
  senderId?: string;
}

const RecipientList = ({ senderId }: RecipientListProps) => {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [editingRecipient, setEditingRecipient] = useState<Recipient>();
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  useEffect(() => {
    const data = senderId ? recipientsBySender[senderId] || [] : recipientMockData;
    setRecipients(data);
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

  const handleExport = (selectedFields: string[]) => {
    const exportData = createExportData(recipients, selectedFields, recipientExportConfig);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(exportData), "Danh sách người nhận");
    XLSX.writeFile(wb, "danh-sach-nguoi-nhan.xlsx");
    setIsExportModalOpen(false);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const jsonData = XLSX.utils.sheet_to_json<Recipient>(workbook.Sheets[workbook.SheetNames[0]]);
      setRecipients(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

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

  const filteredRecipients = recipients.filter(recipient => 
    recipient.name.toLowerCase().includes(searchText.toLowerCase()) ||
    recipient.recipientId.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Space>
          <Search
            placeholder="Tìm kiếm người nhận"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Space>
        <Space>
          {!senderId && (
            <>
              <Button
                icon={<DownloadOutlined />}
                onClick={() => setIsExportModalOpen(true)}
                className="bg-green-500 hover:bg-green-600 text-white border-none"
              >
                Xuất Excel
              </Button>
              {/* <Button
                icon={<UploadOutlined />}
                className="bg-blue-500 hover:bg-blue-600 text-white border-none"
                onClick={() => document.getElementById('upload-excel')?.click()}
              >
                Nhập Excel
              </Button> */}
            </>
          )}
          {senderId && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen(true)}
            >
              Thêm người nhận
            </Button>
          )}
        </Space>
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
        columns={columnsWithActions}
        dataSource={filteredRecipients}
        rowKey="recipientId"
        scroll={{ x: 1500 }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} người nhận`,
        }}
      />

      <input
        id="upload-excel"
        type="file"
        accept=".xlsx, .xls"
        onChange={handleImport}
        className="hidden"
      />

      <AddRecipientModal 
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingRecipient(undefined);
          setModalMode('add');
        }}
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
};

export default RecipientList; 
