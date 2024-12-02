import { ITEM_TYPES, ORDER_STATUS, PAYMENT_STATUS } from "@/constants/constants";

export interface Order {
    // IDs and References
    orderId: string;          // Mã đơn hàng
    manageId: string;         // ID Admin quản lý
    handlerId?: string;       // ID người phụ trách
    
    // Sender Information
    senderId: string;         // Mã người gửi
    senderName: string;       // Tên người gửi
    senderPhone: string;      // SĐT người gửi
    senderAddress: string;    // Địa chỉ người gửi
    
    // Receiver Information
    receiverId: string;       // Mã người nhận
    receiverName: string;     // Tên người nhận
    receiverPhone: string;    // SĐT người nhận
    receiverAddress: string;  // Địa chỉ người nhận
    receiverRegion: string;    // SĐT người nhận
    // Shipping Information
    origin: string;           // Nơi gửi (VN/KR)
    destination: string;      // Nơi nhận (VN/KR)
    serviceType: 'air' | 'sea'; // Loại dịch vụ
    shippingType: 'import' | 'export'; // Hình thức vận chuyển
    price:number,
    // Package Information
    itemType: ItemType;       // Loại hàng hóa
    weight: number;           // Khối lượng (kg)
    totalPackages: number;    // Số kiện hàng
    trackingNumber: string;   // Mã tracking
    
    // Dates
    shipmentDate: Date;       // Ngày gửi
    deliveryDate: Date;       // Ngày nhận dự kiến
    createdAt: Date | string;
    updatedAt: Date;
    
    // Status and Payment
    status: OrderStatus;      // Trạng thái đơn hàng
    paymentStatus: PaymentStatus; // Trạng thái thanh toán
    totalAmount: number;      // Tổng tiền
    note?: string;            // Ghi chú
}

export type ItemType = typeof ITEM_TYPES[keyof typeof ITEM_TYPES];
export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];
export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];
