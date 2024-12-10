"use client"
import { useState, useEffect } from 'react';
import { Order } from '@/types/Order';
import AddOrderModal from '@/components/modals/AddOrderModal';
import { OrderMockData } from '@/mocks/OrderMock';
import { Table, Button, Tag, Card, Modal, Tooltip, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { UploadOutlined, PlusOutlined, DeleteOutlined, EditOutlined, PrinterOutlined, DollarOutlined } from '@ant-design/icons';
import { exportToExcel, importFromExcel } from './excel'
import ColumnVisibilityControl from '@/components/common/ColumnVisibilityControl';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import ExportModal from '@/components/common/ExportModal';
import { orderExportConfig, createExportData } from '@/configs/exportConfig';
import { columns } from './columns'
import MainLayout from '@/layout/MainLayout';
import AddMultiOrderModal from '@/components/modals/AddMuiltiOrders/AddMultiOrderModal';
import PrintModal from '@/components/modals/PrintModal';
import { PAYMENT_STATUS } from '@/constants/payments';
export default function CreateSingleOrder() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMultiModalOpen, setIsMultiModalOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(OrderMockData);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<Order[]>([]);
  const [lastClickedOrder, setLastClickedOrder] = useState<string | null>(null);
  const [printStatuses, setPrintStatuses] = useState<Record<string, 'Đã in' | 'Chưa in'>>({});
  const [showUnprintedOnly, setShowUnprintedOnly] = useState(false);

  // Cu hình các cột quan trọng nhất
  const columnConfigs = [
    { key: 'orderId', label: 'Mã Đơn Hàng' },
    { key: 'senderId', label: 'Mã KH' },
    { key: 'senderName', label: 'Người Gửi' },
    { key: 'senderPhone', label: 'SĐT Người Gửi' },
    {
      key: 'senderAddress', label: 'Dia chi gui'
    },
    {
      key: 'receiverName', label: 'Nguoi nhan'
    },
    {
      key: 'receiverPhone', label: 'SDT Nguoi nhan'
    },
    {
      key: 'receiverRegion', label: 'Khu vuc '
    },
    {
      key: 'receiverAddress', label: 'Dia chi nhan '
    },
    { key: 'totalAmount', label: 'Thành Tiền' },
    { key: 'paymentStatus', label: 'Thanh Toán' },
    { key: 'note', label: 'Ghi Chú' },
  ];

  // Mặc định hiển thị các cột quan trọng
  const defaultVisibleColumns = {
    orderId: true,
    senderId: true,
    createdAt: true,
    senderName: true,
    senderPhone: true,
    senderAddress: true,
    receiverName: true,
    receiverPhone: true,
    receiverRegion: true,
    receiverAddress: true,
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
    if (editingOrder) {
      setOrders(orders.map(order =>
        order.orderId === editingOrder.orderId ? values : order
      ));
      setEditingOrder(null);
    } else {
      setOrders([...orders, values]);
    }
    setIsModalOpen(false);
  };

  const handleMultiSubmit = (values: Order[]) => {
    setOrders([...orders, ...values]);
    setIsMultiModalOpen(false);
  };

  // Cập nhật hàm xử lý xuất Excel
  const handleExport = async (selectedFields: string[]) => {
    await exportToExcel(orders, selectedFields);
    setIsExportModalOpen(false);
  };

  // Xử lý nhập Excel
  const handleUpdateFromExcel = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const jsonData = await importFromExcel(file);
      setOrders(jsonData);
    } catch (error) {
      console.error('Error importing Excel:', error);
      // Thêm xử lý lỗi nếu cần
    }
  };

  const handleEdit = (record: Order) => {
    console.log('Editing order:', record); // Debug log
    setEditingOrder({
      ...record,
      // Ensure dates are properly formatted
      shipmentDate: record.shipmentDate ? new Date(record.shipmentDate) : new Date(),
      deliveryDate: record.deliveryDate ? new Date(record.deliveryDate) : new Date(),
      createdAt: record.createdAt ? new Date(record.createdAt) : new Date(),
      updatedAt: record.updatedAt ? new Date(record.updatedAt) : new Date(),
    });
    setIsModalOpen(true);
  };

  const handleDelete = (record: Order) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc chắn muốn xóa đơn hàng ${record.orderId}?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => {
        setOrders(orders.filter(order => order.orderId !== record.orderId));
      }
    });
  };

  const handlePrint = (orders: Order[]) => {
    setPrintStatuses(prevStatuses => {
      const newStatuses = { ...prevStatuses };
      orders.forEach(order => {
        newStatuses[order.orderId] = 'Đã in';
      });
      localStorage.setItem('printStatuses', JSON.stringify(newStatuses));
      return newStatuses;
    });
    setIsDetailsModalOpen(false);
  };

  // Add new payment handler
  const handlePayment = (record: Order) => {
    let inputAmount = 0;

    Modal.confirm({
      title: 'Xác nhận thanh toán',
      content: (
        <div className="space-y-3">
          <p>Tổng tiền cần thanh toán: {record.totalAmount.toLocaleString()}đ</p>
          <Input
            type="number"
            placeholder="Nhập số tiền thanh toán"
            onChange={(e) => {
              inputAmount = Number(e.target.value);
            }}
          />
        </div>
      ),
      okText: 'Xác nhận',
      okType: 'primary',
      cancelText: 'Hủy',
      onOk: () => {
        const newPaidAmount = (record.totalAmount || 0) + inputAmount;
        const newRemainingAmount = record.totalAmount - newPaidAmount;
        const newStatus = newPaidAmount >= record.totalAmount
          ? PAYMENT_STATUS.PAID
          : newPaidAmount > 0
            ? PAYMENT_STATUS.PARTIAL
            : PAYMENT_STATUS.UNPAID;

        setOrders(orders.map(order =>
          order.orderId === record.orderId
            ? {
              ...order,
              paymentStatus: newStatus,
              paidAmount: newPaidAmount,
              remainingAmount: newRemainingAmount
            }
            : order
        ));
      }
    });
  };
  // Update the action column to include payment button
  const actionColumn: ColumnsType<Order>[0] = {
    title: 'Thao tác',
    key: 'action',
    fixed: 'right',
    width: 180,
    render: (_, record) => (
      <div className="flex gap-2">
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
          className="text-blue-500 hover:text-blue-600"
        />
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record)}
          className="text-red-500 hover:text-red-600"
        />
        {record.paymentStatus !== PAYMENT_STATUS.PAID && (
          <Button
            type="text"
            icon={<DollarOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handlePayment(record);
            }}
            className="text-gray-500 hover:text-green-600"
          />
        )}
        <Tooltip title={printStatuses[record.orderId] === 'Đã in' ? 'Đơn hàng đã được in' : ''}>
          <Button
            type="text"
            icon={<PrinterOutlined />}
            onClick={() => {
              setSelectedOrder(record);
              setIsDetailsModalOpen(true);
            }}
            className={
              printStatuses[record.orderId] === 'Đã in'
                ? 'text-gray-300 pointer-events-none'
                : 'text-gray-500 hover:text-gray-600'
            }
          />
        </Tooltip>
      </div>
    ),
  };

  // Update filteredColumns to include action column
  const updatedFilteredColumns = [...filteredColumns, actionColumn];

  // Cập nhật hàm đóng modal
  const handleCloseMultiModal = () => {
    setIsMultiModalOpen(false);
    // Refresh data nếu cần
    // fetchOrders();
  };

  // Cập nhật component Table với rowSelection
  const rowSelection = {
    selectedRowKeys: selectedOrders.map(order => order.orderId),
    onChange: (selectedRowKeys: React.Key[], selectedRows: Order[]) => {
      setSelectedOrders(selectedRows);
    }
  };

  // Thêm nút in cho các đơn hàng đã chọn
  const renderBulkActions = () => (
    <div className="mb-4">
      {selectedOrders.length > 0 && (
        <Button
          icon={<PrinterOutlined />}
          onClick={() => setIsDetailsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          In {selectedOrders.length} đơn hàng đã chọn
        </Button>
      )}
    </div>
  );

  // Thêm hàm xử lý click vào row
  const handleRowClick = (record: Order) => {
    const newOrders = [...orders];
    const index = newOrders.findIndex(order => order.orderId === record.orderId);
    if (index > -1) {
      const [selectedOrder] = newOrders.splice(index, 1);
      newOrders.unshift(selectedOrder);
      setOrders(newOrders);
      setLastClickedOrder(record.orderId);

      // Reset màu nền sau 2 giây
      setTimeout(() => {
        setLastClickedOrder(null);
      }, 2000);
    }
  };

  // Add a new useEffect to handle localStorage
  useEffect(() => {
    const saved = localStorage.getItem('printStatuses');
    if (saved) {
      setPrintStatuses(JSON.parse(saved));
    }
  }, []); // Empty dependency array means this runs once on mount

  // Add filter function for orders
  const filteredOrders = showUnprintedOnly
    ? orders.filter(order => printStatuses[order.orderId] !== 'Đã in')
    : orders;

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
              icon={<UploadOutlined />}
              onClick={() => setIsExportModalOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white border-none"
            >
              Xuất Excel
            </Button>
            {/* <Button
              icon={<DownloadOutlined />}
              className="bg-blue-500 hover:bg-blue-600 text-white border-none"
              onClick={() => document.getElementById('upload-excel')?.click()}
            >
              Nhập Excel
            </Button> */}
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
            <ColumnVisibilityControl
              columns={columnConfigs}
              visibleColumns={visibleColumns}
              onChange={handleColumnVisibilityChange}
            />
          </div>
        </div>

        <div className="mb-4 space-y-4">
          {/* Add filter toggle button */}
          <div className="flex items-center space-x-2">
            <Button
              type={showUnprintedOnly ? "primary" : "default"}
              icon={<PrinterOutlined />}
              onClick={() => setShowUnprintedOnly(!showUnprintedOnly)}
              className={showUnprintedOnly ? "bg-blue-500" : ""}
            >
              {showUnprintedOnly ? "Đang lọc đơn chưa in" : "Lọc đơn chưa in"}
            </Button>
            {showUnprintedOnly && (
              <span className="text-gray-500">
                ({filteredOrders.length} đơn chưa in)
              </span>
            )}
          </div>

          {/* Existing column visibility control */}

        </div>

        {/* Thêm bulk actions */}
        {renderBulkActions()}

        <Table
          rowSelection={rowSelection}
          columns={updatedFilteredColumns}
          dataSource={filteredOrders}
          rowKey="orderId"
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
            style: { cursor: 'pointer' }
          })}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số ${total} đơn hàng`,
          }}
          className="shadow-sm"
          scroll={{ x: 'max-content' }}
          bordered
          size="middle"
          rowClassName={(record, index) => {
            if (record.orderId === lastClickedOrder) {
              return 'bg-yellow-100 transition-colors duration-1000';
            }
            return index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
          }}
        />
      </Card>

      <AddOrderModal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingOrder(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingOrder || undefined}
        mode={editingOrder ? "edit" : "add"}
      />

      <AddMultiOrderModal
        open={isMultiModalOpen}
        onCancel={handleCloseMultiModal}
        onSubmit={handleMultiSubmit}
      />

      <ExportModal
        open={isExportModalOpen}
        onCancel={() => setIsExportModalOpen(false)}
        onExport={handleExport}
        fields={orderExportConfig}
      />

      <PrintModal
        open={isDetailsModalOpen}
        onCancel={() => {
          setIsDetailsModalOpen(false);
          setSelectedOrder(null);
        }}
        orders={selectedOrders.length > 0 ? selectedOrders : (selectedOrder ? [selectedOrder] : [])}
        onPrint={handlePrint}
      />
    </MainLayout>
  );
}
