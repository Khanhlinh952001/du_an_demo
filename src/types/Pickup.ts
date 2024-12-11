export interface PickupInfo {
    // Định danh duy nhất của yêu cầu lấy hàng
    pickupId: string;
    
    // Định danh của người gửi hàng (không bắt buộc)
    senderId: string;
    
    // Định danh của nhân viên xử lý yêu cầu lấy hàng
    handlerId: string;
    
    // Số lượng gói hàng cần lấy
    packageCount: number;
    
    // Địa chỉ nơi lấy hàng
    pickupAddress: string;
    
    // Số điện thoại liên hệ tại điểm lấy hàng
    pickupPhone: string;
    
    // Ngày dự kiến lấy hàng
    pickupDate: Date | string;
    
    // Khoảng thời gian ưu tiên để lấy hàng (không bắt buộc)
    preferredTimeSlot?: string;
    
    // Trạng thái của yêu cầu lấy hàng
    status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
    
    // Lịch sử các thay đổi trạng thái
    statusHistory?: {
        status: string;        // Trạng thái
        timestamp: Date |string;  // Thời điểm thay đổi
        note?: string;         // Ghi chú (nếu có)
        updatedBy: string;     // Người thực hiện thay đổi
    }[];
    
    // Thông tin liên hệ thay thế
    alternativeContact?: {
        name: string;          // Tên người liên hệ
        phone: string;         // Số điện thoại
        relationship: string;   // Mối quan hệ với người gửi
    };
    
    // Thông tin vị trí địa lý
    location?: {
        latitude: number;      // Vĩ độ
        longitude: number;     // Kinh độ
        landmark?: string;     // Điểm mốc đặc trưng
    };
    
    // Danh sách URL hình ảnh liên quan
    images: string[];
    
    // Danh sách URL tài liệu liên quan (không bắt buộc)
    documents?: string[];
    
    // Hướng dẫn đặc biệt khi lấy hàng
    specialInstructions?: string;
    
    // Ghi chú nội bộ
    internalNotes?: string;
    
    // Thời gian đã lên lịch cụ thể
    scheduledTime?: Date;
    
    // Thời gian dự kiến để hoàn thành việc lấy hàng (tính bằng phút)
    estimatedDuration?: number;
    
    // Phí lấy hàng (nếu có)
    pickupFee?: number;
    
    // Phương thức thanh toán
    paymentMethod?: string;
    
    // Thời điểm tạo yêu cầu
    createdAt: Date | string;
    
    // Thời điểm cập nhật gần nhất
    updatedAt: Date | string;
    
    // Người tạo yêu cầu
    createdBy: string;
    
    // Người cập nhật gần nhất
    updatedBy: string;
    
    // Lý do hủy (nếu có)
    cancellationReason?: string;
    
    // Thời điểm hủy
    cancelledAt?: Date |string;
    
    // Người thực hiện hủy
    cancelledBy?: string;
    
    // Đánh dấu đã được thêm vào danh sách công việc ngày hôm nay
    isAddedToTodayList?: boolean;
    
    // Thời điểm được thêm vào danh sách
    addedToListAt?: Date | string;
}
