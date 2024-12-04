import React, { useState } from 'react';
import { Modal, Form, Input, Button, Space, Divider, Upload, message } from 'antd';
import { PlusOutlined, MinusCircleOutlined, UploadOutlined ,CloudUploadOutlined} from '@ant-design/icons';
import { IoDownloadOutline } from 'react-icons/io5';
import type { Order } from '@/types/Order';
import { UserOutlined, PhoneOutlined, HomeOutlined, BoxPlotOutlined } from '@ant-design/icons';
import { BiDownload } from 'react-icons/bi';
import type { UploadProps } from 'antd';

interface AddMultiOrderModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: Order[]) => void;
}

const AddMultiOrderModal: React.FC<AddMultiOrderModalProps> = ({
  open,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();

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

  // Xử lý khi submit form
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const orders = values.orders.map((order: any) => ({
        ...order,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      onSubmit(orders);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title="Tạo nhiều đơn hàng"
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleSubmit}
      width={1200}
    >
      <Form form={form} layout="vertical">
        {/* Step 1: Download Template */}
        <div className="step-container">
          <div className="step-number">1</div>
          <div className="step-content">
            <span>Tải file mẫu(Excel):</span>
            <Button icon={<IoDownloadOutline />} onClick={() => window.open('/path-to-template.xlsx')}>
              Tải xuống
            </Button>
          </div>
        </div>

        {/* Step 2: Upload Excel */}
        <div className="step-container">
          <div className="step-number">2</div>
          <div className="step-content">
            <span>Upload excel file:</span>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Browse</Button>
            </Upload>
          </div>
        </div>

        {/* Step 3: Preview Table */}
        <div className="step-container">
          <div className="step-number">3</div>
          <div className="step-content">
            <span>Xác nhận kết quả và in bill:</span>
            {/* Add your table component here */}
          </div>
        </div>

        <style jsx>{`
          .step-container {
            display: flex;
            align-items: flex-start;
            margin-bottom: 20px;
            gap: 16px;
          }
          
          .step-number {
            background: #f0f0f0;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
          }
          
          .step-content {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 16px;
          }
        `}</style>
      </Form>
    </Modal>
  );
};

export default AddMultiOrderModal; 