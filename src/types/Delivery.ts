export interface Delivery {
    deliveryId: string;  // Mã giao hàng
    orderId: string;     // Mã đơn hàng liên kết
    deliveredBy: string; // Người giao hàng (employeeId)
    deliveredAt: Date;   // Thời gian giao
    status: string;      // Trạng thái giao hàng (đã giao, giao thất bại, v.v.)
    createdAt: Date;     // Ngày tạo giao hàng
    updatedAt: Date;     // Ngày cập nhật giao hàng
  }
  