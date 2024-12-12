import { RoleType } from "@/constants";

export interface User {
    uid: string;
    employeeId?: string;
    companyId?: string;
    email: string;
    password: string;
    displayName: string;
    photoURL?: string;
    isAdmin?: boolean;
    avatar?:string;
    role:RoleType;
    phone?: string;
    department?: string;         // Bộ phận mà nhân viên làm việc (ví dụ: "Vận chuyển", "Kế toán", v.v.)
    isActive?: boolean;          // Trạng thái hoạt động của nhân viên (đang làm việc hay đã nghỉ)
    hireDate?: string | Date;    // Ngày bắt đầu làm việc
    lastLogin?: Date;           // Lần đăng nhập gần nhất của nhân viên
    createdAt: Date | string;            // Ngày tạo thông tin nhân viên
    updatedAt: Date | string;            // Ngày cập nhật thông tin nhân viên
    createdBy?: string;
}
  
  
  export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
  } 
  