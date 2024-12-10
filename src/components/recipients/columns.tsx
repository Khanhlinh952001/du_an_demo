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
    width: '8%',
    className: 'font-semibold text-xs',
  },
  {
    title: 'Tên người nhận',
    dataIndex: 'name',
    key: 'name',
    width: '10%',
    className: 'font-semibold text-xs',
    render: (text: string) => (
      <span className="text-blue-600 hover:text-blue-800 cursor-pointer text-xs">
        {text}
      </span>
    ),
  },
  {
    title: 'Thông tin liên hệ',
    key: 'contact',
    width: '15%',
    className: 'text-xs',
    render: (_, record: Recipient) => (
      <div className="flex flex-col gap-1 py-1 text-xs">
        <div className="flex items-center gap-2">
          <PhoneOutlined />
          <span>
            {record.phone || 'Không có số điện thoại'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <HomeOutlined />
          <span className="truncate">
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
    width: '12%',
    className: 'text-xs',
    render: (text: string) => (
      <div className="flex items-center gap-2">
        <EnvironmentOutlined />
        <span className="text-xs">{text}</span>
      </div>
    ),
  },
  {
    title: 'Đơn vị vận chuyển',
    dataIndex: 'shipper',
    key: 'shipper',
    width: '12%',
    className: 'text-xs',
    render: (text: string) => (
      <div className="flex items-center gap-2">
        <CarOutlined />
        <span className="text-xs">{text}</span>
      </div>
    ),
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
    key: 'note',
    width: '12%',
    className: 'text-xs',
    render: (text: string) => (
      <div className="flex items-center gap-2">
        <span className="text-xs">{text}</span>
      </div>
    ),
  },
  {
    title: 'Quản lý',
    key: 'management',
    width: '12%',
    className: 'text-xs',
    render: (_, record: Recipient) => (
      <div className="flex items-center gap-2 px-2 py-1 bg-gray-50 rounded-lg">
        <UserOutlined />
        <span className="font-medium text-xs">
          {record.handlerId || 'Chưa có'}
        </span>
      </div>
    ),
  },
  ]; 
