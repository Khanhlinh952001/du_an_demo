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
    carrier?: string;           // Đơn vị vận chuyển
    containerNumber?: string;  // Số container
    customsClearance?: {      // Thông tin hải quan
        status: string;
        clearanceDate?: Date;
        documents?: string[];
    };
    transitPoints?: {         // Điểm trung chuyển
        location: string;
        arrivalTime: Date;
        departureTime: Date;
    }[];
}
  