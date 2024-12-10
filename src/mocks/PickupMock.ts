import { PickupInfo } from "@/types/Pickup";
import { formatDate } from "@/utils/format";
export const mockPickups: PickupInfo[] = [
    {
        pickupId: "PU004",
        senderId: "KH004",
        senderName: "Phạm Thị D",
        senderPhone: "0934567890",
        senderAddress: "147 Nguyễn Du, Q1, TP.HCM",
        senderContactChannels: ["Zalo"],
        handlerId: "HDL001",
        packageCount: 2,
        pickupAddress: "258 Lý Tự Trọng, Q1, TP.HCM",
        pickupPhone: "0934567890",
        pickupDate: formatDate(new Date()),
        preferredTimeSlot: "13:00-16:00",
        status: "pending",
        statusHistory: [
            {
                status: "pending",
                timestamp: formatDate(new Date()),
                note: "Đã tạo yêu cầu pickup",
                updatedBy: "ADMIN001"
            }
        ],
        location: {
            latitude: 10.7731,
            longitude: 106.7012,
            landmark: "Gần chợ Bến Thành"
        },
        images: [],
        documents: [],
        specialInstructions: "Gọi trước 30 phút",
        estimatedDuration: 45,
        pickupFee: 60000,
        paymentMethod: "cash",
        createdAt: formatDate(new Date()),
        updatedAt: formatDate(new Date()),
        createdBy: "ADMIN001",
        updatedBy: "ADMIN001",
        isAddedToTodayList: true,
        addedToListAt: formatDate(new Date())
    },
    {
        pickupId: "PU001",
        senderId: "KH001",
        senderName: "Nguyễn Văn A",
        senderPhone: "0901234567",
        senderAddress: "123 Nguyễn Huệ, Q1, TP.HCM",
        senderContactChannels: ["Facebook", "Zalo"],
        handlerId: "HDL001",
        packageCount: 3,
        pickupAddress: "456 Lê Lợi, Q1, TP.HCM",
        pickupPhone: "0901234567",
        pickupDate: new Date("2024-03-20"),
        preferredTimeSlot: "9:00-12:00",
        status: "pending",
        statusHistory: [
            {
                status: "pending",
                timestamp: new Date("2024-03-19T08:00:00Z"),
                note: "Đã tạo yêu cầu pickup",
                updatedBy: "ADMIN001"
            }
        ],
        alternativeContact: {
            name: "Nguyễn Văn B",
            phone: "0907654321",
            relationship: "Em trai"
        },
        location: {
            latitude: 10.7769,
            longitude: 106.7009,
            landmark: "Gần ngã tư Phú Nhuận"
        },
        images: [],
        documents: [],
        specialInstructions: "Gọi trước khi đến",
        internalNotes: "Khách hàng VIP",
        scheduledTime: new Date("2024-03-20T09:00:00Z"),
        estimatedDuration: 30,
        pickupFee: 50000,
        paymentMethod: "cash",
        createdAt: new Date("2024-03-19T08:00:00Z"),
        updatedAt: new Date("2024-03-19T08:00:00Z"),
        createdBy: "ADMIN001",
        updatedBy: "ADMIN001",
        isAddedToTodayList: true,
        addedToListAt: new Date("2024-03-19T08:00:00Z")
    },
    {
        pickupId: "PU002",
        senderId: "KH002",
        senderName: "Trần Thị B",
        senderPhone: "0912345678",
        senderAddress: "789 Điện Biên Phủ, Q3, TP.HCM",
        senderContactChannels: ["Zalo", "KakaoTalk"],
        handlerId: "HDL002",
        packageCount: 2,
        pickupAddress: "147 Võ Văn Tần, Q3, TP.HCM",
        pickupPhone: "0912345678",
        pickupDate: new Date("2024-03-21"),
        preferredTimeSlot: "14:00-17:00",
        status: "confirmed",
        statusHistory: [
            {
                status: "pending",
                timestamp: new Date("2024-03-19T09:00:00Z"),
                note: "Đã tạo yêu cầu pickup",
                updatedBy: "ADMIN001"
            },
            {
                status: "confirmed",
                timestamp: new Date("2024-03-19T10:00:00Z"),
                note: "Đã xác nhận lịch pickup",
                updatedBy: "HDL002"
            }
        ],
        location: {
            latitude: 10.7798,
            longitude: 106.6892,
            landmark: "Đối diện trường ĐH Khoa học Tự nhiên"
        },
        images: [],
        specialInstructions: "Hàng dễ vỡ, cần đóng gói cẩn thận",
        estimatedDuration: 45,
        pickupFee: 70000,
        paymentMethod: "transfer",
        createdAt: new Date("2024-03-19T09:00:00Z"),
        updatedAt: new Date("2024-03-19T10:00:00Z"),
        createdBy: "ADMIN001",
        updatedBy: "HDL002",
        isAddedToTodayList: true,
        addedToListAt: new Date("2024-03-19T09:00:00Z")
    },
    {
        pickupId: "PU003",
        senderId: "KH003",
        senderName: "Lê Văn C",
        senderPhone: "0923456789",
        senderAddress: "258 Nguyễn Thị Minh Khai, Q1, TP.HCM",
        senderContactChannels: ["Facebook"],
        handlerId: "HDL003",
        packageCount: 1,
        pickupAddress: "369 Hai Bà Trưng, Q1, TP.HCM",
        pickupPhone: "0923456789",
        pickupDate: new Date("2024-03-21"),
        status: "cancelled",
        statusHistory: [
            {
                status: "pending",
                timestamp: new Date("2024-03-19T11:00:00Z"),
                note: "Đã tạo yêu cầu pickup",
                updatedBy: "ADMIN001"
            },
            {
                status: "cancelled",
                timestamp: new Date("2024-03-19T12:00:00Z"),
                note: "Khách hàng hủy đơn",
                updatedBy: "ADMIN001"
            }
        ],
        images: [],
        createdAt: new Date("2024-03-19T11:00:00Z"),
        updatedAt: new Date("2024-03-19T12:00:00Z"),
        createdBy: "ADMIN001",
        updatedBy: "ADMIN001",
        cancellationReason: "Khách đổi lịch pickup",
        cancelledAt: new Date("2024-03-19T12:00:00Z"),
        cancelledBy: "KH003",
        isAddedToTodayList: true,

    }
];

// Export một pickup mẫu để sử dụng cho form tạo mới
export const defaultPickup: Partial<PickupInfo> = {
    status: "pending",
    packageCount: 1,
    estimatedDuration: 30,
    paymentMethod: "cash",
    isAddedToTodayList: false
};

