import { PaymentStatus } from "./Order";

export interface Payment {
    paymentId: string;    // Mã thanh toán
    orderId: string;      // Mã đơn hàng
    paymentMethod: string;  // Phương thức thanh toán (tiền mặt, thẻ tín dụng, v.v.)
    amount: number;       // Tổng số tiền cần thanh toán
    paidAmount: number;   // Số tiền đã thanh toán
    remainingAmount: number;  // Số tiền còn lại cần thanh toán
    isPartialPayment: boolean;  // Đánh dấu có phải thanh toán một phần không
    status: PaymentStatus;       // Trạng thái thanh toán (thành công, thất bại)
    paidAt: Date;         // Thời gian thanh toán
    createdAt: Date;      // Ngày tạo thanh toán
    updatedAt: Date;      // Ngày cập nhật thanh toán
    transactionId?: string;    // Mã giao dịch từ cổng thanh toán
    currency: string;          // Loại tiền tệ
    paymentProof?: string;     // URL chứng từ thanh toán
    refundStatus?: 'none' | 'pending' | 'completed';
    refundAmount?: number;
    paymentNote?: string;
    partialPaymentHistory?: PartialPayment[];  // Lịch sử các lần thanh toán một phần
}

interface PartialPayment {
    amount: number;           // Số tiền thanh toán trong lần này
    paidAt: Date;            // Thời gian thanh toán
    transactionId?: string;  // Mã giao dịch
    paymentMethod: string;   // Phương thức thanh toán
    paymentProof?: string;   // Chứng từ thanh toán
    note?: string;           // Ghi chú
}
  