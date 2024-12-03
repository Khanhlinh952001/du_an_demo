import { Sender } from "@/types/Sender";

export const senderMockData : Sender[] = [
  {
    manageId: "ADMIN001",
    handlerId: "HANDLER001",
    joinDate: "2024-03-15",
    senderId: "KH001",
    name: "Nguyễn Văn A",
    phone: "0901234567",
    facebook: "https://facebook.com/nguyenvana",
    zalo: "https://zalo.me/0901234567",
    kakaoTalk: "kakao://user/nguyenvana",
    address: "123 Nguyễn Huệ, Q1, TP.HCM",
    contactChannel: "Facebook",
    orderCount: 15,
    unitPrice: 8000,
    registerDate: "2024-01-01"
  },
  {
    manageId: "ADMIN002",
    handlerId: "HANDLER002",
    joinDate: "2024-03-10",
    senderId: "KH002",
    name: "Trần Thị B",
    phone: "0909876543",
    facebook: "",
    zalo: "https://zalo.me/0909876543",
    kakaoTalk: "",
    address: "456 Lê Lợi, Q5, TP.HCM",
    contactChannel: "Zalo",
    orderCount: 8,
    unitPrice: 8000,
    registerDate: "2024-02-15"
  },
  {
    manageId: "ADMIN001",
    handlerId: "HANDLER003",
    joinDate: "2024-02-20",
    senderId: "KH003",
    name: "Park Min Young",
    phone: "0905555666",
    facebook: "https://facebook.com/parkminyoung",
    zalo: "",
    kakaoTalk: "kakao://user/parkminyoung",
    address: "789 Hai Bà Trưng, Q3, TP.HCM",
    contactChannel: "KakaoTalk",
    orderCount: 25,
    unitPrice: 8000,
    registerDate: "2024-01-20"
  }
]; 