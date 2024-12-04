import { OrderMockData } from './OrderMock';

export interface DebtRecord {
  key: string;
  date: string;
  name: string;
  route: string;
  type: 'AIR' | 'SEA';
  importExport: 'IMPORT' | 'EXPORT';
  amount: number;
  status: 'UNPAID' | 'PAID' | 'PARTIAL' | 'ALL';
}

// Lọc và chuyển đổi từ OrderMockData
export const DebtMockData: DebtRecord[] = OrderMockData
  .filter(order => !order.paymentStatus) // Lọc các đơn chưa thanh toán
  .map(order => ({
    key: order.orderId,
    date: new Date(order.shipmentDate).toLocaleDateString(),
    name: order.senderName,
    route: `${order.origin} - ${order.destination}`,
    type: order.serviceType.toUpperCase() === 'AIR' ? 'AIR' : 'SEA',
    importExport: order.shippingType.toUpperCase() === 'EXPORT' ? 'EXPORT' : 'IMPORT',
    amount: order.totalAmount,
    status: order.paymentStatus ? 'PAID' : 'UNPAID'
  })); 