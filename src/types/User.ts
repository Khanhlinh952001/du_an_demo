import { RoleType, PermissionType } from "@/constants/constants";

export interface User {
  id: string; // ID người dùng
  name: string; // Tên đầy đủ
  email: string; // Email liên lạc
  phone: string; // Số điện thoại
  role: RoleType; // Vai trò
  permissions: PermissionType[]; // Quyền
  settings: UserSettings; // Cấu hình cá nhân
  createdAt: Date; // Ngày tạo tài khoản
  updatedAt: Date; // Ngày cập nhật tài khoản
  company?: CompanyInfo; // Thông tin công ty (nếu có)
}

export interface UserSettings {
  subscriptionDays: number; // Số ngày đăng ký
  baseRate: number; // Giá cước cơ bản
  airShippingRate: number; // Giá cước đường bay
  seaShippingRate: number; // Giá cước đường biển
  notificationsEnabled: boolean; // Bật thông báo
  customSettings?: Record<string, any>; // Cấu hình tùy chỉnh
  createdAt: Date; // Ngày tạo cài đặt
  updatedAt: Date; // Ngày cập nhật cài đặt
}

export interface CompanyInfo {
  companyCode: string; // Mã công ty
  bizLicenseNumber: string; // Số giấy phép kinh doanh
  address: string; // Địa chỉ công ty
  bizLicenseFile?: File; // Tải lên giấy phép kinh doanh (file)
}

