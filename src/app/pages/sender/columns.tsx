import type { Sender } from "@/types/Sender";
import { ColumnsType } from "antd/es/table";

export type ExtendedColumnType<T> = ColumnsType<T>[number] & {
  hidden?: boolean;
};

export const columns: ExtendedColumnType<Sender>[] = [
    {
      title: 'Mã KH',
      dataIndex: 'senderId',
      key: 'senderId',
      width: 100,
      className: 'font-medium',
    },
    {
      title: 'Tên KH',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      className: 'font-medium',
    },
    {
      title: 'Thông tin liên hệ',
      key: 'contact',
      width: 200,
      render: (record: Sender) => (
        <div className="flex flex-col gap-1">
          <div>{record.phone}</div>
          <div>{record.address}</div>
        </div>
      ),
    },
    {
      title: 'Kênh liên hệ',
      key: 'social',
      width: 150,
      render: (record: Sender) => (
        <div className="flex gap-2">
          {record.facebook && (
            <a href={record.facebook} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook text-blue-600 text-xl" />
            </a>
          )}
          {record.zalo && (
            <a href={record.zalo} target="_blank" rel="noopener noreferrer">
              <span className="text-blue-500 font-bold">Zalo</span>
            </a>
          )}
          {record.kakaoTalk && (
            <a href={record.kakaoTalk} target="_blank" rel="noopener noreferrer">
              <span className="text-yellow-400 font-bold">KakaoTalk</span>
            </a>
          )}
        </div>
      ),
    },
    {
      title: 'Thông tin đơn hàng',
      key: 'orderInfo',
      width: 150,
      render: (record: Sender) => (
        <div className="flex flex-col gap-1">
          <div>Số đơn: {record.orderCount || 0}</div>
          <div>Đơn giá: {record.unitPrice?.toLocaleString('vi-VN')}đ</div>
        </div>
      ),
    },
    {
      title: 'Thời gian',
      key: 'dates',
      width: 150,
      render: (record: Sender) => (
        <div className="flex flex-col gap-1">
          <div>Tham gia: {new Date(record.joinDate).toLocaleDateString('vi-VN')}</div>
          <div>Đăng ký: {new Date(record.registerDate).toLocaleDateString('vi-VN')}</div>
        </div>
      ),
    },
    {
      title: 'Quản lý',
      key: 'management',
      width: 150,
      render: (record: Sender) => (
        <div className="flex flex-col gap-1">
          <div>Handler: {record.handlerId || 'Chưa có'}</div>
        </div>
      ),
    }
  ];