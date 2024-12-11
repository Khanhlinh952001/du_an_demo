import { Order } from "@/types/Order";

export const OrderMockData: Order[] = [
    {
      orderId: 'ORD001',
      manageId: 'MNG001',
      handlerId: 'HDL001',
      senderId: 'SND001',
      paymentId: 'PAY001',
      recipientId: 'RCV001',
  
      
      serviceType: 'air',
      shippingType: 'export',
      weight: 12,
      totalPackages: 2,
      trackingNumber: 'TRK001',
      createdAt: new Date('2024-12-12'),
      updatedAt: new Date(),
      totalAmount: 1500000,
      note: 'Ghi chú mẫu',
      
      price:8000   
    },
    {
      orderId: 'ORD002',
      manageId: 'MNG002',
      handlerId: 'HDL002',
      senderId: 'SND001',
      recipientId: 'RCP002',
      paymentId: 'PAY003',
    
      serviceType: 'sea',
      shippingType: 'import',
      weight: 25,
      totalPackages: 3,
      trackingNumber: 'TRK002',
      createdAt: new Date('2024-12-15'),
      updatedAt: new Date(),
      totalAmount: 2500000,
      note: 'Hàng dễ vỡ',
      price: 12000
    },
    {
      orderId: 'ORD003',
      manageId: 'MNG003',
      handlerId: 'HDL003',
      senderId: 'SND003',
  
      recipientId: 'RCV003',
     
      
      serviceType: 'air',
      shippingType: 'import',
      weight: 8,
      totalPackages: 1,
      trackingNumber: 'TRK003',
      createdAt: new Date('2024-12-18'),
      updatedAt: new Date(),
      totalAmount: 800000,
      note: 'Giao hàng giờ hành chính',
      price: 6000
    },
    {
      orderId: 'ORD004',
      manageId: 'MNG004',
      handlerId: 'HDL004',
      senderId: 'SND004',
      recipientId: 'RCV004',
      serviceType: 'air',
      shippingType: 'export',
      weight: 5,
      totalPackages: 2,
      trackingNumber: 'TRK004',
      createdAt: new Date('2024-12-20'),
      updatedAt: new Date(),
      totalAmount: 1200000,
      note: 'Giao buổi sáng',
      price: 7000
    },
    {
      orderId: 'ORD005',
      manageId: 'MNG005',
      handlerId: 'HDL005',
      senderId: 'SND005',
      recipientId: 'RCV005',
      serviceType: 'sea',
      shippingType: 'import',
      weight: 15,
      totalPackages: 3,
      trackingNumber: 'TRK005',
      createdAt: new Date('2024-12-22'),
      updatedAt: new Date(),
      totalAmount: 1800000,
      note: 'Giao giờ hành chính',
      price: 9000
    }
];


   