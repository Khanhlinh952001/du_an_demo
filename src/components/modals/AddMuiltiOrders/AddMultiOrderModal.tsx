import React, { useState } from 'react';
import { Modal, Form,  Button, Upload, message, Table } from 'antd';
import { UploadOutlined , PrinterOutlined} from '@ant-design/icons';
import { IoDownloadOutline } from 'react-icons/io5';
import type { Order } from '@/types/Order';
import { columns } from './columns';
import type { UploadProps } from 'antd';
import * as XLSX from 'xlsx';
import ScrollIndicator from '@/components/UI/Scroll';
interface AddMultiOrderModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

const AddMultiOrderModal: React.FC<AddMultiOrderModalProps> = ({
  open,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [orders, setOrders] = useState<Order[]>([]);
  const [rawData, setRawData] = useState<any[]>([]);
  const [formattedOrders, setFormattedOrders] = useState<any[]>([]);

  const uploadProps: UploadProps = {
    name: 'file',
    action: '/api/upload', // Replace with your actual upload endpoint
    accept: '.xlsx, .xls',
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleFileUpload = (file: File) => {
    console.log('File upload started:', file);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      
      const rawData = XLSX.utils.sheet_to_json(worksheet);
      console.log('Raw Excel data:', rawData);

      const formattedOrders:any = rawData.map((row: any) => ({
        orderId: row['Mã Đơn Hàng'] || '',
        senderName: row['Người Gửi'] || '',
        senderPhone: row['SĐT Người Gửi'] || '',
        senderAddress: row['Địa Chỉ Người Gửi'] || '',
        receiverName: row['Người Nhận'] || '',
        receiverPhone: row['SĐT Người Nhận'] || '',
        receiverAddress: row['Địa Chỉ Người Nhận'] || '',
        receiverRegion: row['Khu Vực'] || '',
        weight: row['Trọng Lượng'] || 0,
        price: row['Giá'] || 0,
        totalPrice: row['Thành Tiền'] || 0,
        paymentStatus: row['Trạng Thái Thanh Toán'] || '',
        note: row['Ghi Chú'] || '',
        status: 'pending',
        createdAt: row['Ngày Xuất'],
        updatedAt: new Date(),
        manageId: '',
        senderId: '',
        receiverId: '',
        origin: '',
        destination: '',
        serviceType: '',
        shippingType: '',
        itemType: '',
        totalPackages: row['Số Kiện'] || 0,
        trackingNumber: '',
        shipmentDate: row['Ngày Xuất'] ,
        deliveryDate: new Date(),
        totalAmount: parseFloat(row['Thành Tiền']) || 0,
      }));

      console.log('Formatted orders:', formattedOrders);
      setOrders(formattedOrders);
      setFormattedOrders(formattedOrders);
    };

    reader.onerror = (error) => {
      console.error('FileReader error:', error);
      message.error('Lỗi khi đọc file Excel');
    };

    reader.readAsArrayBuffer(file);
  };
 console.log(orders)
  // Xử lý khi submit form
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('Form values:', values);
      
      const orders = values.orders.map((order: any) => ({
        ...order,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      console.log('Processed orders:', orders);
      
      onSubmit(orders);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };




  // Thêm xử lý reset form và data khi đóng modal
  const handleCancel = () => {
    onCancel();
    setRawData([]);
    setFormattedOrders([]);
    form.resetFields();
  };

  // Thêm component thông báo kéo ngang


  const handlePrint = () => {
    // You can implement custom print logic here
    window.print();
  };

  return (
    <Modal
      title="Thêm Nhiều Đơn Hàng"
      open={open}
      onCancel={handleCancel}
      width={1200}
      style={{ top: 20 }}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          className="bg-blue-500"
        >
          Tạo đơn
        </Button>
      ]}
    >
      <Form form={form} layout="vertical">
        {/* Step 1: Download Template */}
        <div className="flex items-center mb-4">
          <div className="mr-2 text-lg font-bold">1</div>
          <div className="flex-1">
            <span>Tải file mẫu(Excel):</span>
            <Button icon={<IoDownloadOutline />} onClick={() => window.open('/mau_don_hang.xlsx')}>
              Tải xuống
            </Button>
          </div>
        </div>

        {/* Step 2: Upload Excel */}
        <div className="flex items-center mb-4">
          <div className="mr-2 text-lg font-bold">2</div>
          <div className="flex-1">
            <span>Upload excel file:</span>
            <Upload {...uploadProps} beforeUpload={(file) => { handleFileUpload(file); return false; }}>
              <Button icon={<UploadOutlined />}>Browse</Button>
            </Upload>
          </div>
        </div>

        {/* Step 3: Preview Table */}
        <div className="flex items-center mb-4">
          <div className="mr-2 text-lg font-bold">3</div>
          <div className="flex-1">
            <span>Xác nhận kết quả và in bill:</span>
     
          </div>
        </div>
        <div>
          <ScrollIndicator />
          <div className="overflow-auto">
            <Table
              columns={columns}
              dataSource={formattedOrders}
              scroll={{ x: 1800 }}
              size="middle"
              pagination={{
                pageSize: 5,
                position: ['bottomCenter'],
                showSizeChanger: true,
                showQuickJumper: true,
              }}
              bordered
              rowClassName={(record, index) => 
                `${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`
              }
              className="bg-white rounded-lg shadow-md"
            />
          </div>
          <div className='w-full flex justify-end pr-8 pt-4'>
          <Button 
              type="primary"
              icon={<PrinterOutlined />}
              onClick={handlePrint}
              className="ml-2 bg-blue-500 border-blue-500"
            >
              In Bill
            </Button>
          </div>
                 
        </div>
      </Form>
    </Modal>
  );
};

export default AddMultiOrderModal; 
