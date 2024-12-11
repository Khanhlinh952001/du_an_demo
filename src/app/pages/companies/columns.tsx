
import type { CompanyInfo } from '@/types/Company';
import { PlusOutlined, EditOutlined, DeleteOutlined, CheckCircleOutlined, StopOutlined } from '@ant-design/icons';
import { Button, Space } from "antd";

interface ColumnActionsProps {
    handleEdit: (record: CompanyInfo) => void;
    handleDelete: (record: CompanyInfo) => void;
}

export const getColumns = ({ handleEdit, handleDelete }: ColumnActionsProps) => [
    {
      title: 'Tên công ty',
      dataIndex: 'name',
      key: 'name',
        sorter: (a: CompanyInfo, b: CompanyInfo) => a.companyName.localeCompare(b.companyName),
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
      render: (_: any, record: CompanyInfo) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="hover:bg-blue-50"
            type="text"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            danger
            type="text"
            className="hover:bg-red-50"
          />
        </Space>
      ),
    },
  ];
