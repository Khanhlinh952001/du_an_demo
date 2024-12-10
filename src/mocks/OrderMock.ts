import { Order } from "@/types/Order";
import { Delivery } from "@/types/Delivery";

export const OrderMockData: Order[] = [
    {
      orderId: 'ORD001',
      manageId: 'MNG001',
      handlerId: 'HDL001',
      senderId: 'SND001',
   
      recipientId: 'RCV001',
  
      
      serviceType: 'air',
      shippingType: 'export',
      itemType: 'Food',
      weight: 12,
      totalPackages: 2,
      trackingNumber: 'TRK001',
      shipmentDate: new Date('2024-01-01'),
      deliveryDate: new Date('2024-01-05'),
      createdAt: new Date('2024-12-12'),
      updatedAt: new Date(),
      status: 'Pending',
      paymentStatus: 'PAID',
      totalAmount: 1500000,
      note: 'Ghi chú mẫu',
      
      price:8000   
    },
    {
      orderId: 'ORD002',
      manageId: 'MNG002',
      handlerId: 'HDL002',
      senderId: 'SND001',
      recipientId: 'RCV001',
    
      serviceType: 'sea',
      shippingType: 'import',
      itemType: 'Electronics',
      weight: 25,
      totalPackages: 3,
      trackingNumber: 'TRK002',
      shipmentDate: new Date('2024-02-01'),
      deliveryDate: new Date('2024-02-10'),
      createdAt: new Date('2024-12-15'),
      updatedAt: new Date(),
      status: 'InProgress',
      paymentStatus: 'UNPAID',
      totalAmount: 2500000,
      note: 'Hàng dễ vỡ',
      price: 12000
    },
    {
      orderId: 'ORD003',
      manageId: 'MNG003',
      handlerId: 'HDL003',
      senderId: 'SND003',
  
      receiverId: 'RCV003',
     
      
      serviceType: 'air',
      shippingType: 'import',
      itemType: 'Electronics',
      weight: 8,
      totalPackages: 1,
      trackingNumber: 'TRK003',
      shipmentDate: new Date('2024-03-01'),
      deliveryDate: new Date('2024-03-03'),
      createdAt: new Date('2024-12-18'),
      updatedAt: new Date(),
      status: 'Delivered',
      paymentStatus: 'PARTIAL',
      totalAmount: 800000,
      note: 'Giao hàng giờ hành chính',
      receiverRegion: 'HAN',
      price: 6000
    },
    {
      orderId: 'ORD004',
      manageId: 'MNG004',
      handlerId: 'HDL004',
      senderId: 'SND004',
      receiverId: 'RCV004',
      serviceType: 'air',
      shippingType: 'export',
      itemType: 'Food',
      weight: 5,
      totalPackages: 2,
      trackingNumber: 'TRK004',
      shipmentDate: new Date('2024-03-15'),
      deliveryDate: new Date('2024-03-18'),
      createdAt: new Date('2024-12-20'),
      updatedAt: new Date(),
      status: 'Pending',
      paymentStatus: 'UNPAID',
      totalAmount: 1200000,
      note: 'Giao buổi sáng',
      receiverRegion: 'HAN',
      price: 7000
    },
    {
      orderId: 'ORD005',
      manageId: 'MNG005',
      handlerId: 'HDL005',
      senderId: 'SND005',
      senderName: 'Le Van I',
      senderPhone: '0123456785',
      senderAddress: '357 Đường MNO, Quận 8, TP. Hồ Chí Minh',
      receiverId: 'RCV005',
      receiverName: 'Pham Thi K',
      receiverPhone: '0987654325',
      receiverAddress: '468 Đường TUV, Quận Đống Đa, TP. Hà Nội',
      serviceType: 'sea',
      shippingType: 'import',
      itemType: 'Food',
      weight: 15,
      totalPackages: 3,
      trackingNumber: 'TRK005',
      shipmentDate: new Date('2024-03-20'),
      deliveryDate: new Date('2024-03-25'),
      createdAt: new Date('2024-12-22'),
      updatedAt: new Date(),
      status: 'InProgress',
      paymentStatus: 'UNPAID',
      totalAmount: 1800000,
      note: 'Giao giờ hành chính',
      receiverRegion: 'HAN',
      price: 9000
    }
];

export const DeliveryMockData: Delivery[] = [
    {
        deliveryId: 'DEL001',
        orderId: 'ORD001', // Relates to OrderMockData
        deliveredBy: 'EMP001',
        deliveredAt: new Date('2024-01-05'),
        status: 'Delivered',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date(),
        receiverSignature: 'signature1.png',
        proofOfDelivery: ['proof1.png', 'proof2.png'],
        attemptCount: 1,
        failureReason: '',
        sentDate: new Date('2024-01-01'),
        packageCount: 2,
        courierCompany: 'FastShip',
        trackingNumber: 'TRK001',
        notes: 'Handle with care',
        assignedEmployee: 'EMP001'
    },
    {
        deliveryId: 'DEL002',
        orderId: 'ORD002', // Relates to OrderMockData
        deliveredBy: 'EMP002',
        deliveredAt: new Date('2024-02-10'),
        status: 'Delivered',
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date(),
        receiverSignature: 'signature2.png',
        proofOfDelivery: ['proof3.png'],
        attemptCount: 1,
        failureReason: '',
        sentDate: new Date('2024-02-01'),
        packageCount: 3,
        courierCompany: 'SeaExpress',
        trackingNumber: 'TRK002',
        notes: 'Fragile',
        assignedEmployee: 'EMP002'
    },
    // Add more delivery mock data as needed
];
