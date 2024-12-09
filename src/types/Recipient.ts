export interface Recipient {
  manageId: string;          // ID Admin quản lý khách hàng
  handlerId?: string;       // ID người phụ trách khách hàng
  recipientId: string;     // Mã người nhận (unique identifier)
  senderId: string;      // Mã khách hàng liên quan tới người nhận này
  name: string;            // Tên người nhận
  phone: string;           // Số điện thoại
  address: string;         // Địa chỉ người nhận
  region: string;          // Khu vực người nhận
  shipper: string;         // Đơn vị vận chuyển (ví dụ: VNPost, DHL, FedEx, v.v.)
  note?: string;           // Ghi chú (optional)
  isConfirmed?: boolean;   // (Optional) Trạng thái xác nhận của người nhận
  createdAt: Date;         // Ngày tạo thông tin người nhận
  updatedAt: Date;         // Ngày cập nhật thông tin người nhận
}
