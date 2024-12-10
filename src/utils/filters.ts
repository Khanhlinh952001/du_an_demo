import { Order } from "@/types/Order";
import { formatDate } from '@/utils/format';
import { PAYMENT_STATUS } from '@/constants/payments';

export const filterByDateRange = <T>(
    items: T[], 
    fromDate: Date, 
    toDate: Date,
    dateField: keyof T
): T[] => {
    if (!fromDate || !toDate) return items;

    const from = new Date(fromDate);
    const to = new Date(toDate);
    
    from.setHours(0, 0, 0, 0);
    to.setHours(23, 59, 59, 999);

    return items.filter((item) => {
        const itemDateStr = item[dateField] as string;
        if (!itemDateStr) return false;
        
        const itemDate = new Date(formatDate(itemDateStr));
        return itemDate >= from && itemDate <= to;
    });
};

export const filterBySender = (orders: Order[], searchText: string): Order[] => {
    if (!searchText) return orders;
    
    const searchLower = searchText.toLowerCase();
    return orders.filter(order => 
        order.senderName.toLowerCase().includes(searchLower) ||
        order.senderId.toLowerCase().includes(searchLower) ||
        order.senderPhone.includes(searchText)
    );
};

export const filterByReceiver = (orders: Order[], searchText: string): Order[] => {
    if (!searchText) return orders;
    
    const searchLower = searchText.toLowerCase();
    return orders.filter(order => 
        order.receiverName.toLowerCase().includes(searchLower) ||
        order.receiverId.toLowerCase().includes(searchLower) ||
        order.receiverPhone.includes(searchText)
    );
};

export const filterByRegion = (orders: Order[], region: string): Order[] => {
    if (!region) return orders;
    return orders.filter(order => order.receiverRegion === region);
};

export const filterByPaymentStatus = (orders: Order[], status: string): Order[] => {
    if (!status) return orders;
    return orders.filter(order => order.paymentStatus === status);
};

export const filterByOrderType = (orders: Order[], type: 'import' | 'export'): Order[] => {
    if (!type) return orders;
    return orders.filter(order => order.shippingType === type);
};

export const filterByServiceType = (orders: Order[], type: 'air' | 'sea'): Order[] => {
    if (!type) return orders;
    return orders.filter(order => order.serviceType === type);
};

export const filterUnpaidOrPartialPaidOrders = (orders: Order[]) => {
  return orders.filter(order => 
    order.paymentStatus === PAYMENT_STATUS.UNPAID || 
    order.paymentStatus === PAYMENT_STATUS.PARTIAL
  );
};
