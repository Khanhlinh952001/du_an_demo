'use client';

import { Card, Form, Switch, Button, TimePicker, Select } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

interface OtherSettingsTabProps {
  currentUser: any;
}

const { Option } = Select;

export default function OtherSettingsTab({ currentUser }: OtherSettingsTabProps) {
  const [form] = Form.useForm();

  const handleOtherSettingsUpdate = (values: any) => {
    console.log('Other settings updated:', values);
  };

  return (
    <Card>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          notifications: true,
          openTime: dayjs('08:00', 'HH:mm'),
          closeTime: dayjs('20:00', 'HH:mm'),
          language: 'vi',
          autoBackup: true
        }}
        onFinish={handleOtherSettingsUpdate}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item name="notifications" label="Thông báo" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item name="autoBackup" label="Tự động sao lưu dữ liệu" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item name="openTime" label="Giờ mở cửa">
            <TimePicker format="HH:mm" />
          </Form.Item>

          <Form.Item name="closeTime" label="Giờ đóng cửa">
            <TimePicker format="HH:mm" />
          </Form.Item>

          <Form.Item name="language" label="Ngôn ngữ">
            <Select>
              <Option value="vi">Tiếng Việt</Option>
              <Option value="en">English</Option>
            </Select>
          </Form.Item>

          <Form.Item name="currency" label="Đơn vị tiền tệ">
            <Select>
              <Option value="vnd">VNĐ</Option>
              <Option value="usd">USD</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item className="mt-4">
          <Button type="primary" htmlType="submit">
            Cập nhật cài đặt
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
