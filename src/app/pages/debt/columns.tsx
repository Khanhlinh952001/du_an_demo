import { ColumnsType } from 'antd/es/table';
import { Order } from '@/types/Order';
import { ExtendedColumnType } from '../recipients/columns';
import { formatDate } from '@/utils/format';
import { CalendarOutlined, IdcardOutlined, PhoneOutlined, HomeOutlined, UserOutlined, EnvironmentOutlined, InboxOutlined, DollarOutlined, FileTextOutlined } from '@ant-design/icons';
import { Tag, Tooltip, Button, Space, Modal } from 'antd';
import { PAYMENT_STATUS, PaymentStatusType } from '@/constants';
import { PDFDownloadLink } from '@react-pdf/renderer';
import QuotationPDF from '@/components/QuotationPDF';
export const columns: ExtendedColumnType<Order>[] = [
    {
      title: <><CalendarOutlined /> Ngày Xuất</>,
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: Date) => formatDate(date),
      width: 120,
      fixed: 'left',
    },
    {
      title: <><IdcardOutlined /> Mã Đơn</>,
      dataIndex: 'orderId',
      key: 'orderId',
      width: 120,
      fixed: 'left',
    },
    {
      title: <><UserOutlined /> Khách Hàng</>,
      dataIndex: 'senderName',
      key: 'senderName',
      width: 200,
      render: (_, record) => (
        <Tooltip title={
          <div>
            <p><strong>SĐT:</strong> {record.senderPhone}</p>
            <p><strong>Địa chỉ:</strong> {record.senderAddress}</p>
          </div>
        }>
          <div>{record.senderName}</div>
        </Tooltip>
      ),
    },
    {
      title: <><DollarOutlined /> Thành Tiền</>,
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: 150,
      render: (amount: number) => (
        <span className="font-medium text-green-600">
          {amount?.toLocaleString('vi-VN')} VNĐ
        </span>
      ),
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      width: 120,
      render: (status: PaymentStatusType) => {
        const statusConfig = {
          [PAYMENT_STATUS.PAID]: { color: 'success', text: 'Đã TT' },
          [PAYMENT_STATUS.PARTIAL]: { color: 'warning', text: 'Một phần' },
          [PAYMENT_STATUS.UNPAID]: { color: 'error', text: 'Chưa TT' },
        };
        return <Tag color={statusConfig[status].color}>{statusConfig[status].text}</Tag>;
      },
    },
    {
      title: 'Thao Tác',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (_, record: Order) => (
        <Space>
          <PDFDownloadLink
            document={
              <QuotationPDF 
                order={record}
                exchangeRate={25}
              />
            }
            fileName={`quotation_${record.orderId}.pdf`}
          >
            <span>Báo giá</span>
          </PDFDownloadLink>
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
  