export interface Company {
    companyId: string;        // Mã công ty
    companyName: string;             // Tên công ty
    bizLicenseNumber: string; // Số giấy phép kinh doanh
    code?: string;         // Mã số thuế
    address: string;          // Địa chỉ công ty
    phone: string;            // Số điện thoại công ty
    email: string;            // Email công ty
    password:string;
    website?: string;         // Website công ty (optional)
    logo?: string;            // URL logo công ty
    
    // Representative information
    representativeName: string; // Tên người đại diện
    phoneKorea: number[]; // SĐT người đại diện
    phoneVnHan: number[];
    phoneVnSgn: number[];
    warehouseKrAddress:string;
    warehouseVnHanAddress:string;
    warehouseVnSgnAddress:string;
    bank : BankAccount[];
    
    // System information
    bizLicenseFile?: string;   // URL của file giấy phép kinh doanh
    note?: string;             // Ghi chú
    createdAt: Date;           // Ngày tạo
    updatedAt: Date;           // Ngày cập nhật
    
    // Additional fields
  
}


interface BankAccount {
    bankName: string;
    accountName : string;
    accountNumber: string;
    accountHolder: string;
    branch?: string;
    swift?: string;
} 
