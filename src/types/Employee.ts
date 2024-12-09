import { RoleType } from "@/constants";
export interface Employee {
    employeeId: string;         // Mã nhân viên (unique identifier)
    manageId: string;           // ID của Admin quản lý nhân viên này
    name: string;               // Tên nhân viên
    email: string;              // Email nhân viên (dùng để đăng nhập)
    password: string;           // Mật khẩu nhân viên (lưu trữ dưới dạng hash)
    phone: string;              // Số điện thoại nhân viên
    role: RoleType;               // Vai trò của nhân viên (ví dụ: "checker", "accountant", "manager", v.v.)
    department: string;         // Bộ phận mà nhân viên làm việc (ví dụ: "Vận chuyển", "Kế toán", v.v.)
    isActive: boolean;          // Trạng thái hoạt động của nhân viên (đang làm việc hay đã nghỉ)
    hireDate: string | Date;    // Ngày bắt đầu làm việc
    assignOrders: string[];     // Mảng các mã đơn hàng mà nhân viên này đang phụ trách
    lastLogin?: Date;           // Lần đăng nhập gần nhất của nhân viên
    createdAt: Date;            // Ngày tạo thông tin nhân viên
    updatedAt: Date;            // Ngày cập nhật thông tin nhân viên
}
