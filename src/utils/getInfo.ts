import { senderMockData } from '@/mocks/senderMockData';
import { recipientMockData } from '@/mocks/recipientMockData';
import type { Sender } from '@/types/Sender';
import type { Recipient } from '@/types/Recipient';

export const getSenderInfo = (senderId: string): Sender | undefined => {
  return senderMockData.find(sender => sender.senderId === senderId);
};

export const getRecipientInfo = (recipientId: string): Recipient | undefined => {
  return recipientMockData.find(recipient => recipient.recipientId === recipientId);
};

export const getOrderParticipants = (senderId: string, recipientId: string) => {
  const sender = getSenderInfo(senderId);
  const recipient = getRecipientInfo(recipientId);

  return {
    sender,
    recipient,
    senderName: sender?.name || '',
    senderPhone: sender?.phone || '',
    senderAddress: sender?.address || '',
    recipientName: recipient?.name || '',
    recipientPhone: recipient?.phone || '',
    recipientAddress: recipient?.address || '',
  };
}; 
