import { Company } from "@/types/Company";

export const CompanyMockData: Company[] = [
  {
    companyId: "COMP001",
    name: "Công ty TNHH Thương mại ABC",
    bizLicenseNumber: "0123456789",
    taxCode: "0123456789",
    address: "123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
    phone: "028.1234.5678",
    email: "contact@abc-trading.com",
    website: "https://abc-trading.com",
    
    representativeName: "Nguyễn Văn A",
    representativePhone: "0901234567",
    representativeEmail: "nguyenvana@abc-trading.com",
    
    businessType: "Công ty TNHH",
    establishedDate: new Date("2020-01-15"),
    employeeCount: 50,
    
    isActive: true,
    bizLicenseFile: "/uploads/licenses/COMP001_license.pdf",
    note: "Khách hàng VIP",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-03-20")
  },
  {
    companyId: "COMP002",
    name: "Công ty Cổ phần XYZ Logistics",
    bizLicenseNumber: "0987654321",
    taxCode: "0987654321",
    address: "456 Lê Lợi, Quận 5, TP. Hồ Chí Minh",
    phone: "028.9876.5432",
    email: "info@xyz-logistics.com",
    website: "https://xyz-logistics.com",
    
    representativeName: "Trần Thị B",
    representativePhone: "0909876543",
    representativeEmail: "tranthib@xyz-logistics.com",
    
    businessType: "Công ty Cổ phần",
    establishedDate: new Date("2019-06-20"),
    employeeCount: 120,
    
    isActive: true,
    bizLicenseFile: "/uploads/licenses/COMP002_license.pdf",
    note: "Đối tác chiến lược",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-03-21")
  },
  {
    companyId: "COMP003",
    name: "Công ty TNHH Vận tải DEF",
    bizLicenseNumber: "0567891234",
    taxCode: "0567891234",
    address: "789 Điện Biên Phủ, Quận 3, TP. Hồ Chí Minh",
    phone: "028.5678.9123",
    email: "contact@def-transport.com",
    website: "https://def-transport.com",
    
    representativeName: "Lê Văn C",
    representativePhone: "0905555666",
    representativeEmail: "levanc@def-transport.com",
    
    businessType: "Công ty TNHH",
    establishedDate: new Date("2021-03-10"),
    employeeCount: 30,
    
    isActive: false,
    bizLicenseFile: "/uploads/licenses/COMP003_license.pdf",
    note: "Tạm ngưng hoạt động",
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-03-22")
  },
  {
    companyId: "COMP004",
    name: "Công ty Cổ phần Thương mại KLM",
    bizLicenseNumber: "0345678912",
    taxCode: "0345678912",
    address: "101 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh",
    phone: "028.3456.7891",
    email: "info@klm-trading.com",
    website: "https://klm-trading.com",
    
    representativeName: "Phạm Thị D",
    representativePhone: "0907777888",
    representativeEmail: "phamthid@klm-trading.com",
    
    businessType: "Công ty Cổ phần",
    establishedDate: new Date("2022-01-01"),
    employeeCount: 75,
    
    isActive: true,
    bizLicenseFile: "/uploads/licenses/COMP004_license.pdf",
    note: "Đối tác mới",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-23")
  }
]; 