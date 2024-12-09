'use client';

import { useState, useEffect } from 'react';
import { Card, Table, Button, Space, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, CheckCircleOutlined, StopOutlined } from '@ant-design/icons';
import { Company } from '@/types/Company';
import MainLayout from '@/layout/MainLayout';
import { CompanyMockData } from '@/mocks/CompanyMockData';
import ColumnVisibilityControl from '@/components/common/ColumnVisibilityControl';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import { getColumns } from './columns';
const { Search } = Input;

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  const handleEdit = (company: Company) => {
    console.log('Edit company:', company);
  };

  const handleDelete = (company: Company) => {
    console.log('Delete company:', company);
  };

  const columnConfigs = [
    { key: 'name', label: 'Tên công ty' },
    { key: 'taxCode', label: 'Mã số thuế' },
    { key: 'bizLicenseNumber', label: 'Số giấy phép' },
    { key: 'address', label: 'Địa chỉ' },
    { key: 'representativeName', label: 'Người đại diện' },
    { key: 'isActive', label: 'Trạng thái' },
    { key: 'actions', label: 'Thao tác' }
  ];

  const defaultVisibleColumns = {
    name: true,
    taxCode: true,
    bizLicenseNumber: true,
    address: true,
    representativeName: true,
    isActive: true,
  };

  const {
    visibleColumns,
    handleColumnVisibilityChange,
    filteredColumns
  } = useColumnVisibility(getColumns({ handleEdit, handleDelete }), defaultVisibleColumns);

  useEffect(() => {
    setTimeout(() => {
      setCompanies(CompanyMockData);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <MainLayout>
      <Card className="shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Quản lý công ty
          </h1>
          <p className="text-gray-500 mt-1 mb-4">Quản lý và theo dõi thông tin công ty</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <Space>
              <Search
                placeholder="Tìm kiếm công ty"
                style={{ width: 300 }}
                // TODO: Implement search functionality
              />
            </Space>
          </div>
          <div className="flex space-x-3">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => console.log('Add new company')}
            >
              Thêm công ty mới
            </Button>
          </div>
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
          columns={filteredColumns}
          dataSource={companies}
          loading={loading}
          rowKey="id"
          scroll={{ x: 1500 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} công ty`,
          }}
        />
      </Card>
    </MainLayout>
  );
}
