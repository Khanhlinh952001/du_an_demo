'use client';

import React, { useState, useEffect } from 'react';
import {
  Table,
  Card,
  Space,
  DatePicker,
  Select,
  Input,
  Button,
  Tag,
  Modal,
} from 'antd';
import { SearchOutlined, DollarOutlined, DownloadOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { OrderMockData } from '@/mocks/OrderMock';
import MainLayout from '@/layout/MainLayout';
import { PDFViewer } from '@react-pdf/renderer';
import QuotationPDF from '@/components/QuotationPDF';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { BatchQuotationPDF } from '@/components/QuotationPDF';

const { RangePicker } = DatePicker;

interface UnpaidOrder {
  key: string;
  date: string;
  name: string;
  route: string;
  type: string;
  importExport: string;
  amount: number;
  orderDetails: typeof OrderMockData[0];
}

export default function DebtPage() {
  const [searchText, setSearchText] = useState('');
  const [paymentModal, setPaymentModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<UnpaidOrder | null>(null);
  const [filteredOrders, setFilteredOrders] = useState<UnpaidOrder[]>([]);
  const [selectedRows, setSelectedRows] = useState<UnpaidOrder[]>([]);
  const [exchangeRateModal, setExchangeRateModal] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [showPDFPreview, setShowPDFPreview] = useState(false);

  // Khởi tạo danh sách đơn hàng chưa thanh toán từ OrderMockData
  useEffect(() => {
    const unpaidOrders = OrderMockData
      .filter(order => !order.paymentStatus)
      .map(order => ({
        key: order.orderId,
        date: order.shipmentDate.toLocaleDateString('vi-VN'),
        name: order.senderName,
        route: `${order.origin} - ${order.destination}`,
        type: order.serviceType.toUpperCase(),
        importExport: order.shippingType.toUpperCase(),
        amount: order.totalAmount,
        orderDetails: order
      }));
    setFilteredOrders(unpaidOrders);
  }, []);

  // Xử lý tìm kiếm
  const handleSearch = (value: string) => {
    const baseOrders = OrderMockData.filter(order => !order.paymentStatus);
    const filtered = baseOrders
      .filter(order => 
        order.senderName.toLowerCase().includes(value.toLowerCase()))
      .map(mapOrderToUnpaidOrder);
    setFilteredOrders(filtered);
    setSearchText(value);
  };

  // Xử lý lọc theo khoảng thời gian
  const handleDateRangeChange = (dates: any) => {
    const baseOrders = OrderMockData.filter(order => !order.paymentStatus);
    if (!dates) {
      setFilteredOrders(baseOrders.map(mapOrderToUnpaidOrder));
      return;
    }

    const [start, end] = dates;
    const filtered = baseOrders
      .filter(order => {
        const orderDate = new Date(order.shipmentDate);
        return orderDate >= start && orderDate <= end;
      })
      .map(mapOrderToUnpaidOrder);
    setFilteredOrders(filtered);
  };

  // Hàm helper để map Order sang UnpaidOrder
  const mapOrderToUnpaidOrder = (order: typeof OrderMockData[0]): UnpaidOrder => ({
    key: order.orderId,
    date: order.shipmentDate.toLocaleDateString('vi-VN'),
    name: order.senderName,
    route: `${order.origin} - ${order.destination}`,
    type: order.serviceType.toUpperCase(),
    importExport: order.shippingType.toUpperCase(),
    amount: order.totalAmount,
    orderDetails: order
  });

  // Xử lý thanh toán
  const handlePayment = (order: UnpaidOrder) => {
    setSelectedOrder(order);
    setPaymentModal(true);
  };

  const handleBatchQuotation = async () => {
    if (exchangeRate <= 0) {
      Modal.error({
        title: 'Lỗi',
        content: 'Vui lòng nhập tỷ giá hợp lệ',
      });
      return;
    }
    
    if (selectedRows.length > 0) {
      // Generate single PDF with multiple pages
      const blob = await pdf(
        <BatchQuotationPDF 
          orders={selectedRows.map(order => ({
            ...order,
            orderDetails: {
              ...order.orderDetails,
              note: order.orderDetails.note || '' // Ensure note is never undefined
            }
          }))} 
          exchangeRate={exchangeRate} 
        />
      ).toBlob();
      saveAs(blob, `bao-gia-hang-loat.pdf`);
      setSelectedRows([]);
    } else if (selectedOrder) {
      // Single quotation logic remains the same
      const blob = await pdf(
        <QuotationPDF 
          order={{
            ...selectedOrder,
            orderDetails: {
              ...selectedOrder.orderDetails,
              note: selectedOrder.orderDetails.note || '' // Ensure note is never undefined
            }
          }}
          exchangeRate={exchangeRate} 
        />
      ).toBlob();
      saveAs(blob, `bao-gia-${selectedOrder.key}.pdf`);
    }
    
    setExchangeRateModal(false);
    setShowPDFPreview(false);
  };

  const handleCreateQuotation = (order: UnpaidOrder) => {
    setSelectedOrder(order);
    setExchangeRateModal(true);
  };

  const columns: TableProps<UnpaidOrder>['columns'] = [
    {
      title: 'Ngày gửi',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: 'Người gửi',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tuyến đường',
      dataIndex: 'route',
      key: 'route',
    },
    {
      title: 'Loại vận chuyển',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: 'Đường bay', value: 'AIR' },
        { text: 'Đường biển', value: 'SEA' },
      ],
      render: (type) => (
        <Tag color={type === 'AIR' ? 'blue' : 'green'}>
          {type === 'AIR' ? 'Đường bay' : 'Đường biển'}
        </Tag>
      ),
    },
    {
      title: 'Xuất/Nhập',
      dataIndex: 'importExport',
      key: 'importExport',
      filters: [
        { text: 'Xuất khẩu', value: 'EXPORT' },
        { text: 'Nhập khẩu', value: 'IMPORT' },
      ],
      render: (type) => (
        <Tag color={type === 'EXPORT' ? 'orange' : 'purple'}>
          {type === 'EXPORT' ? 'Xuất khẩu' : 'Nhập khẩu'}
        </Tag>
      ),
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `${amount.toLocaleString()} VND`,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<DollarOutlined />}
            onClick={() => handlePayment(record)}
          >
            Thanh toán
          </Button>
          <Button
            type="default"
            onClick={() => handleCreateQuotation(record)}
          >
            Tạo báo giá
          </Button>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: UnpaidOrder[]) => {
      setSelectedRows(selectedRows);
    }
  };

  return (
    <MainLayout>
      <Card title="Quản lý công nợ">
        <Space style={{ marginBottom: 16 }} direction="vertical" size="middle">
          <Space>
            <RangePicker 
              placeholder={['Từ ngày', 'Đến ngày']}
              onChange={handleDateRangeChange}
            />
            <Input
              placeholder="Tìm kiếm theo tên"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 200 }}
            />
          </Space>
          {selectedRows.length > 0 && (
            <Button
              type="default"
              onClick={() => {
                setSelectedRows(selectedRows);
                setExchangeRateModal(true);
              }}
            >
              Tạo báo giá hàng loạt ({selectedRows.length})
            </Button>
          )}
        </Space>

        <Table<UnpaidOrder>
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={columns}
          dataSource={filteredOrders}
          pagination={{ pageSize: 10 }}
          summary={(pageData) => {
            const total = pageData.reduce((sum, row) => sum + row.amount, 0);
            return (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={5}>
                  <strong>Tổng tiền:</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <span style={{ color: '#f50', fontWeight: 'bold' }}>
                    {total.toLocaleString('vi-VN')} VND
                  </span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2} />
              </Table.Summary.Row>
            );
          }}
        />

        <Modal
          title="Chi tiết thanh toán"
          open={paymentModal}
          width={800}
          onOk={() => {
            // Xử lý thanh toán
            setPaymentModal(false);
          }}
          onCancel={() => setPaymentModal(false)}
        >
          {selectedOrder && (
            <div>
              <h3>Thông tin đơn hàng</h3>
              <table style={{ width: '100%', marginBottom: '20px' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px', fontWeight: 'bold' }}>Mã đơn hàng:</td>
                    <td>{selectedOrder.key}</td>
                    <td style={{ padding: '8px', fontWeight: 'bold' }}>Ngày gửi:</td>
                    <td>{selectedOrder.date}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', fontWeight: 'bold' }}>Người gửi:</td>
                    <td>{selectedOrder.orderDetails.senderName}</td>
                    <td style={{ padding: '8px', fontWeight: 'bold' }}>SĐT:</td>
                    <td>{selectedOrder.orderDetails.senderPhone}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', fontWeight: 'bold' }}>Địa chỉ gửi:</td>
                    <td colSpan={3}>{selectedOrder.orderDetails.senderAddress}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', fontWeight: 'bold' }}>Người nhận:</td>
                    <td>{selectedOrder.orderDetails.receiverName}</td>
                    <td style={{ padding: '8px', fontWeight: 'bold' }}>SĐT:</td>
                    <td>{selectedOrder.orderDetails.receiverPhone}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', fontWeight: 'bold' }}>Địa chỉ nhận:</td>
                    <td colSpan={3}>{selectedOrder.orderDetails.receiverAddress}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', fontWeight: 'bold' }}>Loại hàng:</td>
                    <td>{selectedOrder.orderDetails.itemType}</td>
                    <td style={{ padding: '8px', fontWeight: 'bold' }}>Cân nặng:</td>
                    <td>{selectedOrder.orderDetails.weight} kg</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', fontWeight: 'bold' }}>Số kiện:</td>
                    <td>{selectedOrder.orderDetails.totalPackages}</td>
                    <td style={{ padding: '8px', fontWeight: 'bold' }}>Tracking:</td>
                    <td>{selectedOrder.orderDetails.trackingNumber}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', fontWeight: 'bold' }}>Ghi chú:</td>
                    <td colSpan={3}>{selectedOrder.orderDetails.note}</td>
                  </tr>
                </tbody>
              </table>
              
              <h3>Thông tin thanh toán</h3>
              <div style={{ 
                padding: '16px', 
                backgroundColor: '#f5f5f5', 
                borderRadius: '8px',
                marginTop: '16px'
              }}>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1890ff' }}>
                  Tổng số tiền cần thanh toán: {selectedOrder.amount.toLocaleString()} VND
                </p>
              </div>
            </div>
          )}
        </Modal>

        <Modal
          title="Nhập tỷ giá Won-VND"
          open={exchangeRateModal}
          onOk={handleBatchQuotation}
          onCancel={() => setExchangeRateModal(false)}
        >
          <Input
            type="number"
            prefix="₩"
            suffix="VND"
            placeholder="Nhập tỷ giá Won-VND"
            value={exchangeRate}
            onChange={(e) => setExchangeRate(Number(e.target.value))}
          />
        </Modal>

        <Modal
          title="Xem trước báo giá"
          open={showPDFPreview}
          onCancel={() => setShowPDFPreview(false)}
          width={1000}
          footer={[
            <Button 
              key="download" 
              type="primary" 
              icon={<DownloadOutlined />}
              onClick={handleBatchQuotation}
            >
              Tải xuống
            </Button>,
            <Button key="close" onClick={() => setShowPDFPreview(false)}>
              Đóng
            </Button>
          ]}
        >
          <div style={{ height: '70vh' }}>
            {selectedOrder && (
              <PDFViewer width="100%" height="100%">
                <QuotationPDF order={{
                  ...selectedOrder,
                  orderDetails: {
                    ...selectedOrder.orderDetails,
                    note: selectedOrder.orderDetails.note || ''
                  }
                }} exchangeRate={exchangeRate} />
              </PDFViewer>
            )}
          </div>
        </Modal>
      </Card>
    </MainLayout>
  );
}
