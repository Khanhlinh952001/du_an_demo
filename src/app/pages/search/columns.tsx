import { ColumnsType } from "antd/es/table";
import { Order } from "@/types/Order";
import { Tag } from "antd";
import type { ExtendedColumnType } from "../sender/columns";
import { CalendarOutlined, IdcardOutlined, PhoneOutlined, HomeOutlined, UserOutlined, EnvironmentOutlined, InboxOutlined, DollarOutlined, FileTextOutlined } from '@ant-design/icons';
import { formatDate } from "@/utils/format";

export const columns: ExtendedColumnType<Order>[] = [
  {
    title: <><CalendarOutlined /> Ngày Xuất</>,
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 150,
    fixed: 'left',
    render: (date: Date) => formatDate(date)
  },
  {
    title: <><IdcardOutlined /> Mã Đơn Hàng</>,
    dataIndex: 'orderId',
    key: 'orderId',
    width: 150,
    fixed: 'left',
  },
  {
    title: <><UserOutlined /> Người Gửi</>,
    dataIndex: 'senderName',
    key: 'senderName',
    width: 180,
  },
  {
    title: <><PhoneOutlined /> SĐT Người Gửi</>,
    dataIndex: 'senderPhone',
    key: 'senderPhone',
    width: 150,
  },
  {
    title: <><EnvironmentOutlined /> Địa Chỉ Người Gửi</>,
    dataIndex: 'senderAddress',
    key: 'senderAddress',
    width: 250,
    ellipsis: {
      showTitle: true,
    },
  },
  {
    title: <><UserOutlined /> Người Nhận</>,
    dataIndex: 'receiverName',
    key: 'receiverName',
    width: 180,
  },
  {
    title: <><PhoneOutlined /> SĐT Người Nhận</>,
    dataIndex: 'receiverPhone',
    key: 'receiverPhone',
    width: 150,
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
    width: 250,
    ellipsis: {
      showTitle: true,
    },
  },
  {
    title: <><InboxOutlined /> Số Kiện</>,
    dataIndex: 'totalPackages',
    key: 'totalPackages',
    width: 100,
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
  },
  {
    title: 'Trạng Thái Thanh Toán',
    dataIndex: 'paymentStatus',
    key: 'paymentStatus',
    width: 180,
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
    width: 200,
    ellipsis: {
      showTitle: true,
    },
  },
]
