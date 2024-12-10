import { ITEM_TYPES, ORDER_STATUS, PAYMENT_STATUS } from "@/constants";

export interface Order {
    // IDs and References
    orderId: string;          // Mã đơn hàng
    manageId: string;         // ID Admin quản lý
    handlerId?: string;       // ID người phụ trách
    
    // Sender Information
    senderId: string;         // Mã người gửi
  
    // Receiver Information
    recipientId: string;       // Mã người nhận
  
    serviceType: 'air' | 'sea'; // Loại dịch vụ
    shippingType: 'import' | 'export'; // Hình thức vận chuyển
    price:number,
    // Package Information
    itemType: ItemType;       // Loại hàng hóa
    weight: number;           // Khối lượng (kg)
    totalPackages: number;    // Số kiện hàng
    trackingNumber: string;   // Mã tracking
    
    // Dates
    shipmentDate?: Date | string;       // Ngày gửi
    deliveryDate?: Date |string;       // Ngày nhận dự kiến
    createdAt: Date | string; 
    updatedAt: Date | string;
    
    // Status and Payment
    status: OrderStatus;      // Trạng thái đơn hàng
    paymentStatus: PaymentStatus; // Trạng thái thanh toán
    totalAmount: number;      // Tổng tiền
    note?: string;            // Ghi chú
    paidAmount?: number;
    remainingAmount?: number;
    
    // Additional suggested fields
    orderCode?: string;        // Mã đơn hàng bổ sung (có thể dùng cho mã vận đơn quốc tế)
    items?: OrderItem[];       // Chi tiết các mặt hàng trong đơn
    history?: OrderHistory[];  // Lịch sử thay đổi trạng thái
    attachments?: string[];    // Danh sách file đính kèm
    customsDeclaration?: string; // Số tờ khai hải quan
    insurance?: boolean;       // Có bảo hiểm không
    priority?: 'low' | 'medium' | 'high'; // Độ ưu tiên của đơn hàng
}


interface OrderItem {
    itemId: string;
    name: string;
    quantity: number;
    unitPrice: number;
    description?: string;
}

interface OrderHistory {
    timestamp: Date;
    status: OrderStatus;
    note?: string;
    updatedBy: string;
}


export type ItemType = typeof ITEM_TYPES[keyof typeof ITEM_TYPES];
export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];
export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];
