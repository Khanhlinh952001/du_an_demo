import { Order } from "@/types/Order";
import { Delivery } from "@/types/Delivery";

export function mergeOrderAndDeliveryData(orders: Order[], deliveries: Delivery[]) {
    return orders.map(order => {
        const delivery = deliveries.find(d => d.orderId === order.orderId);
        return {
            ...order,
            ...delivery, // This will add delivery fields to the order
        };
    });
} 
