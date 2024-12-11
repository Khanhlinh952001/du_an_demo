import { Order } from "@/types/Order";
import { formatDate } from '@/utils/format';
import { PAYMENT_STATUS } from '@/constants/payments';
import { Sender } from "@/types/Sender";
import { Recipient } from "@/types/Recipient";

import { getCustomerForOrder ,getRecipientForOrder ,getPaymentForOrder ,getDeliveryForOrder} from '@/utils/orderHelpers'
import { Payment } from "@/types/Payment";
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

export const filterBySender = (
    orders: Order[], 
    searchText: string,
    senders: Sender[]
): Order[] => {
    if (!searchText) return orders;
    
    const searchLower = searchText.toLowerCase();
    return orders.filter(order => {
        const sender = getCustomerForOrder(senders, order.senderId);
        return (
            sender?.name.toLowerCase().includes(searchLower) ||
            sender?.senderId.toLowerCase().includes(searchLower) ||
            sender?.phone.includes(searchText) ||
            order.orderId.toLowerCase().includes(searchLower)
        );
    });
};

export const filterByReceiver = (orders: Order[], searchText: string, recipients: Recipient[]): Order[] => {
    if (!searchText) return orders;
    
    const searchLower = searchText.toLowerCase();
    return orders.filter(order => {
        const recipient = getRecipientForOrder(recipients, order.recipientId);
        return (
            recipient?.name.toLowerCase().includes(searchLower) ||
            recipient?.recipientId.toLowerCase().includes(searchLower) ||
            recipient?.phone.includes(searchText)
        );
    });
};

export const filterByRegion = (orders: Order[], region: string, recipients: Recipient[]): Order[] => {
    if (!region) return orders;

    return orders.filter(order => {
        const recipient = getRecipientForOrder(recipients, order.recipientId);
        return recipient?.region === region;
    });
};

export const filterByPaymentStatus = (orders: Order[], status: string, payments: Payment[]): Order[] => {
    if (!status) return orders;
    return orders.filter(order => {
        const payment = getPaymentForOrder(payments, order.paymentId || '');
        return payment?.status === status;
    });
};

export const filterByOrderType = (orders: Order[], type: 'import' | 'export'): Order[] => {
    if (!type) return orders;
    return orders.filter(order => order.shippingType === type);
};

export const filterByServiceType = (orders: Order[], type: 'air' | 'sea'): Order[] => {
    if (!type) return orders;
    return orders.filter(order => order.serviceType === type);
};

export const filterUnpaidOrPartialPaidOrders = (orders: Order[], payments: Payment[]) => {
  return orders.filter(order => 
    getPaymentForOrder(payments, order.paymentId || '')?.status === PAYMENT_STATUS.UNPAID || 
    getPaymentForOrder(payments, order.paymentId || '')?.status === PAYMENT_STATUS.PARTIAL
  );
};

