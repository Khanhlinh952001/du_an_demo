import React from 'react';
import { Card, Input, Form, Space, Checkbox, Button, Select, InputNumber, TimePicker } from "antd";
import type { EmailSetting } from '@/types/AdminSettings';
import { SaveOutlined, SyncOutlined, SettingOutlined, MailOutlined, NotificationOutlined } from '@ant-design/icons';

type EmailSettingProps = {
    schedule: EmailSetting;
    onSubmit: (schedule: EmailSetting) => void;
};

// const sampleSchedule: EmailSetting = {
//     senderName: "John Doe",
//     senderEmail: "john.doe@example.com",
//     senderPassword: "password123",
//     toManifestName: "Jane Smith",
//     toManifestEmail: "jane.smith@example.com",
//     schedule: ["daily", "hourly"],
//     timeCallApi: [ ], // Array of tuples
//     toDeliveryEmail: "delivery@example.com",
//     status: "pending",
//     content: {
//         text: "Sample email content",
//         html: "<p>Sample email content</p>"
//     }
// };

const EmailSetting = () => {
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const [form3] = Form.useForm();

    const handleFinish = (values: EmailSetting) => {
        console.log(values);
        // values.timeCallApi = [values.timeCallApi[0], values.timeCallApi[1]];
        
    };

  

    return (
        <Card style={{ margin: '20px', backgroundColor: '#f0f2f5' }} title="Cấu hình email ">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Card title={<span><SettingOutlined /> Cấu hình email gửi</span>} bordered={false} style={{ marginBottom: '20px', borderColor: '#1890ff' }}>
                    <Form layout="vertical" form={form1} onFinish={handleFinish}>
                        <Form.Item label="Name" name="senderName">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email" name="senderEmail">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Password" name="senderPassword">
                            <Input.Password />
                        </Form.Item>
                        <Form.Item style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit" icon={<SaveOutlined style={{ color: '#fff' }} />} style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}>Lưu</Button>
                            <Button type="default" style={{ marginLeft: '8px', backgroundColor: '#f0f0f0', borderColor: '#d9d9d9' }} htmlType="submit" icon={<SyncOutlined style={{ color: '#1890ff' }} />}>Cập nhật</Button>
                        </Form.Item>
                    </Form>
                </Card>

                <Card title={<span><MailOutlined /> Email nhận Manifest</span>} style={{ borderColor: '#52c41a' }}>
                    <Form layout="vertical" form={form2} onFinish={handleFinish}>
                        <Form.Item label="Tên người nhận" name="toManifestName">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email người nhận" name="toManifestEmail">
                            <Input />
                        </Form.Item>
                        <Form.Item style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit" icon={<SaveOutlined style={{ color: '#fff' }} />} style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}>Lưu</Button>
                            <Button type="default" style={{ marginLeft: '8px', backgroundColor: '#f0f0f0', borderColor: '#d9d9d9' }} htmlType="submit" icon={<SyncOutlined style={{ color: '#1890ff' }} />}>Cập nhật</Button>
                        </Form.Item>
                    </Form>
                </Card>

                <Card title={<span><NotificationOutlined /> Kích hoạt gửi email thông báo khi taekbae tới văn phòng (배송완료)</span>} style={{ borderColor: '#faad14' }}>
                    <Form layout="vertical" form={form3} onFinish={handleFinish}>
                        <Form.Item label="Chu kỳ gửi goi Api" name="schedule">
                            <Select mode="multiple" placeholder="Chọn chu kỳ">
                                <Select.Option value="daily">Hàng ngày</Select.Option>
                                <Select.Option value="hourly">Hàng giờ</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Thời gian goi Api">
                            <Form.List name="timeCallApi" >
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                <Form.Item {...restField} name={[name]}>
                                                    <Input type="time" />
                                                </Form.Item>
                                                <Button type="link" onClick={() => remove(name)}>Remove</Button>
                                            </Space>
                                        ))}
                                        <Button type="dashed" style={{ width: '80px' }} onClick={() => add()} block>
                                            Add Time
                                        </Button>
                                    </>
                                )}
                            </Form.List>
                        </Form.Item>
                        <Form.Item label="Gửi đến" name="toDeliveryEmail">
                            <Input />
                        </Form.Item>
                        <Form.Item style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit" icon={<SaveOutlined style={{ color: '#fff' }} />} style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}>Lưu</Button>
                            <Button type="default" style={{ marginLeft: '8px', backgroundColor: '#f0f0f0', borderColor: '#d9d9d9' }} htmlType="submit" icon={<SyncOutlined style={{ color: '#1890ff' }} />}>Cập nhật</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Space>
        </Card>
    );
}

export default EmailSetting;
