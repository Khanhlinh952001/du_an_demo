import { Sender } from './../types/Sender';
import { Recipient } from '@/types/Recipient';
export const getCustomerForOrder = (Senders: Sender[], senderId: string) => {
  return Senders.find(c => c.senderId === senderId);
};

export const getRecipientForOrder = (recipients: Recipient[], recipientId: string) => {
  return recipients.find(r => r.recipientId === recipientId);
}; 



