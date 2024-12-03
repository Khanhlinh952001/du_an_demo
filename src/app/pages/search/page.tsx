"use client"
import { Order } from '@/types/Order';
import React, { useState } from 'react';
import { Card, Form, Input, DatePicker, Select, Button, Table, Space } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import MainLayout from '@/layout/MainLayout';
import { REGION } from '@/constants/constants';
import { Typography } from 'antd';
const { Title } = Typography;
const { RangePicker } = DatePicker;
import { columns } from './columns';
import { OrderMockData } from '@/mocks/OrderMock';
import ColumnVisibilityControl from '@/components/common/ColumnVisibilityControl';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import {
  filterByDateRange,
  filterBySender,
  filterByReceiver,
  filterByPaymentStatus,
  filterByRegion,
  filterByServiceType,
  filterByShippingType,
  filterByPhone
} from '@/utils/orderFilters';

// Cấu hình các cột có thể ẩn/hiện
const columnConfigs = [
  { key: 'createdAt', label: 'Ngày Xuất' },
  { key: 'orderId', label: 'Mã Đơn Hàng' },
  { key: 'senderName', label: 'Người Gửi' },
  { key: 'senderPhone', label: 'SĐT Người Gửi' },
  { key: 'senderAddress', label: 'Địa Chỉ Người Gửi' },
  { key: 'receiverName', label: 'Người Nhận' },
  { key: 'receiverPhone', label: 'SĐT Người Nhận' },
  { key: 'receiverRegion', label: 'Khu Vực' },
  { key: 'receiverAddress', label: 'Địa Chỉ Người Nhận' },
  { key: 'totalPackages', label: 'Số Kiện' },
  { key: 'weight', label: 'Trọng Lượng' },
  { key: 'price', label: 'Giá' },
  { key: 'totalAmount', label: 'Thành Tiền' },
  { key: 'paymentStatus', label: 'Trạng Thái Thanh Toán' },
  { key: 'note', label: 'Ghi Chú' },
];

// Định nghĩa các cột mặc định hiển thị
const defaultVisibleColumns = {
  createdAt: true,    // Ngày xuất
  orderId: true,      // Mã đơn hàng
  senderName: true,   // Người gửi
  receiverName: true, // Người nhận
  receiverRegion: true, // Khu vực
  totalPackages: true,  // Số kiện
  totalAmount: true,    // Thành tiền
  paymentStatus: true,  // Trạng thái thanh toán
  // Các cột còn lại mặc định ẩn
  senderPhone: false,
  senderAddress: false,
  receiverPhone: false,
  receiverAddress: false,
  weight: false,
  price: false,
  note: false,
};


const SearchPage: React.FC = () => {
  const [form] = Form.useForm();
  const [filteredData, setFilteredData] = useState<Order[]>(OrderMockData);

  // Sử dụng hook useColumnVisibility để quản lý việc ẩn/hiện cột
  const {
    visibleColumns,
    handleColumnVisibilityChange,
    filteredColumns
  } = useColumnVisibility(columns, defaultVisibleColumns);

  const onFinish = (values: any) => {
    let filtered = [...OrderMockData];

    // Kiểm tra các điều kiện đơn giản trước
    if (values.phone) {
      filtered = filterByPhone(filtered, values.phone);
    }

    if (values.sender) {
      filtered = filterBySender(filtered, values.sender);
    }

    if (values.receiver) {
      filtered = filterByReceiver(filtered, values.receiver);
    }

    if (values.paymentStatus) {
      filtered = filterByPaymentStatus(filtered, values.paymentStatus);
    }

    if (values.region) {
      filtered = filterByRegion(filtered, values.region);
    }

    if (values.serviceType) {
      filtered = filterByServiceType(filtered, values.serviceType);
    }

    if (values.shippingType) {
      filtered = filterByShippingType(filtered, values.shippingType);
    }

    // Để điều kiện phức tạp hơn xuống cuối
    if (values.shipmentDate?.length === 2) {
      const [startDate, endDate] = values.shipmentDate;
      filtered = filterByDateRange(filtered, startDate, endDate);
    }

    setFilteredData(filtered);
  };

  return (
    <MainLayout>
      <div style={{ padding: '24px' }}>
        <Title level={2} style={{ marginBottom: '24px', color: '#1890ff' }}>
          Quản lý đơn hàng
        </Title>
        
        <Card 
          title={<span style={{ fontSize: '18px', fontWeight: 500 }}>Tham số tra cứu</span>}
          style={{ 
            marginBottom: '24px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            borderRadius: '8px'
          }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '16px' 
            }}>
              <Form.Item label="Ngày gửi" name="shipmentDate">
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="Dịch vụ vận chuyển" name="serviceType">
                <Select placeholder="Chọn dịch vụ">
                  <Select.Option value="air">Đường bay</Select.Option>
                  <Select.Option value="sea">Đường biển</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Hình thức vận chuyển" name="shippingType">
                <Select placeholder="Chọn hình thức">
                  <Select.Option value="export">Xuất khẩu</Select.Option>
                  <Select.Option value="import">Nhập khẩu</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Người gửi" name="sender">
                <Input placeholder="Nhập tên người gửi" />
              </Form.Item>

              <Form.Item label="Số điện thoại" name="phone">
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>

              <Form.Item label="Khu vực" name="region">
                <Select placeholder="Chọn khu vực">
                  {Object.values(REGION).map((region) => (
                    <Select.Option key={region} value={region}>{region}</Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Người nhận" name="receiver">
                <Input placeholder="Nhập tên người nhận" />
              </Form.Item>

              <Form.Item label="Tình trạng thanh toán" name="paymentStatus">
                <Select placeholder="Chọn tình trạng">
                  <Select.Option value="all">Tất cả</Select.Option>
                  <Select.Option value="paid">Đã thanh toán</Select.Option>
                  <Select.Option value="unpaid">Chưa thanh toán</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item style={{ marginTop: '24px', textAlign: 'right' }}>
              <Space size="middle">
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  icon={<SearchOutlined />}
                  size="large"
                >
                  Tìm kiếm
                </Button>
                <Button 
                  icon={<DownloadOutlined />}
                  size="large"
                  style={{ 
                    backgroundColor: '#52c41a',
                    color: 'white'
                  }}
                >
                  Xuất Excel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>

        <Card title="Tùy chỉnh hiển thị" className="mb-4">
          <ColumnVisibilityControl
            columns={columnConfigs}
            visibleColumns={visibleColumns}
            onChange={handleColumnVisibilityChange}
            title="Chọn các cột muốn hiển thị:"
          />
        </Card>

        <Table
          columns={filteredColumns}
          dataSource={filteredData}
          scroll={{ x: 1800 }}
          style={{ 
            marginTop: '24px',
            overflowX: 'auto',
            width: '100%',
          }}
          bordered
          size="middle"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </div>
    </MainLayout>
  );
};

export default SearchPage;
