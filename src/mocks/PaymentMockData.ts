import { Payment } from "@/types/Payment";

export const PaymentMockData: Payment[] = [
  {
    paymentId: "PAY001",
    orderId: "ORD001",
    paymentMethod: "Cash",
    amount: 1500000,
    status: "Success",
    paidAt: new Date("2024-03-20T15:30:00"),
    createdAt: new Date("2024-03-20"),
    updatedAt: new Date("2024-03-20")
  },
  {
    paymentId: "PAY002",
    orderId: "ORD002",
    paymentMethod: "Bank Transfer",
    amount: 2000000,
    status: "Pending",
    paidAt: new Date("2024-03-21T10:45:00"),
    createdAt: new Date("2024-03-21"),
    updatedAt: new Date("2024-03-21")
  },
  {
    paymentId: "PAY003",
    orderId: "ORD003",
    paymentMethod: "Credit Card",
    amount: 1800000,
    status: "Failed",
    paidAt: new Date("2024-03-22T09:15:00"),
    createdAt: new Date("2024-03-22"),
    updatedAt: new Date("2024-03-22")
  }
]; 
