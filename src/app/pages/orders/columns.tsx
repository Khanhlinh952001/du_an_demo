import { ColumnsType } from "antd/es/table";
import { Order } from "@/types/Order";
import { Tag, Tooltip } from "antd";
import type { ExtendedColumnType } from "../../../components/recipients/columns";
import { CalendarOutlined, IdcardOutlined, PhoneOutlined, HomeOutlined, UserOutlined, EnvironmentOutlined, InboxOutlined, DollarOutlined, FileTextOutlined } from '@ant-design/icons';
import { formatDate } from "@/utils/format";
import { PAYMENT_STATUS, PaymentStatusType } from '@/constants/payments';
import { getCustomerForOrder ,getRecipientForOrder } from '@/utils/orderHelpers';
import { senderMockData } from "@/mocks/senderMockData";
import { recipientMockData } from "@/mocks/recipientMockData";
export const columns: ExtendedColumnType<Order>[] = [
  {
    title: <><CalendarOutlined /> Ngày Xuất</>,
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date: Date) => formatDate(date),
    width: 120,
  },
  {
    title: <><IdcardOutlined /> Mã Đơn Hàng</>,
    dataIndex: 'orderId',
    key: 'orderId',
    width: 120,
  },
  {
    title: <><IdcardOutlined /> Mã KH</>,
    dataIndex: 'senderId',
    key: 'senderId',
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
    dataIndex: 'receiverId',
    key: 'receiverName',
    width: 200,
    render: (recipientId: string) => getRecipientForOrder(recipientMockData, recipientId)?.name || '',
  },
  {
    title: <><UserOutlined />SDT  Người Nhận</>,
    dataIndex: 'receiverId',
    key: 'receiverPhone',
    width: 200,
    render: (recipientId: string) => getRecipientForOrder(recipientMockData, recipientId)?.phone || '',
  },
  {
    title: <><UserOutlined /> Người Nhận</>,
    dataIndex: 'receiverId',
    key: 'receiverRegion',
    width: 200,
    render: (recipientId: string) => getRecipientForOrder(recipientMockData, recipientId)?.region || '',
  },
  {
    title: <><UserOutlined /> Người Nhận</>,
    dataIndex: 'receiverId',
    key: 'receiverAddress',
    width: 200,
    render: (recipientId: string) => getRecipientForOrder(recipientMockData, recipientId)?.address || '',
  },
  {
    title: <><InboxOutlined /> Số Kiện</>,
    dataIndex: 'totalPackages',
    key: 'totalPackages',
    width: 120,
  },
  {
    title: <><InboxOutlined /> Trọng Lượng</>,
    dataIndex: 'weight',
    key: 'weight',
    width: 120,
  },
  {
    title: <><DollarOutlined /> Giá</>,
    dataIndex: 'price',
    key: 'price',
    width: 120,
  },
  {
    title: <><DollarOutlined /> Thành Tiền</>,
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    width: 150,
    render: (amount: number) => (
      <Tooltip title={`${amount.toLocaleString('vi-VN')} VNĐ`}>
        <span className="font-medium text-green-600">
          {amount.toLocaleString('vi-VN')} VNĐ
        </span>
      </Tooltip>
    ),
  },
  {
    title: 'Trạng Thái Thanh Toán',
    dataIndex: 'paymentStatus',
    key: 'paymentStatus',
    width: 150,
    render: (status: PaymentStatusType, record: Order) => {
      let color = 'default';
      let text = '';
      
      switch (status) {
        case PAYMENT_STATUS.PAID:
          color = 'success';
          text = 'Đã thanh toán';
          break;
        case PAYMENT_STATUS.PARTIAL:
          color = 'warning';
          text = `Đã trả ${record.totalAmount?.toLocaleString()}/${record.totalAmount.toLocaleString()}`;
          break;
        case PAYMENT_STATUS.UNPAID:
          color = 'error';
          text = 'Chưa thanh toán';
          break;
      }
  
      return <Tag color={color}>{text}</Tag>;
    },
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
  {
    title: 'Số tiền',
    dataIndex: 'amount',
    key: 'amount',
    width: 150,
    render: (amount: number) => (
      <Tooltip title={`${amount?.toLocaleString('vi-VN') || '0'} VNĐ`}>
        <span>{amount?.toLocaleString('vi-VN') || '0'} VNĐ</span>
      </Tooltip>
    ),
  },
]
