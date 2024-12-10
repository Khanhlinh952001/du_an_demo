import type { Sender } from "@/types/Sender";
import { ColumnsType } from "antd/es/table";
import { PhoneOutlined, HomeOutlined, ShoppingOutlined, CalendarOutlined, UserOutlined, DollarOutlined ,UsergroupAddOutlined, MessageOutlined, CommentOutlined} from '@ant-design/icons';
import { SiZalo, SiFacebook, SiKakaotalk } from 'react-icons/si';
import { getEmployeeNameById } from "@/utils/employeeUtils";

export type ExtendedColumnType<T> = ColumnsType<T>[number] & {
  hidden?: boolean;
};

export const columns: ExtendedColumnType<Sender>[] = [
    {
      title: 'Mã KH',
      dataIndex: 'senderId',
      key: 'senderId',
      width: '8%',
      className: 'font-medium text-gray-700 whitespace-nowrap',
    },
    {
      title: 'Tên KH',
      dataIndex: 'name',
      key: 'name',
      width: '12%',
      className: 'font-medium text-gray-700',
      render: (text: string) => (
        <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
          {text}
        </span>
      ),
    },
    {
      title: 'Thông tin liên hệ',
      key: 'contact',
      width: '15%',
      render: (record: Sender) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 hover:bg-gray-100 p-1 rounded transition-colors">
            <PhoneOutlined className="text-blue-500" />
            <span className="text-gray-700">{record.phone || '-'}</span>
          </div>
          <div className="flex items-center gap-2 hover:bg-gray-100 p-1 rounded transition-colors">
            <HomeOutlined className="text-green-500" />
            <span className="text-gray-600 truncate max-w-[200px]">{record.address || '-'}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Kênh liên hệ',
      key: 'contactChannels',
      width: '15%',
      render: (record: Sender) => (
        <div className="flex flex-col gap-1">
          {record.contactChannels?.map((channel, index) => {
            const getChannelIcon = () => {
              switch (channel.toLowerCase()) {
                case 'zalo': return <SiZalo className="text-blue-500" />;
                case 'facebook': return <SiFacebook className="text-blue-600" />;
                case 'kakaotalk': return <SiKakaotalk className="text-yellow-500" />;
                default: return null;
              }
            };

            return (
              <span key={index} className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
                {getChannelIcon()}
                {channel}
              </span>
            );
          })}
        </div>
      ),
    },
    {
      title: 'Mạng xã hội',
      key: 'social',
      width: '10%',
      render: (record: Sender) => (
        <div className="flex items-center gap-2 py-1">
          {record.facebook && (
            <a href={record.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
              <SiFacebook className="text-xl" />
            </a>
          )}
          {record.zalo && (
            <a href={record.zalo} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
              <SiZalo className="text-xl" />
            </a>
          )}
          {record.kakaoTalk && (
            <a href={record.kakaoTalk} target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-600">
              <SiKakaotalk className="text-xl" />
            </a>
          )}
        </div>
      ),
    },
  
    {
      title: 'Đơn hàng',
      key: 'orderInfo',
      width: '12%',
      render: (record: Sender) => (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <ShoppingOutlined />
            <span className="font-medium">{record.orderCount || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarOutlined />
            <span className="font-medium text-gray-700">
              {record.sgnPrice?.toLocaleString('vi-VN')}
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
        <div className="flex items-center gap-1 text-gray-600">
          <CalendarOutlined />
          <span>{new Date(record.joinDate).toLocaleDateString('vi-VN')}</span>
        </div>
      ),
    },
    {
      title: 'Quản lý',
      key: 'management',
      width: '10%',
      render: (record: Sender) => (
        <div className="flex items-center gap-1 px-1.5 py-0.5 bg-green-50 rounded">
          <UserOutlined />
          <span className="font-medium text-gray-700">{getEmployeeNameById(record.handlerId || '') || '-'}</span>
        </div>
      ),
    },
    {
      title: 'Ghi chú',
      dataIndex: 'notes',
      key: 'notes',
      width: '13%',
      render: (text: string) => (
        <div className="flex items-center gap-1">
          <CommentOutlined />
          <span className="text-gray-600 truncate">{text || '-'}</span>
        </div>
      ),
    }
];
