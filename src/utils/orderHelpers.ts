import { Sender } from './../types/Sender';
import { Recipient } from '@/types/Recipient';
import { Payment } from '@/types/Payment';
import { DeliveryCompany } from '@/types/Delivery';
import { Order } from '@/types/Order';

// Lấy thông tin người gửi cho đơn hàng dựa vào senderId
export const getCustomerForOrder = (Senders: Sender[], senderId: string): Sender | undefined => {
  return Senders.find(c => c.senderId === senderId);
};

// Lấy thông tin người nhận cho đơn hàng dựa vào recipientId
export const getRecipientForOrder = (recipients: Recipient[], recipientId: string): Recipient | undefined => {
  return recipients.find(r => r.recipientId === recipientId);
}; 

// Lấy thông tin thanh toán cho đơn hàng dựa vào paymentId
export const getPaymentForOrder = (payments: Payment[], paymentId: string): Payment | undefined => {
  return payments.find(p => p.paymentId === paymentId);
};

// Lấy thông tin công ty vận chuyển cho đơn hàng dựa vào deliveryId
export const getDeliveryForOrder = (deliveries: DeliveryCompany[], deliveryId: string): DeliveryCompany | undefined => {
  return deliveries.find(d => d.deliveryId === deliveryId);
};

// Lấy thông tin khách hàng dựa vào customerId
export const getCustomerById = (customers: Sender[], customerId: string): Sender | undefined => {
  return customers.find(customer => customer.senderId === customerId);
};




