import type { Recipient } from "@/types/Recipient";
import { ColumnsType } from "antd/es/table";
import { 
  PhoneOutlined, 
  HomeOutlined, 
  UserOutlined, 
  EnvironmentOutlined,
  CarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';

export type ExtendedColumnType<T> = ColumnsType<T>[number] & {
  hidden?: boolean;
};

export const columns: ExtendedColumnType<Recipient>[] = [
  {
    title: 'Mã người nhận',
    dataIndex: 'recipientId',
    key: 'recipientId',
    width: '10%',
    className: 'font-semibold text-gray-700',
  },
  {
    title: 'Tên người nhận',
    dataIndex: 'name',
    key: 'name',
    width: '15%',
    className: 'font-semibold text-gray-700',
    render: (text: string) => (
      <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
        {text}
      </span>
    ),
  },
  {
    title: 'Thông tin liên hệ',
    key: 'contact',
    width: '20%',
    render: (_, record: Recipient) => (
      <div className="flex flex-col gap-2 py-1">
        <div className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded">
          <PhoneOutlined className="text-blue-500 text-lg" />
          <span className="text-gray-600 font-medium">
            {record.phone || 'Không có số điện thoại'}
          </span>
        </div>
        <div className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded">
          <HomeOutlined className="text-green-500 text-lg" />
          <span className="text-gray-500 truncate">
            {record.address || 'Không có địa chỉ'}
          </span>
        </div>
      </div>
    ),
  },
  {
    title: 'Khu vực',
    dataIndex: 'region',
    key: 'region',
    width: '15%',
    render: (text: string) => (
      <div className="flex items-center gap-2">
        <EnvironmentOutlined className="text-red-500 text-lg" />
        <span className="text-gray-700">{text}</span>
      </div>
    ),
  },
  {
    title: 'Đơn vị vận chuyển',
    dataIndex: 'shipper',
    key: 'shipper',
    width: '15%',
    render: (text: string) => (
      <div className="flex items-center gap-2">
        <CarOutlined className="text-blue-500 text-lg" />
        <span className="text-gray-700">{text}</span>
      </div>
    ),
  },
  {
    title: 'Trạng thái',
    key: 'status',
    width: '10%',
    render: (_, record: Recipient) => (
      <div className={`flex items-center gap-2 px-2 py-1 rounded-full ${
        record.isConfirmed 
          ? 'bg-green-50 text-green-600' 
          : 'bg-red-50 text-red-600'
      }`}>
        {record.isConfirmed ? (
          <>
            <CheckCircleOutlined className="text-lg" />
            <span>Đã xác nhận</span>
          </>
        ) : (
          <>
            <CloseCircleOutlined className="text-lg" />
            <span>Chưa xác nhận</span>
          </>
        )}
      </div>
    ),
  },
  {
    title: 'Quản lý',
    key: 'management',
    width: '15%',
    render: (_, record: Recipient) => (
      <div className="flex items-center gap-2 px-2 py-1 bg-gray-50 rounded-lg">
        <UserOutlined className="text-gray-500 text-lg" />
        <span className="font-medium text-gray-700">
          {record.handlerId || 'Chưa có'}
        </span>
      </div>
    ),
  },
]; 
