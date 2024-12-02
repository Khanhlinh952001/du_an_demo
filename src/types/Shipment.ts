export interface Shipment {
    shipmentId: string;   // Mã vận chuyển
    orderId: string;      // Mã đơn hàng liên kết
    route: string;        // Lộ trình vận chuyển (ví dụ: Hà Nội -> TP. Hồ Chí Minh)
    shipmentDate: Date;   // Ngày vận chuyển
    estimatedArrival: Date;  // Ngày dự kiến đến
    status: string;       // Trạng thái vận chuyển (đang vận chuyển, đã giao, v.v.)
    trackingNumber: string;  // Số theo dõi
    createdAt: Date;      // Ngày tạo vận chuyển
    updatedAt: Date;      // Ngày cập nhật vận chuyển
  }
  