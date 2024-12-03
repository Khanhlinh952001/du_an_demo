import { Order } from "@/types/Order";

export const OrderMockData: Order[] = [
    {
      orderId: 'ORD001',
      manageId: 'MNG001',
      handlerId: 'HDL001',
      senderId: 'SND001',
      senderName: 'Nguyen Van A',
      senderPhone: '0123456789',
      senderAddress: '123 Đường ABC, Quận 1, TP. Hồ Chí Minh',
      receiverId: 'RCV001',
      receiverName: 'Tran Thi B',
      receiverPhone: '0987654321',
      receiverAddress: '456 Đường XYZ, Quận 2, TP. Hà Nội',
      origin: 'Hàn Quốc',
      destination: 'Việt Nam',
      serviceType: 'air',
      shippingType: 'export',
      itemType: 'Food',
      weight: 12,
      totalPackages: 2,
      trackingNumber: 'TRK001',
      shipmentDate: new Date('2024-01-01'),
      deliveryDate: new Date('2024-01-05'),
      createdAt: '2024-12-12',
      updatedAt: new Date(),
      status: 'Pending',
      paymentStatus: true,
      totalAmount: 1500000,
      note: 'Ghi chú mẫu',
      receiverRegion: 'SGN' ,
      price:8000   // SĐT người nhận
    },
    // Add more mock data if needed
  ];