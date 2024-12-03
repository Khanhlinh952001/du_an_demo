import { User } from "@/types/User";
import { ROLES, PERMISSIONS } from "@/constants/constants";

export const UserMockData: User[] = [
  {
    id: "USR001",
    name: "Nguyễn Văn Admin",
    email: "admin@company.com",
    phone: "0901234567",
    role: ROLES.ADMIN,
    permissions: [
      PERMISSIONS.CREATE_ACCOUNT,
      PERMISSIONS.MANAGE_ACCOUNT,
      PERMISSIONS.VIEW_REPORTS,
      PERMISSIONS.DELETE_ACCOUNT,
      PERMISSIONS.MANAGE_CUSTOMER,
      PERMISSIONS.APPROVE_PAYMENT,
      PERMISSIONS.MANAGE_SHIPMENTS,
      PERMISSIONS.VIEW_FINANCIAL_REPORTS
    ],
    settings: {
      subscriptionDays: 365,
      baseRate: 100000,
      airShippingRate: 250000,
      seaShippingRate: 150000,
      notificationsEnabled: true,
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-03-20")
    },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-03-20"),
    company: {
      companyCode: "COMP001",
      bizLicenseNumber: "BIZ001",
      address: "123 Đường ABC, Quận 1, TP.HCM"
    }
  },
  {
    id: "USR002",
    name: "Trần Thị Manager",
    email: "manager@company.com",
    phone: "0909876543",
    role: ROLES.MANAGER,
    permissions: [
      PERMISSIONS.CREATE_ACCOUNT,
      PERMISSIONS.UPDATE_ORDER,
      PERMISSIONS.ASSIGN_ORDER,
      PERMISSIONS.VIEW_ORDER_HISTORY,
      PERMISSIONS.MANAGE_CUSTOMER
    ],
    settings: {
      subscriptionDays: 180,
      baseRate: 90000,
      airShippingRate: 220000,
      seaShippingRate: 130000,
      notificationsEnabled: true,
      createdAt: new Date("2024-02-01"),
      updatedAt: new Date("2024-03-21")
    },
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-03-21"),
    company: {
      companyCode: "COMP002",
      bizLicenseNumber: "BIZ002",
      address: "456 Đường XYZ, Quận 2, TP.HCM"
    }
  }
]; 
