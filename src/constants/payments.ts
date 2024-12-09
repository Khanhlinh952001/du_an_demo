export const PAYMENT_STATUS = {
    PAID: 'PAID',         // Đã thanh toán
    PARTIAL: 'PARTIAL',   // Thanh toán một phần
    UNPAID: 'UNPAID'      // Chưa thanh toán
} as const;

export type PaymentStatusType = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];

export interface PaymentInfo {
    status: PaymentStatusType;
    totalAmount: number;
    paidAmount: number;
    remainingAmount: number;
}
