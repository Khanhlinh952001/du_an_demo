export interface Payment {
    paymentId: string;    // Mã thanh toán
    orderId: string;      // Mã đơn hàng
    paymentMethod: string;  // Phương thức thanh toán (tiền mặt, thẻ tín dụng, v.v.)
    amount: number;       // Số tiền thanh toán
    status: string;       // Trạng thái thanh toán (thành công, thất bại)
    paidAt: Date;         // Thời gian thanh toán
    createdAt: Date;      // Ngày tạo thanh toán
    updatedAt: Date;      // Ngày cập nhật thanh toán
  }
  