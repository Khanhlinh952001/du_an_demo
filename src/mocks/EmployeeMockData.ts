import { Employee } from "@/types/Employee";
import { ROLES } from "@/constants";

export const EmployeeMockData: Employee[] = [
  {
    employeeId: "HDL001",
    manageId: "ADM001",
    name: "Nguyễn Văn An",
    email: "an.nguyen@company.com",
    password: "hashedPassword123",
    phone: "0901234567",
    role: ROLES.WAREHOUSE_KR,
    department: "Vận chuyển",
    isActive: true,
    hireDate: "2024-01-15",
    assignOrders: ["ORD001", "ORD002"],
    lastLogin: new Date("2024-03-20T08:30:00"),
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-03-20")
  },
  {
    employeeId: "EMP002",
    manageId: "ADM001",
    name: "Trần Thị Bình",
    email: "binh.tran@company.com",
    password: "hashedPassword456",
    phone: "0909876543",
    role: ROLES.ACCOUNTANT,
    department: "Kế toán",
    isActive: true,
    hireDate: "2024-02-01",
    assignOrders: ["ORD003"],
    lastLogin: new Date("2024-03-21T09:15:00"),
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-03-21")
  }
]; 
