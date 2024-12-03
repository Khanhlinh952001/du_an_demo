import { Order } from '@/types/Order';

export const filterByDateRange = (orders: Order[], startDate?: Date, endDate?: Date) => {
  if (!startDate || !endDate) return orders;
  return orders.filter(order => {
    const orderDate = new Date(order.createdAt);
    return orderDate.getTime() >= startDate.valueOf() 
      && orderDate.getTime() <= endDate.valueOf();
  });
};

export const filterBySender = (orders: Order[], sender?: string) => {
  if (!sender) return orders;
  return orders.filter(order => 
    order.senderName.toLowerCase().includes(sender.toLowerCase())
  );
};

export const filterByReceiver = (orders: Order[], receiver?: string) => {
  if (!receiver) return orders;
  return orders.filter(order => 
    order.receiverName.toLowerCase().includes(receiver.toLowerCase())
  );
};
export const filterByPaymentStatus = (orders: Order[], status?: string | boolean) => {
  if (status === undefined || status === 'all') return orders;
  return orders.filter(order => order.paymentStatus === (status === 'paid'));
};

export const filterByRegion = (orders: Order[], region?: string) => {
  if (!region) return orders;
  return orders.filter(order => 
    order.origin === region || order.destination === region
  );
};

export const filterByServiceType = (orders: Order[], serviceType?: string) => {
  if (!serviceType) return orders;
  return orders.filter(order => order.serviceType === serviceType);
};

export const filterByShippingType = (orders: Order[], shippingType?: string) => {
  if (!shippingType) return orders;
  return orders.filter(order => order.shippingType === shippingType);
};

export const filterByPhone = (orders: Order[], phone?: string) => {
  if (!phone) return orders;
  return orders.filter(order => 
    order.senderPhone.includes(phone) || 
    order.receiverPhone.includes(phone)
  );
}; 
