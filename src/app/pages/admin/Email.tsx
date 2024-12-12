import React, { useEffect } from 'react';
import { Card, Input, Form, Space, Checkbox, Button, Select, InputNumber, TimePicker, message, Spin } from "antd";
import type { EmailSetting } from '@/types/AdminSettings';
import { SaveOutlined, SyncOutlined, SettingOutlined, MailOutlined, NotificationOutlined } from '@ant-design/icons';
import { useAdminSettings } from '@/hooks/useAdminSettings';
import { useAuth } from '@/hooks/useAuth';



const EmailSetting = () => {
    const { companyInfo } = useAuth();
    const { settings, updateEmailSettings, refreshSettings, loading } = useAdminSettings(companyInfo?.companyId || '');
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const [form3] = Form.useForm();
    console.log(settings)
    useEffect(() => {
        if (settings?.emailSetting) {
            form1.setFieldsValue({
                senderName: settings.emailSetting.senderName,
                senderEmail: settings.emailSetting.senderEmail,
                senderPassword: settings.emailSetting.senderPassword,
            });
            
            form2.setFieldsValue({
                toManifestName: settings.emailSetting.toManifestName,
                toManifestEmail: settings.emailSetting.toManifestEmail,
            });
            
            form3.setFieldsValue({
                schedule: settings.emailSetting.schedule,
                timeCallApi: settings.emailSetting.timeCallApi,
                toDeliveryEmail: settings.emailSetting.toDeliveryEmail,
            });
        }
    }, [settings, form1, form2, form3]);

    const handleFinish = async (values: Partial<EmailSetting>, formType: 'sender' | 'manifest' | 'delivery') => {
        try {
            let updateData: Partial<EmailSetting> = {};
            
            switch (formType) {
                case 'sender':
                    updateData = {
                        senderName: values.senderName,
                        senderEmail: values.senderEmail,
                        senderPassword: values.senderPassword,
                    };
                    break;
                case 'manifest':
                    updateData = {
                        toManifestName: values.toManifestName,
                        toManifestEmail: values.toManifestEmail,
                    };
                    break;
                case 'delivery':
                    updateData = {
                        schedule: values.schedule,
                        timeCallApi: values.timeCallApi,
                        toDeliveryEmail: values.toDeliveryEmail,
                    };
                    break;
            }
            
            await updateEmailSettings(updateData);
            await refreshSettings();
            message.success('Cập nhật thành công');
        } catch (error) {
            message.error('Có lỗi xảy ra khi cập nhật');
        }
    };

    return (
        <Card style={{ margin: '20px', backgroundColor: '#f0f2f5' }} title="Cấu hình email ">
            <Spin spinning={loading} tip="Loading...">
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Card title={<span><SettingOutlined /> Cấu hình email gửi</span>} bordered={false} style={{ marginBottom: '20px', borderColor: '#1890ff' }}>
                    <Form layout="vertical" form={form1} onFinish={(values) => handleFinish(values, 'sender')}>
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
                            <Button type="default" style={{ marginLeft: '8px', backgroundColor: '#f0f0f0', borderColor: '#d9d9d9' }} htmlType="submit" icon={<SyncOutlined style={{ color: '#1890ff' }} />}>Cập nhật</Button>
                        </Form.Item>
                    </Form>
                </Card>

                <Card title={<span><MailOutlined /> Email nhận Manifest</span>} style={{ borderColor: '#52c41a' }}>
                    <Form layout="vertical" form={form2} onFinish={(values) => handleFinish(values, 'manifest')}>
                        <Form.Item label="Tên người nhận" name="toManifestName">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email người nhận" name="toManifestEmail">
                            <Input />
                        </Form.Item>
                        <Form.Item style={{ textAlign: 'right' }}>
                            <Button type="default" style={{ marginLeft: '8px', backgroundColor: '#f0f0f0', borderColor: '#d9d9d9' }} htmlType="submit" icon={<SyncOutlined style={{ color: '#1890ff' }} />}>Cập nhật</Button>
                        </Form.Item>
                    </Form>
                </Card>

                <Card title={<span><NotificationOutlined /> Kích hoạt gửi email thông báo khi taekbae tới văn phòng (배송완료)</span>} style={{ borderColor: '#faad14' }}>
                    <Form layout="vertical" form={form3} onFinish={(values) => handleFinish(values, 'delivery')}>
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
                            <Button type="default" style={{ marginLeft: '8px', backgroundColor: '#f0f0f0', borderColor: '#d9d9d9' }} htmlType="submit" icon={<SyncOutlined style={{ color: '#1890ff' }} />}>Cập nhật</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Space>
            </Spin>
        </Card>
    );
}

export default EmailSetting;
