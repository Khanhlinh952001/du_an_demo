import { getEmployeeNameById } from "@/utils/employeeUtils";
import { getCustomerForOrder } from "@/utils/orderHelpers";
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
  { key: 'note', label: 'Ghi chú' },
  { key: 'shipper', label: 'Đơn vị vận chuyển' },
  { key: 'status', label: 'Trạng thái' }
];

// Thêm cấu hình cho đơn hàng
export const orderExportConfig = [
  { key: 'createdAt', label: 'Ngày Xuất' },
  { key: 'orderId', label: 'Mã Đơn Hàng' },
  
  { key: 'senderName', label: 'Người Gửi' },
  { key: 'senderPhone', label: 'SĐT Người Gửi' },
  { key: 'senderAddress', label: 'Địa Chỉ Người Gửi' },
  { key: 'receiverName', label: 'Người Nhận' },
  { key: 'receiverPhone', label: 'SĐT Người Nhận' },
  { key: 'receiverRegion', label: 'Khu Vực' },
  { key: 'receiverAddress', label: 'Địa Chỉ Người Nhận' },
  { key: 'totalPackages', label: 'Số Kiện' },
  { key: 'weight', label: 'Trọng Lượng' },
  { key: 'price', label: 'Giá' },
  { key: 'totalAmount', label: 'Thành Tiền' },
  { key: 'paymentStatus', label: 'Trạng Thái Thanh Toán' },
  { key: 'note', label: 'Ghi Chú' },
];

// Hàm helper để tạo dữ liệu xuất
export const createExportData = (data: any[], selectedFields: string[], config: any[]) => {
  return data.map(item => {
    const exportItem: any = {};
    selectedFields.forEach(field => {
      const fieldConfig = config.find(c => c.key === field);
      if (fieldConfig) {
        let value = item[field];
        
        // Xử lý các trường đặc biệt
        if (field === 'createdAt') {
          value = new Date(value).toLocaleDateString('vi-VN');
        } else if (field === 'price' || field === 'totalAmount') {
          value = value.toLocaleString('vi-VN');
        } else if (field === 'weight') {
          value = `${value} kg`;
        } else if (field === 'paymentStatus') {
          value = value ? 'Đã thanh toán' : 'Chưa thanh toán';
        }
        
        exportItem[fieldConfig.label] = value;
      }
    });
    return exportItem;
  });
};

