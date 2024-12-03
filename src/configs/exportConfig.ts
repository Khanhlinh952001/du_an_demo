import { getEmployeeNameById } from "@/utils/employeeUtils";

// Định nghĩa kiểu dữ liệu cho cấu hình xuất
export interface ExportFieldConfig {
  key: string;
  label: string;
  getValue?: (record: any) => any;
}

// Cấu hình xuất cho người gửi (Sender)
export const senderExportConfig: ExportFieldConfig[] = [
  { key: 'senderId', label: 'Mã KH' },
  { key: 'name', label: 'Tên KH' },
  { key: 'phone', label: 'Số điện thoại' },
  { key: 'address', label: 'Địa chỉ' },
  { key: 'contactChannel', label: 'Kênh liên hệ' },
  { key: 'orderCount', label: 'Số đơn hàng' },
  { 
    key: 'unitPrice', 
    label: 'Đơn giá',
    getValue: (record) => record.unitPrice?.toLocaleString('vi-VN')
  },
  { 
    key: 'joinDate', 
    label: 'Ngày tham gia',
    getValue: (record) => new Date(record.joinDate).toLocaleDateString('vi-VN')
  },
  { 
    key: 'handlerId', 
    label: 'Người quản lý',
    getValue: (record) => getEmployeeNameById(record.handlerId || "")
  },
];

// Cấu hình xuất cho người nhận (Recipient)
export const recipientExportConfig: ExportFieldConfig[] = [
  { key: 'recipientId', label: 'Mã người nhận' },
  { key: 'name', label: 'Tên người nhận' },
  { key: 'phone', label: 'Số điện thoại' },
  { key: 'address', label: 'Địa chỉ' },
  { key: 'region', label: 'Khu vực' },
  { key: 'shipper', label: 'Đơn vị vận chuyển' },
  { key: 'status', label: 'Trạng thái' }
];

// Hàm helper để tạo dữ liệu xuất
export const createExportData = (records: any[], selectedFields: string[], config: ExportFieldConfig[]) => {
  return records.map(record => {
    const data: any = {};
    selectedFields.forEach(fieldKey => {
      const fieldConfig = config.find(c => c.key === fieldKey);
      if (fieldConfig) {
        const value = fieldConfig.getValue 
          ? fieldConfig.getValue(record)
          : record[fieldKey];
        data[fieldConfig.label] = value;
      }
    });
    return data;
  }); 
}

