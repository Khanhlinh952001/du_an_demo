import { Order } from "@/types/Order";
import { Tag, Tooltip } from "antd";
import type { ExtendedColumnType } from "../../../components/recipients/columns";
import { CalendarOutlined, IdcardOutlined, PhoneOutlined, HomeOutlined, UserOutlined, EnvironmentOutlined, InboxOutlined, DollarOutlined, FileTextOutlined } from '@ant-design/icons';
import { formatDate } from "@/utils/format";
import { PAYMENT_STATUS, PaymentStatusType } from '@/constants/payments';
import { getCustomerForOrder, getRecipientForOrder } from "@/utils/orderHelpers";
import { senderMockData } from "@/mocks/senderMockData";
import { recipientMockData } from "@/mocks/recipientMockData";

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
    dataIndex: 'senderId',
    key: 'senderName',
    width: 200,
    render: (senderId: string) => getCustomerForOrder(senderMockData, senderId)?.name || '',
  },
  {
    title: <><PhoneOutlined /> SĐT Người Gửi</>,
    dataIndex: 'senderId',
    key: 'senderPhone',

    width: 120,
    render: (senderId: string) => getCustomerForOrder(senderMockData, senderId)?.phone || '',
  },
  {
    title: <><PhoneOutlined /> Dia chi Gửi</>,
    dataIndex: 'senderId',
    key: 'senderAddress',

    width: 120,
    render: (senderId: string) => getCustomerForOrder(senderMockData, senderId)?.address || '',
  },
  
  {
    title: <><UserOutlined /> Người Nhận</>,
    dataIndex: 'recipientId',
    key: 'receiverName',
    width: 200,
    render: (recipientId: string) => getRecipientForOrder(recipientMockData, recipientId)?.name || '',
  },
  {
    title: <><UserOutlined />SDT Người Nhận</>,
    dataIndex: 'recipientId',
    key: 'receiverPhone',
    width: 200,
    render: (recipientId: string) => getRecipientForOrder(recipientMockData, recipientId)?.phone || '',
  },
  {
    title: <><UserOutlined />Khu vực</>,
    dataIndex: 'recipientId',
    key: 'receiverRegion',
    width: 200,
    render: (recipientId: string) => getRecipientForOrder(recipientMockData, recipientId)?.region || '',
  },
  {
    title: <><UserOutlined />Địa chỉ Người Nhận</>,
    dataIndex: 'recipientId',
    key: 'receiverAddress',
    width: 200,
    render: (recipientId: string) => getRecipientForOrder(recipientMockData, recipientId)?.address || '',
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
