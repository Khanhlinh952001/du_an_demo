import type { Recipient } from "@/types/Recipient";
import { ColumnsType } from "antd/es/table";

export type ExtendedColumnType<T> = ColumnsType<T>[number] & {
  hidden?: boolean;
};

export const columns: ExtendedColumnType<Recipient>[] = [
  {
    title: 'Mã người nhận',
    dataIndex: 'recipientId',
    key: 'recipientId',
    width: 100,
    className: 'font-medium',
  },
  {
    title: 'Tên người nhận',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    className: 'font-medium',
  },
  {
    title: 'Thông tin liên hệ',
    key: 'contact',
    width: 200,
    render: (_, record: Recipient) => (
      <div className="flex flex-col gap-1">
        <div>{record.phone || 'Không có số điện thoại'}</div>
        <div>{record.address || 'Không có địa chỉ'}</div>
      </div>
    ),
  },
  {
    title: 'Khu vực',
    dataIndex: 'region',
    key: 'region',
    width: 150,
  },
  {
    title: 'Đơn vị vận chuyển',
    dataIndex: 'shipper',
    key: 'shipper',
    width: 150,
  },
  {
    title: 'Trạng thái',
    key: 'status',
    width: 150,
    render: (_, record: Recipient) => (
      <div>
        {record.isConfirmed ? 'Đã xác nhận' : 'Chưa xác nhận'}
      </div>
    ),
  },
  {
    title: 'Quản lý',
    key: 'management',
    width: 150,
    render: (_, record: Recipient) => (
      <div className="flex flex-col gap-1">
        <div>Admin: {record.manageId}</div>
        <div>Handler: {record.handlerId || 'Chưa có'}</div>
      </div>
    ),
  },
]; 