import type { Sender } from "@/types/Sender";
import { ColumnsType } from "antd/es/table";
import { PhoneOutlined, HomeOutlined, ShoppingOutlined, CalendarOutlined, UserOutlined, DollarOutlined ,UsergroupAddOutlined, MessageOutlined, CommentOutlined} from '@ant-design/icons';
import { SiZalo, SiFacebook,SiKakaotalk } from 'react-icons/si';
import { getEmployeeNameById } from "@/utils/employeeUtils";

export type ExtendedColumnType<T> = ColumnsType<T>[number] & {
  hidden?: boolean;
};

export const columns: ExtendedColumnType<Sender>[] = [
    {
      title: 'Mã khách hàng',
      dataIndex: 'senderId',
      key: 'senderId',
      width: '10%',
      className: 'font-semibold text-gray-700',
    },
    {
      title: 'Tên khách hàng',
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
      render: (record: Sender) => (
        <div className="flex flex-col gap-2 py-1">
          <div className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded">
            <PhoneOutlined className="text-blue-500 text-lg" />
            <span className="text-gray-600 font-medium">{record.phone || '-'}</span>
          </div>
          <div className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded">
            <HomeOutlined className="text-green-500 text-lg" />
            <span className="text-gray-500 truncate">{record.address || '-'}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Mạng xã hội',
      key: 'social',
      width: '12%',
      render: (record: Sender) => (
        <div className="flex items-center gap-4 py-1">
          {record.facebook && (
            <a href={record.facebook} target="_blank" rel="noopener noreferrer" 
               className="hover:scale-110 transition-transform">
              <SiFacebook className="text-[#1877F2] text-xl" />
            </a>
          )}
          {record.zalo && (
            <a href={record.zalo} target="_blank" rel="noopener noreferrer"
               className="hover:scale-110 transition-transform">
              <SiZalo className="text-[#0068FF] text-xl" />
            </a>
          )}
          {record.kakaoTalk && (
            <a href={record.kakaoTalk} target="_blank" rel="noopener noreferrer"
               className="hover:scale-110 transition-transform">
              <SiKakaotalk className="text-[#FAE100] text-xl" />
            </a>
          )}
        </div>
      ),
    },
    {
      title: 'Kênh liên hệ',
      dataIndex: 'contactChannel',
      key: 'contactChannel',
      width: '10%',
      render: (text: string) => (
        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
          {text}
        </span>
      ),
    },
    {
      title: 'Đơn hàng',
      key: 'orderInfo',
      width: '13%',
      render: (record: Sender) => (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <ShoppingOutlined className="text-green-500 text-lg" />
            <span className="font-medium">{record.orderCount || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarOutlined className="text-amber-500 text-lg" />
            <span className="font-medium text-gray-700">
              {record.unitPrice?.toLocaleString('vi-VN')}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Thời gian',
      key: 'dates',
      width: '10%',
      render: (record: Sender) => (
        <div className="flex items-center gap-2 text-gray-600">
          <CalendarOutlined className="text-blue-500" />
          <span>{new Date(record.joinDate).toLocaleDateString('vi-VN')}</span>
        </div>
      ),
    },
    {
      title: 'Quản lý',
      key: 'management',
      width: '10%',
      render: (record: Sender) => (
        <div className="flex  items-center gap-2 px-2 py-1 bg-green-50 rounded-lg">
          <UserOutlined className="text-gray-500" />
          <span className="font-medium text-gray-700">{getEmployeeNameById(record.handlerId || "")  || '-'}</span>
        </div>
      ),
    }
];
