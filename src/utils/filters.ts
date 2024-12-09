import { Order } from "@/types/Order";

// ... existing code ...
export const filterByDateRange = <T>(
    items: T[], 
    fromDate: Date, 
    toDate: Date,
    dateField: keyof T
): T[] => {
    // Tạo bản sao của ngày để tránh thay đổi tham số gốc
    const from = new Date(fromDate);
    const to = new Date(toDate);
    
    // Đặt thời gian cho ngày bắt đầu và kết thúc
    from.setHours(0, 0, 0, 0);
    to.setHours(23, 59, 59, 999);

    return items.filter((item) => {
        const itemDate = item[dateField] instanceof Date 
            ? new Date(item[dateField] as Date)
            : new Date(item[dateField] as string);
        itemDate.setHours(0, 0, 0, 0);
        
        return itemDate >= from && itemDate <= to;
    });
};


// ... existing code ...
export const filterBySender = (items: any[], searchText: string) => {
  if (!searchText) return items;
  
  const searchLower = searchText.toLowerCase();
  const filtered = items.filter(item =>
    (item.senderName?.toLowerCase().includes(searchLower) ||
    item.senderId?.toLowerCase().includes(searchLower) ||
    item.senderPhone?.includes(searchText))
  );
  
  console.log('Filtered by sender:', filtered);
  return filtered;
};

export const filterByReceiver = (items: any[], searchText: string) => {
  if (!searchText) return items;
  
  const searchLower = searchText.toLowerCase();
  const filtered = items.filter(item =>
    (item.receiverName?.toLowerCase().includes(searchLower) ||
    item.receiverId?.toLowerCase().includes(searchLower))
  );
  
  console.log('Filtered by receiver:', filtered);
  return filtered;
};

export const filterByPaymentStatus = (items: any[], status: string) => {
  if (!status) return items;
  
  return items.filter(item => {
    const isPaid = status === 'paid';
    return item.paymentStatus === isPaid;
  });
};

export const filterByRegion = (items: any[], region: string) => {
  if (!region) return items;
  
  const filtered = items.filter(item => item.receiverRegion === region);
  console.log('Filtered by region:', filtered);
  return filtered;
};

export const filterByServiceType = (orders: any[], serviceType?: string) => {
  if (!serviceType) return orders;
  
  console.log('Filtering by service type:', serviceType);
  console.log('Orders before service type filter:', orders.map(o => ({
    orderId: o.orderId,
    serviceType: o.serviceType
  })));
  
  const filtered = orders.filter(order => {
    const match = order.serviceType === serviceType;
    console.log(`Order ${order.orderId} service type ${order.serviceType} matches ${serviceType}:`, match);
    return match;
  });
  
  console.log('Orders after service type filter:', filtered.map(o => ({
    orderId: o.orderId,
    serviceType: o.serviceType
  })));
  
  return filtered;
};

export const filterByShippingType = (orders: any[], shippingType?: string) => {
  if (!shippingType) return orders;
  return orders.filter(order => order.shippingType === shippingType);
};

export const filterByPhone = (orders: any[], phone?: string) => {
  if (!phone) return orders;
  return orders.filter(order => 
    order.senderPhone.includes(phone) || 
    order.receiverPhone.includes(phone)
  );
};

export const filterByOrderType = (orders: any[], orderType: string) => {
    return orders.filter(order => order.shippingType=== orderType);
};



export const filterUnpaidOrPartialPaidOrders = (orders: Order[]): Order[] => {
  return orders.filter(order => 
    order.paymentStatus === 'UNPAID' || order.paymentStatus === 'PARTIAL'
  );
};
