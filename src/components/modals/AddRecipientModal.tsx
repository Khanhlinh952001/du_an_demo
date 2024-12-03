import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Switch } from 'antd';
import { UserOutlined, PhoneOutlined, EnvironmentOutlined, GlobalOutlined, CarOutlined, TeamOutlined, FileTextOutlined } from '@ant-design/icons';
import type { Recipient } from '@/types/Recipient';

interface AddRecipientModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: Recipient) => void;
  initialData?: Recipient;
  mode?: 'add' | 'edit';
}

const AddRecipientModal: React.FC<AddRecipientModalProps> = ({
  open,
  onCancel,
  onSubmit,
  initialData,
  mode = 'add'
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      form.setFieldsValue(initialData);
    }
  }, [initialData, form, mode]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit({
        ...values,
        createdAt: mode === 'add' ? new Date() : initialData?.createdAt,
        updatedAt: new Date(),
      });
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={mode === 'add' ? 'Thêm người nhận mới' : 'Chỉnh sửa người nhận'}
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleSubmit}
      width={900}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialData}
        style={{ padding: '20px' }}
      >
        <div style={{ marginBottom: '24px' }}>
          <h3><UserOutlined style={{ color: '#1890ff', marginRight: '8px' }} />Thông tin cơ bản</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item
              name="name"
              label="Tên người nhận"
              rules={[{ required: true, message: 'Vui lòng nhập tên người nhận' }]}
            >
              <Input prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} placeholder="Nhập tên người nhận" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
            >
              <Input prefix={<PhoneOutlined style={{ color: '#bfbfbf' }} />} placeholder="Nhập số điện thoại" />
            </Form.Item>
          </div>

          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
          >
            <Input.TextArea 
              placeholder="Nhập địa chỉ" 
            />
          </Form.Item>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3><CarOutlined style={{ color: '#52c41a', marginRight: '8px' }} />Thông tin vận chuyển</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item
              name="region"
              label="Khu vực"
              rules={[{ required: true, message: 'Vui lòng chọn khu vực' }]}
            >
              <Select
                placeholder="Chọn khu vực"
                options={[
                  { value: 'north', label: 'Miền Bắc' },
                  { value: 'south', label: 'Miền Nam' },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="shipper"
              label="Đơn vị vận chuyển"
              rules={[{ required: true, message: 'Vui lòng chọn đơn vị vận chuyển' }]}
            >
              <Select
                placeholder="Chọn đơn vị vận chuyển"
                options={[
                  { value: 'vnpost', label: 'VNPost' },
                  { value: 'ghtk', label: 'Giao Hang Tiet Kiem' },
                  { value: 'ghn', label: 'Giao Hang Nhanh' },
                  { value: 'dhl', label: 'DHL' },
                  { value: 'fedex', label: 'FedEx' },
                ]}
              />
            </Form.Item>
          </div>
        </div>

        <div>
          <h3><TeamOutlined style={{ color: '#faad14', marginRight: '8px' }} />Thông tin quản lý</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          

            <Form.Item
              name="handlerId"
              label="Người phụ trách"
            >
              <Input placeholder="Nhập ID người phụ trách" />
            </Form.Item>

            <Form.Item
              name="note"
              label="Ghi chú"
            >
              <Input.TextArea rows={2} placeholder="Nhập ghi chú" />
            </Form.Item>

            <Form.Item
              name="isConfirmed"
              label="Trạng thái xác nhận"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default AddRecipientModal; 
