import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Switch } from 'antd';
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
          <h3>Thông tin cơ bản</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item
              name="recipientId"
              label="Mã người nhận"
              rules={[
                { required: true, message: 'Vui lòng nhập mã người nhận' },
                { pattern: /^[A-Za-z0-9]+$/, message: 'Mã người nhận chỉ được chứa chữ và số' }
              ]}
            >
              <Input placeholder="Nhập mã người nhận" />
            </Form.Item>

            <Form.Item
              name="name"
              label="Tên người nhận"
              rules={[{ required: true, message: 'Vui lòng nhập tên người nhận' }]}
            >
              <Input placeholder="Nhập tên người nhận" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại' },
                { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ' }
              ]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { type: 'email', message: 'Email không hợp lệ' }
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
          </div>

          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
          >
            <Input.TextArea rows={2} placeholder="Nhập địa chỉ" />
          </Form.Item>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3>Thông tin vận chuyển</h3>
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
                  { value: 'central', label: 'Miền Trung' },
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
          <h3>Thông tin quản lý</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item
              name="senderId"
              label="Mã khách hàng"
              rules={[{ required: true, message: 'Vui lòng nhập mã khách hàng' }]}
            >
              <Input placeholder="Nhập mã khách hàng" />
            </Form.Item>

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