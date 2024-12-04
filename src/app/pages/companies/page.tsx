'use client';

import { useState, useEffect } from 'react';
import { Card, Table, Button, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, CheckCircleOutlined, StopOutlined } from '@ant-design/icons';
import { Company } from '@/types/Company';
import MainLayout from '@/layout/MainLayout';
import { FaBuilding } from 'react-icons/fa';
import { CompanyMockData } from '@/mocks/CompanyMockData';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    const loadMockData = () => {
      setTimeout(() => {
        setCompanies(CompanyMockData);
        setLoading(false);
      }, 1000); // Giả lập delay 1 giây
    };
    
    loadMockData();
  }, []);

  const columns = [
    {
      title: 'Tên công ty',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Company, b: Company) => a.name.localeCompare(b.name),
    },
    {
      title: 'Mã số thuế',
      dataIndex: 'taxCode',
      key: 'taxCode',
    },
    {
      title: 'Số giấy phép',
      dataIndex: 'bizLicenseNumber',
      key: 'bizLicenseNumber',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: 'Người đại diện',
      dataIndex: 'representativeName',
      key: 'representativeName',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {isActive ? (
            <><CheckCircleOutlined className="mr-1" />Đang hoạt động</>
          ) : (
            <><StopOutlined className="mr-1" />Ngừng hoạt động</>
          )}
        </span>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_: any, record: Company) => (
        <div className="flex gap-2">
          
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (company: Company) => {
    console.log('Edit company:', company);
    // Implement edit logic
  };

  const handleDelete = (company: Company) => {
    console.log('Delete company:', company);
    // Implement delete logic
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lý công ty</h1>
          <Button>
            <PlusOutlined className="mr-2 h-4 w-4" />
            Thêm công ty mới
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={companies}
          loading={loading}
        />
      </div>
    </MainLayout>
  );
}
