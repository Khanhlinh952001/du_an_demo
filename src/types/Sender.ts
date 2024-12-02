export interface Sender {
    manageId: string;          // ID Admin quản lý khách hàng
    handlerId?: string;       // ID người phụ trách khách hàng
    joinDate: string | number | Date; // Ngày tham gia
    senderId: string;       // Mã khách hàng
    name: string;             // Tên khách hàng
    email: string;            // Email
    phone: string;            // Số điện thoại
    facebook: string;         // Tài khoản Facebook
    zalo: string;             // Tài khoản Zalo
    kakaoTalk: string;        // Tài khoản KakaoTalk
    address: string;          // Địa chỉ
    contactChannel: string;   // Kênh liên hệ (Facebook, Zalo, KakaoTalk, v.v.)
    orderCount?: number;      // Số đơn hàng đã đặt (tùy chọn)
    registerDate: string;     // Ngày đăng ký
  }
  