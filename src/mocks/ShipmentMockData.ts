import { Shipment } from "@/types/Shipment";

export const ShipmentMockData: Shipment[] = [
  {
    shipmentId: "SHP001",
    orderId: "ORD001",
    route: "Hà Nội -> TP. Hồ Chí Minh",
    shipmentDate: new Date("2024-03-20"),
    estimatedArrival: new Date("2024-03-22"),
    status: "In Transit",
    trackingNumber: "TRK001",
    createdAt: new Date("2024-03-20"),
    updatedAt: new Date("2024-03-20")
  },
  {
    shipmentId: "SHP002",
    orderId: "ORD002",
    route: "Đà Nẵng -> Hà Nội",
    shipmentDate: new Date("2024-03-21"),
    estimatedArrival: new Date("2024-03-23"),
    status: "Delivered",
    trackingNumber: "TRK002",
    createdAt: new Date("2024-03-21"),
    updatedAt: new Date("2024-03-21")
  },
  {
    shipmentId: "SHP003",
    orderId: "ORD003",
    route: "TP. Hồ Chí Minh -> Đà Nẵng",
    shipmentDate: new Date("2024-03-22"),
    estimatedArrival: new Date("2024-03-24"),
    status: "Pending",
    trackingNumber: "TRK003",
    createdAt: new Date("2024-03-22"),
    updatedAt: new Date("2024-03-22")
  }
]; 
