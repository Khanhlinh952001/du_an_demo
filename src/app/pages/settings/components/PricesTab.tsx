'use client';

import { Card, Form, InputNumber, Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface PricesTabProps {
  currentUser: any;
}

interface PriceData {
  key: string;
  service: string;
  price: number;
  unit: string;
}

const columns: ColumnsType<PriceData> = [
  {
    title: 'Phương thức vận chuyển',
    dataIndex: 'service',
    key: 'service',
  },
  {
    title: 'Giá cước (VNĐ)',
    dataIndex: 'price',
    key: 'price',
    render: (price: number) => (
      <Form.Item name={`price_${price}`} initialValue={price}>
        <InputNumber 
          min={0}
          step={1000}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
         
        />
      </Form.Item>
    ),
  },
  {
    title: 'Đơn vị',
    dataIndex: 'unit',
    key: 'unit',
  }
];

const data: PriceData[] = [
  {
    key: '1',
    service: 'Đường bay',
    price: 0,
    unit: 'kg',
  },
  {
    key: '2',
    service: 'Đường biển',
    price: 0,
    unit: 'kg',
  }
];

export default function PricesTab({ currentUser }: PricesTabProps) {
  const [form] = Form.useForm();

  const handlePricesUpdate = (values: any) => {
    console.log('Prices updated:', values);
  };

  return (
    <Card>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ price: 100 }}
        onFinish={handlePricesUpdate}
      >
        <Table columns={columns} dataSource={data} pagination={false} />
        
        <Form.Item className="mt-4">
          <Button type="primary" htmlType="submit">
            Cập nhật bảng giá
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
} 
