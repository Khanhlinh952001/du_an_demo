'use client';

import { Card, Table, Button, Tag, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Employee {
  key: string;
  name: string;
  position: string;
  phone: string;
  status: 'active' | 'inactive';
}

const columns: ColumnsType<Employee> = [
  {
    title: 'Họ và tên',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Chức vụ',
    dataIndex: 'position',
    key: 'position',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Tag color={status === 'active' ? 'green' : 'red'}>
        {status === 'active' ? 'Đang làm việc' : 'Đã nghỉ việc'}
      </Tag>
    ),
  },
  {
    title: 'Thao tác',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary">Sửa</Button>
        <Button danger>Xóa</Button>
      </Space>
    ),
  },
];

const data: Employee[] = [

  {
    key: '2',
    name: 'Trần Thị B',
    position: 'Thu ngân',
    phone: '0987654321',
    status: 'active',
  },
  {
    key: '3',
    name: 'Lê Văn C',
    position: 'Nhân viên kế toán',
    phone: '0123456788',
    status: 'active',
  },
  {
    key: '4',
    name: 'Phạm Thị D',
    position: 'Nhân viên kho',
    phone: '0987654320',
    status: 'active',
  },
];

export default function EmployeesTab() {
  return (
    <Card>
      <div className="mb-4">
        <Button type="primary">Thêm nhân viên mới</Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </Card>
  );
} 
