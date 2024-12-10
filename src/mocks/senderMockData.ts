import { Sender } from "@/types/Sender";

export const senderMockData: Sender[] = [
  {
    manageId: "ADMIN001",
    handlerId: "HDL001",
    joinDate: "2024-03-15",
    senderId: "SND001",
    name: "Nguyễn Văn A",
    phone: "0901234567",
    facebook: "fb.com/nguyenvana",
    zalo: "0901234567",
    kakaoTalk: "kakao://user/nguyenvana",
    address: "123 Nguyễn Huệ, Q1, TP.HCM",
    contactChannels: ["Facebook"],
    orderCount: 15,
    sgnPrice: 8900,
    hanPrice: 8000,
    seaPrice: 3800,
    vnToKrPrice: 6000,
    priceInKRW: 90000,
    priceInVND: 2700000,
    exchangeRate: 30,
    serviceFee: "3",
    rating: "VIP",
    notes: "Khách hàng thân thiết, cần chăm sóc đặc biệt",
    registerDate: "2024-01-01"
  },
  {
    manageId: "ADMIN002",
    handlerId: "HDL002",
    joinDate: "2024-03-10",
    senderId: "VHMVC0002",
    name: "Trần Thị B",
    phone: "0909876543",
    facebook: "",
    zalo: "0909876543",
    kakaoTalk: "",
    address: "456 Lê Lợi, Q5, TP.HCM",
    contactChannels: ["Zalo"],
    orderCount: 8,
    sgnPrice: 8900,
    hanPrice: 8000,
    seaPrice: 3800,
    vnToKrPrice: 6000,
    priceInKRW: 85000,
    priceInVND: 2550000,
    exchangeRate: 30,
    serviceFee: "3",
    rating: "Thường",
    notes: "Khách hàng mới",
    registerDate: "2024-02-15"
  },
  {
    manageId: "ADMIN001",
    handlerId: "HDL003",
    joinDate: "2024-02-20",
    senderId: "VHMVC0003",
    name: "Park Min Young",
    phone: "0905555666",
    facebook: "fb.com/parkminyoung",
    zalo: "",
    kakaoTalk: "kakao://user/parkminyoung",
    address: "789 Hai Bà Trưng, Q3, TP.HCM",
    contactChannels: ["Facebook", "KakaoTalk"],
    orderCount: 25,
    sgnPrice: 8900,
    hanPrice: 8000,
    seaPrice: 3800,
    vnToKrPrice: 6000,
    priceInKRW: 95000,
    priceInVND: 2850000,
    exchangeRate: 30,
    serviceFee: "3",
    rating: "VIP",
    notes: "Khách hàng VIP, ưu tiên xử lý đơn hàng",
    registerDate: "2024-01-20"
  },
  {
    manageId: "ADMIN002",
    handlerId: "HDL004",
    joinDate: "2024-03-01",
    senderId: "VHMVC0004",
    name: "Kim Ji Soo",
    phone: "0903333444",
    facebook: "fb.com/kimjisoo",
    zalo: "0903333444",
    kakaoTalk: "kakao://user/kimjisoo",
    address: "321 Nguyễn Đình Chiểu, Q1, TP.HCM",
    contactChannels: ["Facebook", "Zalo", "KakaoTalk"],
    orderCount: 12,
    sgnPrice: 8900,
    hanPrice: 8000,
    seaPrice: 3800,
    vnToKrPrice: 6000,
    priceInKRW: 88000,
    priceInVND: 2640000,
    exchangeRate: 30,
    serviceFee: "3",
    rating: "Tiềm năng",
    notes: "Khách hàng tiềm năng, cần tư vấn thêm",
    registerDate: "2024-02-01"
  }
];

// Helper function to get sender info by ID
export const getSenderInfo = (senderId: string): Sender | undefined => {
  return senderMockData.find(sender => sender.senderId === senderId);
};

// Helper function to get senders by manager ID
export const getSendersByManagerId = (manageId: string): Sender[] => {
  return senderMockData.filter(sender => sender.manageId === manageId);
};

// Helper function to get senders by handler ID
export const getSendersByHandlerId = (handlerId: string): Sender[] => {
  return senderMockData.filter(sender => sender.handlerId === handlerId);
};
