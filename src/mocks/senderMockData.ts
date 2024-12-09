import { Sender } from "@/types/Sender";

export const senderMockData: Sender[] = [
  {
    manageId: "ADMIN001",
    handlerId: "HDL001",
    joinDate: "2024-03-15",
    senderId: "KH001",
    name: "Nguyễn Văn A",
    phone: "0901234567",
    facebook: "https://facebook.com/nguyenvana",
    zalo: "0901234567",
    kakaoTalk: "kakao://user/nguyenvana",
    address: "123 Nguyễn Huệ, Q1, TP.HCM",
    contactChannels: ["Facebook"],
    orderCount: 15,
    unitPrice:6000,
    registerDate: "2024-01-01"
  },
  {
    manageId: "ADMIN002",
    handlerId: "QL002",
    joinDate: "2024-03-10",
    senderId: "KH002",
    name: "Trần Thị B",
    phone: "0909876543",
    facebook: "",
    zalo: "0909876543",
    kakaoTalk: "",
    address: "456 Lê Lợi, Q5, TP.HCM",
    contactChannels: ["Zalo"],
    orderCount: 8,
    unitPrice: 8000,
    registerDate: "2024-02-15"
  },
  {
    manageId: "ADMIN001",
    handlerId: "QL003",
    joinDate: "2024-02-20",
    senderId: "KH003",
    name: "Park Min Young",
    phone: "0905555666",
    facebook: "https://facebook.com/parkminyoung",
    zalo: "",
    kakaoTalk: "kakao://user/parkminyoung",
    address: "789 Hai Bà Trưng, Q3, TP.HCM",
    contactChannels:[ "KakaoTalk"],
    orderCount: 25,
    unitPrice: 1800000,
    registerDate: "2024-01-20"
  }
]; 

export const getSenderInfo = (senderId: string): Sender | undefined => {
  return senderMockData.find(sender => sender.senderId === senderId);
};
