import { ColumnsType } from "antd/es/table";
import { Order } from "@/types/Order";
import { Tag, Tooltip, Space, Progress } from "antd";
import type { ExtendedColumnType } from "@/components/recipients/columns";
import { CalendarOutlined, IdcardOutlined, PhoneOutlined, HomeOutlined, UserOutlined, EnvironmentOutlined, InboxOutlined, DollarOutlined, FileTextOutlined, RocketOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { formatDate } from "@/utils/format";
import { PAYMENT_STATUS, PaymentStatusType } from '@/constants/payments';
import { getCustomerForOrder ,getPaymentForOrder,getRecipientForOrder } from '@/utils/orderHelpers';
import { senderMockData } from "@/mocks/senderMockData";
import { recipientMockData } from "@/mocks/recipientMockData";
import { PaymentMockData } from "@/mocks/PaymentMockData";
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
    title: <><HomeOutlined /> Gửi Từ</>,
    dataIndex: 'senderId',
    key: 'senderAddress',
    width: 150,
    ellipsis: {
      showTitle: false,
    },
    render: (senderId: string) => (
        <span>{getCustomerForOrder(senderMockData, senderId)?.address || ''}</span>
    ),
  },
  {
    title: <> Loại Vận Chuyển</>,
    dataIndex: 'serviceType',
    key: 'serviceType',
    width: 150,
    ellipsis: {
      showTitle: false,
    },
    render: (serviceType: string) => (
      <Tooltip title={serviceType === 'sea' ? 'Đường biển' : serviceType === 'air' ? 'Đường hàng không' : 'Chưa xc định'}>
        <span className="flex justify-center items-center">
          {serviceType === 'sea' ? '🚢' : serviceType === 'air' ? '✈️' : null}
        </span>
      </Tooltip>
    ),
  },
  {
    title: <><UserOutlined /> Người Nhận</>,
    dataIndex: 'recipientId',
    key: 'receiverName',
    width: 200,
    render: (recipientId: string) => getRecipientForOrder(recipientMockData, recipientId)?.name || '',
  },
  {
    title: <><UserOutlined />SDT  Người Nhận</>,
    dataIndex: 'recipientId',
    key: 'receiverPhone',
    width: 200,
    render: (recipientId: string) => getRecipientForOrder(recipientMockData, recipientId)?.phone || '',
  },
  {
    title: <><UserOutlined />Khu Vực</>,
    dataIndex: 'recipientId',
    key: 'receiverRegion',
    width: 200,
    render: (recipientId: string) => getRecipientForOrder(recipientMockData, recipientId)?.region || '',
  },
  {
    title: <><UserOutlined />Địa Chỉ Người Nhận</>,
    dataIndex: 'recipientId',
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
    dataIndex: 'paymentId',
    key: 'paymentStatus',
    width: 200,
    render: (paymentId: string) => {
      const payment = getPaymentForOrder(PaymentMockData, paymentId);
      if (!payment) return <Tag>Không xác định</Tag>;

      const percentPaid = (payment.paidAmount / payment.amount) * 100;

      return (
        <Space direction="vertical" size="small">
          {payment.status === 'PAID' && (
            <Tag color="success">Đã thanh toán</Tag>
          )}
          {payment.status === 'PARTIAL' && (
            <>
              <Tag color="warning">Thanh toán một phần</Tag>
              <Progress 
                percent={Math.round(percentPaid)} 
                size="small" 
                status="active"
              />
              <small>
                {payment.paidAmount.toLocaleString('vi-VN')} / 
                {payment.amount.toLocaleString('vi-VN')} VNĐ
              </small>
            </>
          )}
          {payment.status === 'UNPAID' && (
            <Tag color="error">Chưa thanh toán</Tag>
          )}
        </Space>
      );
    },
  },
  {
    title: 'Chi Tiết Thanh Toán',
    dataIndex: 'paymentId',
    key: 'paymentDetails',
    width: 200,
    render: (paymentId: string) => {
      const payment = getPaymentForOrder(PaymentMockData, paymentId);
      if (!payment) return null;

      return (
        <Space direction="vertical" size="small">
          <div>Tổng tiền: {payment.amount.toLocaleString('vi-VN')} VNĐ</div>
          {payment.isPartialPayment && payment.partialPaymentHistory && (
            <Tooltip 
              title={
                <div>
                  {payment.partialPaymentHistory.map((history, index) => (
                    <div key={index}>
                      {formatDate(history.paidAt)}: {history.amount.toLocaleString('vi-VN')} VNĐ
                      <br />
                      {history.paymentMethod} - {history.note}
                    </div>
                  ))}
                </div>
              }
            >
              <Tag color="processing">Xem lịch sử thanh toán</Tag>
            </Tooltip>
          )}
          {payment.paymentNote && (
            <Tooltip title={payment.paymentNote}>
              <Tag color="default">Ghi chú</Tag>
            </Tooltip>
          )}
        </Space>
      );
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
