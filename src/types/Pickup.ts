export interface PickupInfo {
    pickupId: string; // Mã nhận hàng
    senderId?: string; // Mã người gửi
    senderName?: string;       // Tên người gửi
    senderPhone?: string;      // SĐT người gửi
    senderAddress?: string;    // Địa chỉ người gửi
    senderContactChannels?: string[];
   
    handlerId: string; // Mã người xử lý
    packageCount: number; // Số lượng gói hàng
    pickupAddress: string; // Địa chỉ nhận hàng
    pickupPhone: string; // Số điện thoại nhận hàng
    pickupDate: Date | string; // Ngày nhận hàng
    preferredTimeSlot?: string;  // Khung giờ ưu tiên lấy hàng
    status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
    statusHistory?: {
        status: string;
        timestamp: Date |string;
        note?: string;
        updatedBy: string;
    }[];
    alternativeContact?: {
        name: string;
        phone: string;
        relationship: string;
    };
    location?: {
        latitude: number;
        longitude: number;
        landmark?: string;
    };
    images: string[];  // URLs của hình ảnh
    documents?: string[]; // URLs của các tài liệu liên quan
    specialInstructions?: string;
    internalNotes?: string;
    scheduledTime?: Date;
    estimatedDuration?: number; // Thời gian dự kiến (phút)
    pickupFee?: number;
    paymentMethod?: string;
    createdAt: Date | string; // Ngày tạo
    updatedAt: Date | string; // Ngày cập nhật
    createdBy: string;
    updatedBy: string;
    cancellationReason?: string;
    cancelledAt?: Date |string;
    cancelledBy?: string;
    isAddedToTodayList?: boolean;
    addedToListAt?: Date | string;
}
