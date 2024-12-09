import { Recipient } from '@/types/Recipient';

export const recipientMockData: Recipient[] = [
  {
    manageId: 'ADM001',
    handlerId: 'HDL001',
    recipientId: 'RCP001',
    name: 'Nguyễn Văn A',
    phone: '0901234567',
    address: '123 Đường ABC, Quận 1',
    region: 'HN',
    shipper: 'Giao Hang Nhanh',
    note: 'Giao giờ hành chính',
    senderId: 'KH001',
    isConfirmed: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    manageId: 'ADM001',
    handlerId: 'HDL002',
    recipientId: 'RCP002',
    name: 'Trần Thị B',
    phone: '0909876543',
    address: '456 Đường XYZ, Quận 2',
    region: 'SGN',
    shipper: 'Viettel Post',
    note: 'Gọi trước khi giao',
    senderId: 'KH001',
    isConfirmed: true,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
  {
    manageId: 'ADM002',
    handlerId: 'HDL003',
    recipientId: 'RCP003',
    name: 'Lê Văn C',
    phone: '0905555555',
    address: '789 Đường DEF, Quận Hải Châu',
    region: 'SGN',
    shipper: 'J&T Express',
    note: 'Giao buổi sáng',
    senderId: 'SENDER002',
    isConfirmed: false,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  },
];

// Mock data grouped by senderId
export const recipientsBySender: Record<string, Recipient[]> = {
  'SENDER001': recipientMockData.slice(0, 2),
  'SENDER002': [recipientMockData[2]],
  'SENDER003': recipientMockData,
}; 
