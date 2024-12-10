import { Order } from "@/types/Order";
import { Tag, Tooltip } from "antd";
import type { ExtendedColumnType } from "../../../../components/recipients/columns";
import { CalendarOutlined, IdcardOutlined, PhoneOutlined, HomeOutlined, UserOutlined, EnvironmentOutlined, InboxOutlined, DollarOutlined, FileTextOutlined } from '@ant-design/icons';
import { formatDate } from "@/utils/format";
import { PAYMENT_STATUS, PaymentStatusType } from '@/constants/payments';

export const columns: ExtendedColumnType<Order>[] = [
  {
    title: <><CalendarOutlined /> Ngày Tạo</>,
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 120,
    render: (date: Date) => formatDate(date),
  },
  {
    title: <><IdcardOutlined /> Mã Đơn</>,
    dataIndex: 'orderId',
    key: 'orderId',
    width: 120,
  },
  {
    title: <><UserOutlined /> Người Gửi</>,
    dataIndex: 'senderName',
    key: 'senderName',
    width: 200,
    render: (_, record) => (
      <Tooltip 
        title={
          <div className="p-1">
            <p><strong>Tên:</strong> {record.senderName}</p>
            <p><strong>SĐT:</strong> {record.senderPhone}</p>
            <p><strong>Địa chỉ:</strong> {record.senderAddress}</p>
          </div>
        }
        placement="topLeft"
      >
        <div className="cursor-pointer">
          <div className="font-medium">{record.senderName}</div>
          <div className="text-gray-500 text-sm">{record.senderPhone}</div>
        </div>
      </Tooltip>
    ),
  },
  {
    title: <><UserOutlined /> Người Nhận</>,
    dataIndex: 'receiverName',
    key: 'receiverName',
    width: 200,
    render: (_, record) => (
      <Tooltip 
        title={
          <div className="p-1">
            <p><strong>Tên:</strong> {record.receiverName}</p>
            <p><strong>SĐT:</strong> {record.receiverPhone}</p>
            <p><strong>Địa chỉ:</strong> {record.receiverAddress}</p>
            <p><strong>Khu vực:</strong> {record.receiverRegion}</p>
          </div>
        }
        placement="topLeft"
      >
        <div className="cursor-pointer">
          <div className="font-medium">{record.receiverName}</div>
          <div className="text-gray-500 text-sm">{record.receiverPhone}</div>
        </div>
      </Tooltip>
    ),
  },
  {
    title: <><EnvironmentOutlined /> Khu Vực</>,
    dataIndex: 'receiverRegion',
    key: 'receiverRegion',
    width: 100,
    render: (region: string) => (
      <Tag color="blue">{region}</Tag>
    ),
  },
  {
    title: <><InboxOutlined /> Số Kiện</>,
    dataIndex: 'totalPackages',
    key: 'totalPackages',
    width: 100,
  },
  {
    title: <><InboxOutlined /> Cân Nặng</>,
    dataIndex: 'weight',
    key: 'weight',
    width: 100,
    render: (weight: number) => `${weight} kg`,
  },
  {
    title: 'Loại Dịch Vụ',
    dataIndex: 'serviceType',
    key: 'serviceType',
    width: 120,
    render: (type: string) => (
      <Tag color={type === 'air' ? 'blue' : 'green'}>
        {type.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: <><DollarOutlined /> Đơn Giá</>,
    dataIndex: 'price',
    key: 'price',
    width: 120,
    render: (price: number) => (
      <span>{price?.toLocaleString('vi-VN')} VNĐ</span>
    ),
  },
  {
    title: <><DollarOutlined /> Tổng Tiền</>,
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    width: 120,
    render: (amount: number) => (
      <span className="font-medium text-green-600">
        {amount?.toLocaleString('vi-VN')} VNĐ
      </span>
    ),
  },
  {
    title: 'Trạng Thái',
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (status: string) => (
      <Tag color={
        status === 'Delivered' ? 'success' :
        status === 'InProgress' ? 'processing' :
        status === 'Pending' ? 'warning' : 'default'
      }>
        {status}
      </Tag>
    ),
  },
  {
    title: 'Thanh Toán',
    dataIndex: 'paymentStatus',
    key: 'paymentStatus',
    width: 120,
    render: (status: PaymentStatusType) => (
      <Tag color={
        status === 'PAID' ? 'success' :
        status === 'PARTIAL' ? 'warning' : 'error'
      }>
        {status === 'PAID' ? 'Đã thanh toán' :
         status === 'PARTIAL' ? 'Thanh toán một phần' : 'Chưa thanh toán'}
      </Tag>
    ),
  },
  {
    title: <><FileTextOutlined /> Ghi Chú</>,
    dataIndex: 'note',
    key: 'note',
    width: 200,
    ellipsis: {
      showTitle: false,
    },
    render: (note: string) => (
      <Tooltip title={note} placement="topLeft">
        <span>{note}</span>
      </Tooltip>
    ),
  },
]; 
