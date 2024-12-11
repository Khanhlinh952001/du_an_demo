"use client";
import MainLayout from "@/layout/MainLayout";
import AddSenderModal from '@/components/modals/AddSenderModal';
import { useState, useEffect } from 'react';
import type { Sender } from '@/types/Sender';
import { Table, Button, Checkbox, Modal, Input, Card, DatePicker, Select, Form, Tag } from 'antd';
import { senderMockData } from '@/mocks/senderMockData';
import ColumnVisibilityControl from '@/components/common/ColumnVisibilityControl';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import { EditOutlined, DeleteOutlined, UsergroupAddOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { senderExportConfig, createExportData } from '@/configs/exportConfig';
import ExportModal from '@/components/common/ExportModal';
import RecipientList from "@/components/recipients/RecipientList";
import { columns } from "./columns";
import { message } from 'antd';

export default function SenderPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSender, setEditingSender] = useState<Sender | undefined>();
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [senders, setSenders] = useState<Sender[]>([]);
  const [isRecipientModalOpen, setIsRecipientModalOpen] = useState(false);
  const [selectedSenderId, setSelectedSenderId] = useState<string | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Sender[]>(senderMockData);
  const [dateRange, setDateRange] = useState<[any, any]>([null, null]);
  const [selectedRows, setSelectedRows] = useState<Sender[]>([]);
  const [isBulkEditModalOpen, setIsBulkEditModalOpen] = useState(false);
  const [bulkEditForm] = Form.useForm();

  const rowClassName = (record: any, index: number) => {
    return index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
  };

  const columnConfigs = [
    { key: 'senderId', label: 'Mã KH' },
    { key: 'name', label: 'Tên KH' },
    { key: 'phone', label: 'SĐT' },
    { key: 'address', label: 'Địa chỉ' },
    { key: 'social', label: 'Mạng xã hội' },
    { key: 'contactChannels', label: 'Kênh liên hệ' },
    { key: 'orderInfo', label: 'Thông tin đơn hàng' },
    { key: 'priceInfo', label: 'Đơn hàng' },
    { key: 'dates', label: 'Thời gian' },
    { key: 'management', label: 'Quản lý' },
  ];

  const defaultVisibleColumns = {
    senderId: true,
    name: true,
    phone: true,
    address: true,
    social: true,
    priceInfo: true,
    contactChannels: true,
    orderInfo: true,
    dates: true,
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
    let filtered = senderMockData;

    // Text search với điều kiện case-insensitive
    if (value.trim()) {
      const searchTerm = value.toLowerCase().trim();
      filtered = filtered.filter(sender =>
        sender.name.toLowerCase().includes(searchTerm) ||
        sender.phone.includes(searchTerm) ||
        sender.senderId.toLowerCase().includes(searchTerm) ||
        sender.address?.toLowerCase().includes(searchTerm)
      );
    }

    // Date range search
    if (dateRange[0] && dateRange[1]) {
      const startDate = dateRange[0].startOf('day').valueOf();
      const endDate = dateRange[1].endOf('day').valueOf();

      filtered = filtered.filter(sender => {
        const senderDate = new Date(sender.joinDate).valueOf();
        return senderDate >= startDate && senderDate <= endDate;
      });
    }

    setSearchResults(filtered);
  };

  const handleDateRangeChange = (dates: any) => {
    setDateRange(dates);
    handleSearch(''); // Trigger search with existing text value
  };

  const columnsWithActions = [
    ...filteredColumns,
    {
      key: 'actions',
      title: 'Hành động',
      render: (_: unknown, record: Sender) => (
        <div className="flex">
          <Button
            icon={<EditOutlined style={{ fontSize: '16px' }} />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8, fontSize: '14px' }}
          />
          <Button
            icon={<DeleteOutlined style={{ fontSize: '16px' }} />}
            onClick={() => handleDelete(record)}
            danger
            style={{ marginRight: 8, fontSize: '14px' }}
          />
          <Button
            icon={<UsergroupAddOutlined style={{ fontSize: '16px' }} />}
            onClick={() => {
              setSelectedSenderId(record.senderId);
              setIsRecipientModalOpen(true);
            }}
            style={{ fontSize: '14px' }}
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
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<Sender>(worksheet);

        // Validate và format dữ liệu trước khi cập nhật
        const formattedData = jsonData.map(item => ({
          ...item,
          joinDate: item.joinDate ? new Date(item.joinDate).toISOString() : new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          // Thêm các trường mặc định nếu cần
        }));

        setSenders(formattedData);
        setSearchResults(formattedData);
        message.success('Cập nhật dữ liệu thành công');
      } catch (error) {
        console.error('Lỗi khi đọc file Excel:', error);
        message.error('Có lỗi xảy ra khi đọc file');
      }
    };
    reader.readAsArrayBuffer(file);
    // Reset input file
    event.target.value = '';
  };

  const handleBulkEdit = async (values: any) => {
    try {
      const updatedSenders = senders.map(sender => {
        if (selectedRows.find(row => row.senderId === sender.senderId)) {
          return {
            ...sender,
            ...values,
            updatedAt: new Date().toISOString(),
            // Chỉ cập nhật các trường có giá trị
            rating: values.rating || sender.rating,

          };
        }
        return sender;
      });

      setSenders(updatedSenders);
      setSearchResults(updatedSenders);
      setSelectedRows([]);
      setIsBulkEditModalOpen(false);
      bulkEditForm.resetFields();

      // Thông báo thành công
      message.success(`Đã cập nhật ${selectedRows.length} bản ghi`);
    } catch (error) {
      console.error('Lỗi khi cập nhật hàng loạt:', error);
      message.error('Có lỗi xảy ra khi cập nhật');
    }
  };

  const rowSelection = {
    selectedRowKeys: selectedRows.map(row => row.senderId),
    onChange: (selectedRowKeys: React.Key[], selectedRows: Sender[]) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record: Sender) => ({
      disabled: false, // Có thể thêm điều kiện disable nếu cần
      name: record.senderId,
    }),
  };

  const BulkEditModal = () => (
    <Modal
      title="Cập nhật hàng loạt"
      open={isBulkEditModalOpen}
      onCancel={() => setIsBulkEditModalOpen(false)}
      onOk={() => bulkEditForm.submit()}
    >
      <Form
        form={bulkEditForm}
        onFinish={handleBulkEdit}
        layout="vertical"
      >
        <Form.Item name="rating" label="Xếp loại">
          <Select
            placeholder="Chọn xếp loại"
            className="hover:border-blue-400"
            dropdownStyle={{ padding: '8px' }}
          >
            <Select.Option value="VIP">
              <Tag color="gold">VIP</Tag>
            </Select.Option>
            <Select.Option value="Thường">
              <Tag color="blue">Thường</Tag>
            </Select.Option>
            <Select.Option value="Tiềm năng">
              <Tag color="green">Tiềm năng</Tag>
            </Select.Option>
            <Select.Option value="Xấu">
              <Tag color="red">Xấu</Tag>
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="staff" label="Nhân viên">
          <Select>
            <Select.Option value="staff1">Nhân viên 1</Select.Option>
            <Select.Option value="staff2">Nhân viên 2</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="note" label="Ghi chú">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="price" label="Đơn giá">
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );

  return <MainLayout>
    <Card>
      <div className="space-y-4">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Danh sách Người Gửi
            </h1>
            <p className="text-gray-500 mt-1">Quản lý và theo dõi người gửi</p>
          </div>
          <div className="flex gap-2">
            <Button
              type="primary"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1"
            >
              + Thêm người gửi
            </Button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-wrap gap-4 items-center">
          <DatePicker.RangePicker
            onChange={handleDateRangeChange}
            placeholder={['Từ ngày', 'Đến ngày']}
            style={{ width: 280 }}
          />
          <Input.Search
            placeholder="Tìm theo mã KH/tên/số điện thoại"
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 280 }}
            className="flex-grow"
          />
          <div className="flex gap-2 ml-auto">
            {selectedRows.length > 0 && (
              <Button
                onClick={() => setIsBulkEditModalOpen(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                Cập nhật {selectedRows.length} bản ghi
              </Button>
            )}
            <Button
              icon={<DownloadOutlined />}
              onClick={() => setIsExportModalOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-1"
            >
              Xuất Excel
            </Button>
            <label htmlFor="upload-excel" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded cursor-pointer flex items-center gap-2">
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
            <ColumnVisibilityControl
              columns={columnConfigs}
              visibleColumns={visibleColumns}
              onChange={handleColumnVisibilityChange}
            />
          </div>
        </div>

        {/* Column Visibility Control */}


        {/* Table */}
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={columnsWithActions}
          dataSource={searchResults}
          rowKey="senderId"
          size="small"
          rowClassName={rowClassName}
          className="bg-white rounded-lg shadow-sm"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số ${total} người gửi`,
          }}
          scroll={{ x: 1500 }}
        />

        {/* Add BulkEditModal */}
        <BulkEditModal />

        {/* Modals */}
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
      </div>
    </Card>
  </MainLayout>;
}
