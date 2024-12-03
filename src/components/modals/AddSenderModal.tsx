import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Select } from 'antd';
import type { Sender } from '@/types/Sender';
import dayjs from 'dayjs';
import { FacebookFilled, MessageFilled } from '@ant-design/icons';

interface AddSenderModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: Sender) => void;
  initialData?: Sender;
  mode?: 'add' | 'edit';
}

const AddSenderModal: React.FC<AddSenderModalProps> = ({ open, onCancel, onSubmit, initialData, mode = 'add' }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      form.setFieldsValue({
        ...initialData,
        joinDate: initialData.joinDate ? dayjs(initialData.joinDate) : null,
      });
    }
  }, [initialData, form, mode]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (!values.facebook && !values.zalo && !values.kakaoTalk) {
        throw new Error('Vui lòng nhập ít nhất một kênh liên hệ');
      }
      onSubmit({
        ...values,
        joinDate: values.joinDate.toISOString(),
        registerDate: new Date().toISOString(),
      });
      form.resetFields();
    } catch (error) {
      if (error instanceof Error) {
        Modal.error({
          title: 'Lỗi',
          content: error.message,
        });
      }
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={mode === 'add' ? "Thêm người gửi mới" : "Chỉnh sửa người gửi"}
      open={open}
      onCancel={onCancel}
      onOk={handleSubmit}
      width={900}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          contactChannel: 'Facebook'
        }}
        style={{ padding: '20px' }}
      >
        <div style={{ marginBottom: '24px' }}>
          <h3>Thông tin cơ bản</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item
              name="senderId"
              label="Mã khách hàng"
              rules={[
                { required: true, message: 'Vui lòng nhập mã khách hàng' },
                { pattern: /^[A-Za-z0-9]+$/, message: 'Mã khách hàng chỉ được chứa chữ và số' }
              ]}
            >
              <Input placeholder="Nhập mã khách hàng" />
            </Form.Item>

            <Form.Item
              name="name"
              label="Tên khách hàng"
              rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}
            >
              <Input placeholder="Nhập tên khách hàng" />
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
              name="joinDate"
              label="Ngày tham gia"
              rules={[{ required: true, message: 'Vui lòng chọn ngày tham gia' }]}
            >
              <DatePicker style={{ width: '100%' }} />
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

        <div>
          <h3>Thông tin liên hệ</h3>
          <Form.Item
            name="contactChannel"
            label="Kênh liên hệ chính"
            rules={[{ required: true, message: 'Vui lòng chọn kênh liên hệ chính' }]}
          >
            <Select>
              <Select.Option value="Facebook">
                <FacebookFilled style={{ color: '#1877F2' }} /> Facebook
              </Select.Option>
              <Select.Option value="Zalo">
                <MessageFilled style={{ color: '#0068FF' }} /> Zalo
              </Select.Option>
              <Select.Option value="KakaoTalk">
                <MessageFilled style={{ color: '#FFE812' }} /> KakaoTalk
              </Select.Option>
            </Select>
          </Form.Item>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <Form.Item
              name="facebook"
              label="Facebook"
            >
              <Input placeholder="Nhập tài khoản Facebook" />
            </Form.Item>

            <Form.Item
              name="zalo"
              label="Zalo"
            >
              <Input placeholder="Nhập tài khoản Zalo" />
            </Form.Item>

            <Form.Item
              name="kakaoTalk"
              label="KakaoTalk"
            >
              <Input placeholder="Nhập tài khoản KakaoTalk" />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default AddSenderModal; 