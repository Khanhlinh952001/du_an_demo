'use client';

import { Form, Input, Button, Card, Upload, message } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, IdcardOutlined, NumberOutlined, HomeOutlined, UploadOutlined } from '@ant-design/icons';
import { FaBuilding } from 'react-icons/fa';

interface ProfileTabProps {
  currentUser: any;
}

export default function ProfileTab({ currentUser }: ProfileTabProps) {
  const [form] = Form.useForm();

  const handleProfileUpdate = (values: any) => {
    console.log('Profile updated:', values);
  };

  return (
    <Card>
      <Form
        form={form}
        layout="vertical"
        initialValues={currentUser}
        onFinish={handleProfileUpdate}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item name="fullName" label="Họ và tên" rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}>
            <Input prefix={<UserOutlined />} placeholder="Nhập họ tên" />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' }
          ]}>
            <Input prefix={<MailOutlined />} placeholder="Nhập email" />
          </Form.Item>

          <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
            <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item name="idNumber" label="CMND/CCCD" rules={[{ required: true, message: 'Vui lòng nhập CMND/CCCD!' }]}>
            <Input prefix={<IdcardOutlined />} placeholder="Nhập CMND/CCCD" />
          </Form.Item>

          <Form.Item name="taxCode" label="Mã số thuế">
            <Input prefix={<NumberOutlined />} placeholder="Nhập mã số thuế" />
          </Form.Item>

          <Form.Item name="address" label="Địa chỉ">
            <Input prefix={<HomeOutlined />} placeholder="Nhập địa chỉ" />
          </Form.Item>

          <Form.Item name="companyName" label="Tên công ty">
            <Input prefix={<FaBuilding />} placeholder="Nhập tên công ty" />
          </Form.Item>

          <Form.Item name="avatar" label="Ảnh đại diện">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/api/upload"
              beforeUpload={(file) => {
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isJpgOrPng) {
                  message.error('Chỉ có thể tải lên file JPG/PNG!');
                }
                return isJpgOrPng;
              }}
            >
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
          </Form.Item>
        </div>

        <Form.Item className="mt-4">
          <Button type="primary" htmlType="submit">
            Cập nhật thông tin
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
