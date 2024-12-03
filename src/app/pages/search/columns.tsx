import { ColumnsType } from "antd/es/table";
import { Order } from "@/types/Order";
import { Tag } from "antd";
import type { ExtendedColumnType } from "../sender/columns";
export const columns: ExtendedColumnType<Order>[] = [
  {
    title: 'Ngày Xuất',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 120,
  },
  {
    title: 'Mã Đơn Hàng',
    dataIndex: 'orderId',
    key: 'orderId',
    width: 120,
  },
  {
    title: 'Người Gửi',
    dataIndex: 'senderName',
    key: 'senderName',
    width: 120,
  },
  {
    title: 'SĐT Người Gửi',
    dataIndex: 'senderPhone',
    key: 'senderPhone',
    width: 120,
  },
  {
    title: 'Địa Chỉ Người Gửi',
    dataIndex: 'senderAddress',
    key: 'senderAddress',
    width: 120,
  },
  {
    title: 'Người Nhận',
    dataIndex: 'receiverName',
    key: 'receiverName',
    width: 120,
  },
  {
    title: 'SĐT Người Nhận',
    dataIndex: 'receiverPhone',
    key: 'receiverPhone',
    width: 120,
  },
  {
    title: 'Khu Vực',
    dataIndex: 'receiverRegion',
    key: 'receiverRegion',
    width: 120,
  },
  {
    title: 'Địa Chỉ Người Nhận',
    dataIndex: 'receiverAddress',
    key: 'receiverAddress',
    width: 120,
  },
  {
    title: 'Số Kiện',
    dataIndex: 'totalPackages',
    key: 'totalPackages',
    width: 120,
  },
  {
    title: 'Trọng Lượng',
    dataIndex: 'weight',
    key: 'weight',
    width: 120,
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
    width: 120,
  },
  {
    title: 'Thành Tiền',
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
    title: 'Ghi Chú',
    dataIndex: 'note',
    key: 'note',
    width: 120,
  },
]
