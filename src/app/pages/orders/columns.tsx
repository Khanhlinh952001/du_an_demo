import { ColumnsType } from "antd/es/table";
import { Order } from "@/types/Order";
import { Tag, Tooltip } from "antd";
import type { ExtendedColumnType } from "../recipients/columns";
import { CalendarOutlined, IdcardOutlined, PhoneOutlined, HomeOutlined, UserOutlined, EnvironmentOutlined, InboxOutlined, DollarOutlined, FileTextOutlined } from '@ant-design/icons';

export const columns: ExtendedColumnType<Order>[] = [
  {
    title: <><CalendarOutlined /> Ngày Xuất</>,
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 120,
  },
  {
    title: <><IdcardOutlined /> Mã Đơn Hàng</>,
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
    title: <><PhoneOutlined /> SĐT Người Gửi</>,
    dataIndex: 'senderPhone',
    key: 'senderPhone',
    width: 120,
  },
  {
    title: <><HomeOutlined /> Địa Chỉ Người Gửi</>,
    dataIndex: 'senderAddress',
    key: 'senderAddress',
    width: 120,
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
    title: <><PhoneOutlined /> SĐT Người Nhận</>,
    dataIndex: 'receiverPhone',
    key: 'receiverPhone',
    width: 120,
  },
  {
    title: <><EnvironmentOutlined /> Khu Vực</>,
    dataIndex: 'receiverRegion',
    key: 'receiverRegion',
    width: 120,
    render: (_, record) => (
      <div className="text-gray-500 text-sm">
        <Tag color="blue">{record.receiverRegion}</Tag>
      </div>
    )
  },
  {
    title: <><HomeOutlined /> Địa Chỉ Người Nhận</>,
    dataIndex: 'receiverAddress',
    key: 'receiverAddress',
    width: 120,
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
    render: (paymentStatus: boolean) => (
      <Tag color={paymentStatus ? "success" : "error"}>
        {paymentStatus ? "Đã thanh toán" : "Chưa thanh toán"}
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
]
