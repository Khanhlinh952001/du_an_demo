export interface Company {
    companyId: string;        // Mã công ty
    name: string;             // Tên công ty
    bizLicenseNumber: string; // Số giấy phép kinh doanh
    taxCode?: string;         // Mã số thuế
    address: string;          // Địa chỉ công ty
    phone: string;            // Số điện thoại công ty
    email: string;            // Email công ty
    website?: string;         // Website công ty (optional)
    
    // Representative information
    representativeName: string; // Tên người đại diện
    representativePhone: string; // SĐT người đại diện
    representativeEmail: string; // Email người đại diện
    
    // Business information
    businessType: string;      // Loại hình doanh nghiệp
    establishedDate: Date;     // Ngày thành lập
    employeeCount?: number;    // Số lượng nhân viên
    
    // System information
    isActive: boolean;         // Trạng thái hoạt động
    bizLicenseFile?: string;   // URL của file giấy phép kinh doanh
    note?: string;             // Ghi chú
    createdAt: Date;           // Ngày tạo
    updatedAt: Date;           // Ngày cập nhật
    
    // Additional fields
    logo?: string;            // URL logo công ty
    branches?: Branch[];      // Các chi nhánh
    bankAccounts?: BankAccount[]; // Tài khoản ngân hàng
    businessScope?: string[]; // Phạm vi kinh doanh
    certifications?: {        // Chứng nhận
        name: string;
        number: string;
        validUntil: Date;
    }[];
}

interface Branch {
    branchId: string;
    name: string;
    address: string;
    phone: string;
    manager: string;
}

interface BankAccount {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    branch?: string;
    swift?: string;
} 
