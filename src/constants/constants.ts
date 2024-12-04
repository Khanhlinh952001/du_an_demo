// constants.ts

// Các vai trò người dùng trong hệ thống
export const ROLES = {
    ADMIN: "Admin",      // Quản trị viên hệ thống, có quyền tối cao
    MANAGER: "Manager",  // Người quản lý, có quyền quản lý đơn hàng và nhân viên
    WAREHOUSE_VN: "WarehouseVN",  // Nhân viên kho Việt Nam
    WAREHOUSE_KR: "WarehouseKR",  // Nhân viên kho Hàn Quốc
    ACCOUNTANT: "Accountant", // Nhân viên kế toán, không có quyền quản lý đơn hàng nhưng có thể xem báo cáo
} as const;

// Các quyền người dùng có thể có
// constants.ts
export const PERMISSIONS = {
    CREATE_ACCOUNT: "CREATE_ACCOUNT",      // Quyền tạo tài khoản cho nhân viên mới
    MANAGE_ACCOUNT: "MANAGE_ACCOUNT",      // Quyền quản lý tài khoản (chỉnh sửa, xóa)
    UPDATE_ORDER: "UPDATE_ORDER",          // Quyền cập nhật trạng thái đơn hàng
    VIEW_REPORTS: "VIEW_REPORTS",          // Quyền xem các báo cáo (ví dụ báo cáo tài chính, báo cáo đơn hàng)
    DELETE_ACCOUNT: "DELETE_ACCOUNT",      // Quyền xóa tài khoản nhân viên
    ASSIGN_ORDER: "ASSIGN_ORDER",          // Quyền phân công đơn hàng cho nhân viên
    VIEW_ORDER_HISTORY: "VIEW_ORDER_HISTORY", // Quyền xem lịch sử đơn hàng của khách hàng
    MANAGE_INVENTORY: "MANAGE_INVENTORY",  // Quyền quản lý kho hàng (cập nhật số lượng, loại hàng hóa)
    MANAGE_CUSTOMER: "MANAGE_CUSTOMER",    // Quyền quản lý thông tin khách hàng (thêm, chỉnh sửa, xóa)
    APPROVE_PAYMENT: "APPROVE_PAYMENT",    // Quyền phê duyệt thanh toán
    MANAGE_SHIPMENTS: "MANAGE_SHIPMENTS",  // Quyền quản lý vận chuyển (giao nhận, phân phối)
    VIEW_FINANCIAL_REPORTS: "VIEW_FINANCIAL_REPORTS", // Quyền xem báo cáo tài chính
} as const;


// Quyền hạn của từng vai trò
export const ROLE_PERMISSIONS = {
    ADMIN: [PERMISSIONS.CREATE_ACCOUNT, PERMISSIONS.MANAGE_ACCOUNT, PERMISSIONS.VIEW_REPORTS], // Admin có tất cả quyền
    MANAGER: [PERMISSIONS.CREATE_ACCOUNT, PERMISSIONS.UPDATE_ORDER],                          // Manager có thể tạo tài khoản và quản lý đơn hàng
    CHECKER: [PERMISSIONS.UPDATE_ORDER],                                                        // Checker chỉ có quyền cập nhật trạng thái đơn hàng
    ACCOUNTANT: [],                                                                              // Accountant không có quyền nào khác ngoài việc xem báo cáo
} as const;

// Trạng thái của đơn hàng
export const ORDER_STATUS = {
    PENDING: "Pending",      // Đơn hàng đang chờ xử lý
    IN_PROGRESS: "InProgress", // Đơn hàng đang được xử lý
    DELIVERY:'Delivered',
    COMPLETED: "Completed",    // Đơn hàng đã hoàn thành
    CANCELLED: "Cancelled",    // Đơn hàng bị hủy
} as const;

// Các loại hàng hóa
export const ITEM_TYPES = {
    FRAGILE: "Fragile",     // Hàng dễ vỡ
    FOOD: "Food",           // Hàng thực phẩm
    ELECTRONICS: "Electronics", // Hàng điện tử
    DOCUMENTS: "Documents",  // Tài liệu
    OTHER: "Other",          // Các loại hàng hóa khác
} as const;

// Trạng thái thanh toán
export const PAYMENT_STATUS = {
    PAID: true,  // Đã thanh toán
    UNPAID: false, // Chưa thanh toán
} as const;

export const REGION ={
    SGN: "SNG",
    HN : "HN" 
}
// Loại vai trò được sử dụng trong các phần khác của ứng dụng
export type RoleType = typeof ROLES[keyof typeof ROLES];
export type PermissionType = typeof PERMISSIONS[keyof typeof PERMISSIONS];
