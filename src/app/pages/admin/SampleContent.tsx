import { Form, Input, Card, Button, Spin, Space } from "antd";
import { MailOutlined, NotificationOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { useAdminSettings } from '@/hooks/useAdminSettings';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import type { SampleContent as SampleContentType } from '@/types/AdminSettings';
import { message } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { SaveOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
function SampleContent() {
    const { companyInfo } = useAuth();
    const { settings, updateSampleContent, refreshSettings, loading: settingsLoading } = useAdminSettings(companyInfo?.companyId || '');
    const [form] = Form.useForm();
    const [serviceInputs, setServiceInputs] = useState<number[]>([0]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (settings?.sampleContent) {
            const existingServices = settings.sampleContent.serviceContent || [];
            setServiceInputs(existingServices.length > 0 
                ? existingServices.map((_, index) => index) 
                : [0]
            );

            const formValues = {
                ...existingServices.reduce((acc, content, index) => ({
                    ...acc,
                    [`serviceContent${index}`]: content
                }), {}),
                        manifestName: settings.sampleContent.manifestContent?.name || '',
                manifestTitle: settings.sampleContent.manifestContent?.title || '',
                manifestContent: settings.sampleContent.manifestContent?.content || '',
                invitationTitle: settings.sampleContent.invitationContent?.title || '',
                invitationContent: settings.sampleContent.invitationContent?.content || '',
                notificationTitle: settings.sampleContent.notificationContent?.title || '',
                notificationContent: settings.sampleContent.notificationContent?.content || '',
            };
            form.setFieldsValue(formValues);
        }
    }, [settings, form]);

    const handleFinish = async (values: any) => {
        setLoading(true);
        try {
            const serviceContents = serviceInputs
                .map(index => values[`serviceContent${index}`])
                .filter(Boolean);

            const updateData: SampleContentType = {
                serviceContent: serviceContents,
                manifestContent: {
                    name: values.manifestName || '',
                    title: values.manifestTitle || '',
                    content: values.manifestContent || ''
                },
                invitationContent: {
                    title: values.invitationTitle || '',
                    content: values.invitationContent || ''
                },
                notificationContent: {
                    title: values.notificationTitle || '',
                    content: values.notificationContent || ''
                }
            };

            await updateSampleContent(updateData);
            await refreshSettings();
            message.success('Cập nhật thành công');
        } catch (error) {
            message.error('Có lỗi xảy ra khi cập nhật');
        }
        setLoading(false);
    };

    const handleAddService = () => {
        setServiceInputs([...serviceInputs, serviceInputs.length]);
    };

    return ( 
        <Card title="Thiết lập Nội dung mẫu" style={{ margin: '20px', backgroundColor: '#f0f2f5' }}>
            <Spin spinning={loading || settingsLoading} tip="Loading...">      
                <Form layout="vertical" form={form} onFinish={handleFinish}>
                <Card title={<span><SettingOutlined /> Các loại Dịch vụ</span>} style={{ marginBottom: '20px', borderColor: '#1890ff' }}>
                    {serviceInputs.map((index) => (
                        <Form.Item 
                            key={index}
                            label={`Dịch vụ ${index + 1}`} 
                            name={`serviceContent${index}`}
                        >
                            <Input />
                        </Form.Item>
                    ))}
                    <Space direction="horizontal" style={{ marginTop: '10px' , justifyContent: 'flex-end',display: 'flex'}}>
                    <Button 
                        type="primary" 
                        icon={<PlusOutlined style={{ color: '#fff' }} />} 
                        style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
                        onClick={handleAddService}
                    >
                        Thêm
                    </Button>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        icon={<SaveOutlined style={{ color: '#fff' }} />} 
                        style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
                    >
                        Lưu
                    </Button>
                    </Space>
                  
                </Card>

                <Card title={<span><MailOutlined /> Email nhận Manifest</span>} style={{ marginBottom: '20px', borderColor: '#52c41a' }}>
                <Form.Item label="Tên" name="manifestName">
                    <Input />
                </Form.Item>
                    <Form.Item label="Tiêu đề" name="manifestTitle">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Nội dung" name="manifestContent">
                        <Input.TextArea />
                    </Form.Item>
                    <Space direction="horizontal" style={{ marginTop: '10px' , justifyContent: 'flex-end',display: 'flex'}}>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            icon={<SaveOutlined style={{ color: '#fff' }} />} 
                            style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
                        >
                            Lưu
                        </Button>
                    </Space>
                </Card>

                <Card title={<span><UserOutlined /> Email mời nhân viên tham gia đăng ký hệ thống</span>} style={{ marginBottom: '20px', borderColor: '#faad14' }}>
                    <Form.Item label="Tiêu đề" name="invitationTitle">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Nội dung" name="invitationContent">
                        <Input.TextArea />
                    </Form.Item>
                    <Space direction="horizontal" style={{ marginTop: '10px' , justifyContent: 'flex-end',display: 'flex'}}>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            icon={<SaveOutlined style={{ color: '#fff' }} />} 
                            style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
                        >
                            Lưu
                        </Button>
                    </Space>
                </Card>

                <Card title={<span><NotificationOutlined /> Email gửi thông báo taekbae giao thành công</span>} style={{ borderColor: '#f5222d' }}>
                    <Form.Item label="Tiêu đề" name="notificationTitle">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Nội dung" name="notificationContent">
                        <Input.TextArea />
                    </Form.Item>
                    <Space direction="horizontal" style={{ marginTop: '10px' , justifyContent: 'flex-end',display: 'flex'}}>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            icon={<SaveOutlined style={{ color: '#fff' }} />} 
                            style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
                        >
                            Lưu
                        </Button>
                    </Space>
                </Card>

                
            </Form>
            </Spin>
        </Card>
    );
}

export default SampleContent;
