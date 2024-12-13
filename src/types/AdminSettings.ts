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





interface ManifestContent{
  name: string;
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
  serviceContent: string[];
  manifestContent: ManifestContent;
  invitationContent: InvitationContent;
  notificationContent: NotificationContent;
}

export interface Decentralization{
  role: string;
  permission: string[];
}



export interface SystemNotifications {
  id: string;
  companyId: string;
  title: string;
  content: string;
  type: 'update' | 'warning' | 'info';
  createdAt: string;
  createdBy: string;
  isRead: boolean;
  targetRoles: string[]; // Thêm trường này để xác định role nào sẽ nhận thông báo
  readBy: string[];
  module: string; // Thêm trường này để phân loại thông báo theo module
  action: string; // Thêm trường này để xác định hành động
}

export interface AdminSettings {
  adminId: string;
  emailSetting: EmailSetting;
  sampleContent: SampleContent;
  decentralization: Decentralization[];
  systemNotifications: SystemNotifications;
}
