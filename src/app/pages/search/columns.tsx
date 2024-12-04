import { ColumnsType } from "antd/es/table";
import { Order } from "@/types/Order";
import { Tag } from "antd";
import type { ExtendedColumnType } from "../sender/columns";
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
    width: 120,
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
    width: 120,
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
    width: 120,
  },
  {
    title: 'Trạng Thái Thanh Toán',
    dataIndex: 'paymentStatus',
    key: 'paymentStatus',
    width: 120,
    render: (paymentStatus: boolean) => {
      return (
        <Tag color={paymentStatus ? "success" : "error"}>
          {paymentStatus ? "Đã thanh toán" : "Chưa thanh toán"}
        </Tag>
      );
    },
  },
  {
    title: <><FileTextOutlined /> Ghi Chú</>,
    dataIndex: 'note',
    key: 'note',
    width: 120,
  },
]
