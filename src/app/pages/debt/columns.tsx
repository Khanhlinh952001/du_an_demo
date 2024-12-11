import { ColumnsType } from 'antd/es/table';
import { Order } from '@/types/Order';
import { ExtendedColumnType } from '../../../components/recipients/columns';
import { formatDate } from '@/utils/format';
import { CalendarOutlined, IdcardOutlined, PhoneOutlined, HomeOutlined, UserOutlined, EnvironmentOutlined, InboxOutlined, DollarOutlined, FileTextOutlined } from '@ant-design/icons';
import { Tag, Tooltip, Button, Space, Modal, Progress } from 'antd';
import { PAYMENT_STATUS, PaymentStatusType } from '@/constants';
import { Link, PDFDownloadLink } from '@react-pdf/renderer';
import QuotationPDF from '@/components/QuotationPDF';
import { getCustomerById, getCustomerForOrder, getPaymentForOrder } from '@/utils/orderHelpers';
import { senderMockData } from '@/mocks/senderMockData';
import { SiZalo } from 'react-icons/si';
import { SiKakaotalk } from 'react-icons/si';
import { FacebookFilled } from '@ant-design/icons';
import { PaymentMockData } from '@/mocks/PaymentMockData';
export const columns: ExtendedColumnType<Order>[] = [
    {
      title: <><CalendarOutlined /> Ngày Xuất</>,
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: Date) => formatDate(date),
      width: 60,
    },
    {
      title: <><IdcardOutlined /> Mã Đơn</>,
      dataIndex: 'orderId',
      key: 'orderId',
      width: 60,
    },
    {
      title: <><UserOutlined /> Khách Hàng</>,
      dataIndex: 'senderId',
      key: 'senderName',
      width: 80,
      render: (_, record) => (
        <span> {getCustomerForOrder(senderMockData, record.senderId)?.name || ''}</span>
      ),
    },
    {
      title: <><UserOutlined /> SĐT</>,
      dataIndex: 'senderId',
      key: 'contactInfo',
      width: 60,
      render: (senderId: string) => {
        const customer = getCustomerById(senderMockData, senderId);
        if (!customer) return '-';
        
        return (
            <Space>
              
                <Tooltip title={
                    <Space direction="horizontal">
                        {customer.contactChannels.includes('Facebook') && (
                            <a href={`https://facebook.com/${customer.facebook}`} target="_blank" rel="noopener noreferrer">
                                <FacebookFilled className='text-blue-500 bg-white rounded p-1' />
                            </a>
                        )}
                        {customer.contactChannels.includes('Zalo') && (
                            <a href={`https://zalo.me/${customer.zalo}`} target="_blank" rel="noopener noreferrer">
                                <SiZalo className='text-blue-500 bg-white rounded text-xl p-1' />
                            </a>
                        )}
                        {customer.contactChannels.includes('KakaoTalk') && (
                            <a href={`https://kakao.com/${customer.kakaoTalk}`} target="_blank" rel="noopener noreferrer">
                                <SiKakaotalk className='text-blue-500 bg-white rounded text-xl p-1' />
                            </a>
                        )}
                    </Space>
                }>
                    {/* <PhoneOutlined /> */}
              
                    {customer.phone}
                </Tooltip>
            </Space>
        );
    },      
    },
    {
      title: <><DollarOutlined /> Thành Tiền</>,
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: 60,
      render: (amount: number) => (
        <span className="font-medium text-green-600">
          {amount?.toLocaleString('vi-VN')} VNĐ
        </span>
      ),
    },
    {
      title: 'Trạng Thái Thanh Toán',
      dataIndex: 'paymentId',
      key: 'paymentStatus',
      width: 60,
      render: (paymentId: string) => {
        const payment = getPaymentForOrder(PaymentMockData, paymentId) ;
        if (!payment) return <Tag>Không xác định</Tag>;
  
  
        return (
          <Space direction="vertical" size="small">
            {payment.status === 'PAID' && (
              <Tag color="success">Đã thanh toán</Tag>
            )}
            {payment.status === 'PARTIAL' && (
              <>
                <Tag color="warning">Thanh toán một phần</Tag>
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
      width: 40,
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
      title: 'Thao Tác',
      key: 'action',
      width: 30,
      render: (_, record: Order) => (
        <Space>
          {/* <PDFDownloadLink
            document={
              <QuotationPDF 
                order={record}
                exchangeRate={25}
              />
            }
            fileName={`quotation_${record.orderId}.pdf`}
          >
            <span>Báo giá</span>
          </PDFDownloadLink> */}
          <Button 
            size="small" 
            type="primary"
            onClick={() => {
              Modal.confirm({
                title: 'Thanh toán',
                content: `Xác nhận thanh toán đơn hàng ${record.orderId}?`,
                onOk: () => {
                  console.log('Thanh toán đơn:', record);
                },
              });
            }}
          >
            Thanh toán
          </Button>
        </Space>
      ),
    },
];
  