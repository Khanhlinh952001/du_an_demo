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


const mockData: Order[] = [
  {
    orderId: 'ORD001',
    manageId: 'MNG001',
    handlerId: 'HDL001',
    senderId: 'SND001',
    senderName: 'Nguyen Van A',
    senderPhone: '0123456789',
    senderAddress: '123 Đường ABC, Quận 1, TP. Hồ Chí Minh',
    receiverId: 'RCV001',
    receiverName: 'Tran Thi B',
    receiverPhone: '0987654321',
    receiverAddress: '456 Đường XYZ, Quận 2, TP. Hà Nội',
    origin: 'Hàn Quốc',
    destination: 'Việt Nam',
    serviceType: 'air',
    shippingType: 'export',
    itemType: 'Food',
    weight: 12,
    totalPackages: 2,
    trackingNumber: 'TRK001',
    shipmentDate: new Date('2024-01-01'),
    deliveryDate: new Date('2024-01-05'),
    createdAt: '2024-12-12',
    updatedAt: new Date(),
    status: 'Pending',
    paymentStatus: true,
    totalAmount: 1500000,
    note: 'Ghi chú mẫu',
    receiverRegion: 'SGN' ,
    price:8000   // SĐT người nhận
  },
  // Add more mock data if needed
];

const SearchPage: React.FC = () => {
  const [form] = Form.useForm();
  const [filteredData, setFilteredData] = useState<Order[]>(mockData);

  const onFinish = (values: any) => {
    console.log('Form values:', values); // Debug form values
    let filtered = [...mockData];
    console.log('Initial data:', filtered); // Debug initial data

    // Filter based on date range
    if (values.shipmentDate?.length === 2) {
      const [startDate, endDate] = values.shipmentDate;
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate.getTime() >= startDate.valueOf() 
          && orderDate.getTime() <= endDate.valueOf();
      });
      console.log('After date filter:', filtered); // Debug after date filter
    }

    // Filter by sender name
    if (values.sender) {
      filtered = filtered.filter(order => 
        order.senderName.toLowerCase().includes(values.sender.toLowerCase())
      );
      console.log('After sender filter:', filtered); // Debug after sender filter
    }

    // Filter by receiver name
    if (values.receiver) {
      filtered = filtered.filter(order => 
        order.receiverName.toLowerCase().includes(values.receiver.toLowerCase())
      );
      console.log('After receiver filter:', filtered); // Debug after receiver filter
    }

    // Filter by payment status
    if (values.paymentStatus && values.paymentStatus !== 'all') {
      filtered = filtered.filter(order => 
        order.paymentStatus === values.paymentStatus
      );
      console.log('After payment filter:', filtered); // Debug after payment filter
    }

    // Filter by region
    if (values.region) {
      filtered = filtered.filter(order => 
        order.origin === values.region || order.destination === values.region
      );
      console.log('After region filter:', filtered); // Debug after region filter
    }

    // Filter by service type
    if (values.serviceType) {
      filtered = filtered.filter(order => order.serviceType === values.serviceType);
      console.log('After service type filter:', filtered);
    }

    // Filter by shipping type
    if (values.shippingType) {
      filtered = filtered.filter(order => order.shippingType === values.shippingType);
      console.log('After shipping type filter:', filtered);
    }

    // Filter by phone
    if (values.phone) {
      filtered = filtered.filter(order => 
        order.senderPhone.includes(values.phone) || 
        order.receiverPhone.includes(values.phone)
      );
      console.log('After phone filter:', filtered);
    }

    setFilteredData(filtered);
    console.log('Final filtered data:', filtered); // Debug final results
  };

  const handleScroll = (direction: 'left' | 'right') => {
    const tableContainer = document.querySelector('.ant-table-content');
    if (tableContainer) {
      const scrollAmount = 300;
      if (direction === 'left') {
        tableContainer.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth'
        });
      } else {
        tableContainer.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    }
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

        <Table
          columns={columns}
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
