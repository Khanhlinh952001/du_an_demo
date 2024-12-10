export interface Sender {
    manageId: string;          // ID Admin quản lý khách hàng
    handlerId?: string;       // ID người phụ trách khách hàng
    joinDate: string | number | Date; // Ngày tham gia
    senderId: string;       // Mã khách hàng
    name: string;             // Tên khách hàng
    phone: string;            // Số điện thoại
    facebook: string;         // Tài khoản Facebook
    zalo: string;             // Tài khoản Zalo
    kakaoTalk: string;        // Tài khoản KakaoTalk
    address: string;          // Địa chỉ
    contactChannels: string[];   // Kênh liên hệ (Facebook, Zalo, KakaoTalk, v.v.)
    orderCount?: number;      // Số đơn hàng đã đặt (tùy chọn)
    sgnPrice?: number;        // Đơn giá từ SGN (Sài Gòn)
    hanPrice?: number;        // Đơn giá từ HAN (Hà Nội)
    seaPrice?: number;        // Đơn giá từ SEA 
    vnToKrPrice?: number;     // Đơn giá bay Việt-Hàn
    priceInKRW?: number;      // Đơn giá từ KRW (Hàn Quốc)
    priceInVND?: number;      // Đơn giá từ VND (Việt Nam)
    exchangeRate?: number;    // Tỷ giá
    serviceFee?: string;      // Công mua
    rating?: string;          // Xếp loại
    notes?: string;           // Ghi chú
    registerDate: string;     // Ngày đăng ký
}
  