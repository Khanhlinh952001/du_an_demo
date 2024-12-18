export interface CompanyInfo {
    companyId: string;        // Mã công ty
    companyName: string;             // Tên công ty
    companyCode?: string;         // Mã số thuế
    bizLicenseNumber: string; // Số giấy phép kinh doanh
    companyAddress: string;          // Địa chỉ công ty
    companyPhone: string;            // Số điện thoại công ty
    companyEmail: string;            // Email công ty
    website?: string;         // Website công ty (optional)
    logo?: string;            // URL logo công ty
    representativeName: string; // Tên người đại diện
    phoneKorea?: number[]; // SĐT người đại diện
    phoneVnHan?: number[];
    phoneVnSgn?: number[];
    warehouseKrAddress?:string;
    warehouseVnHanAddress?:string;
    warehouseVnSgnAddress?:string;
    bank?: BankAccount[];
    bizLicenseFile?: string;   // URL của file giấy phép kinh doanh
    sgnPrice?: number;        // Đơn giá từ SGN (Sài Gòn)
    hanPrice?: number;        // Đơn giá từ HAN (Hà Nội)
    seaPrice?: number;        // Đơn giá từ SEA 
    vnToKrPriceInKRW?: number;      // Đơn giá từ KRW (Hàn Quốc)
    vnToKrPriceInVND?: number;      // Đơn giá từ VND (Việt Nam)
    exchangeRate?: number;    // Tỷ giá
    serviceFee?: string;      // Công mua
    note?: string;             // Ghi chú
    createdAt: Date |string;           // Ngày tạo
    updatedAt: Date |string;           // Ngày cập nhật
}


interface BankAccount {
    bankName: string;
    accountName : string;
    accountNumber: string;
    accountHolder: string;
    branch?: string;
    swift?: string;
} 

export interface  CompanySettings{
    companyId: string;
    settings: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
