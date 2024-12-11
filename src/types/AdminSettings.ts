export type EmailContent = {
    text?: string; // Optional text content
    html?: string; // Optional HTML content
  };

export type EmailSetting= {
  adminId: string;
    senderName: string;
    senderEmail: string;
    senderPassword: string;
    toManifestName: string;
    toManifestEmail: string;
    status: 'pending' | 'sent' | 'failed';
    content: EmailContent;
    schedule: string[]; // Assuming multiple schedules can be selected
    timeCallApi:Date[] | string[]; // Array of start and end times
    toDeliveryEmail: string;
};



export interface PriceSetting{
  adminId: string;
  sgnPrice : number;        // Đơn giá từ SGN (Sài Gòn)
  hanPrice: number;        // Đơn giá từ HAN (Hà Nội)
  seaPrice: number;        // Đơn giá từ SEA 
  vnToKrPriceInKRW?: number;      // Đơn giá từ KRW (Hàn Quốc)
  vnToKrPriceInVND?: number;      // Đơn giá từ VND (Việt Nam)
  exchangeRate: number;    // Tỷ giá
  serviceFee?: string;      // Công mua
}

interface ManifestContent{
  title: string;
  content: string;
}

interface InvitationContent{
  title: string;
  content: string;
}
interface NotificationContent{
  title: string;
  content: string;
}

export interface SampleContent{
  adminId: string;
  serviceContent: string[];
  manifestContent: ManifestContent;
  invitationContent: InvitationContent;
  notificationContent: NotificationContent;
}

export interface Decentralization{
  adminId: string;
  role: string;
  permission: string[];
}



export interface SystemNotifications{
  adminId: string;
  content: string;
  position: string;
  date: Date;
}

export interface AdminSettings {
  emailSetting: EmailSetting;
  priceSetting: PriceSetting;
  sampleContent: SampleContent;
  decentralization: Decentralization;
  systemNotifications: SystemNotifications;
}
