import { Form, Input, Card } from "antd";
import { MailOutlined, NotificationOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';

function SampleContent() {
    return ( 
        <Card title="Thiết lập Nội dung mẫu" style={{ margin: '20px', backgroundColor: '#f0f2f5' }}>
            <Form layout="vertical">
                <Card title={<span><SettingOutlined /> Các loại Dịch vụ</span>} style={{ marginBottom: '20px', borderColor: '#1890ff' }}>
                    <Form.Item label="Dịch vụ" name="serviceContent">
                        <Input />
                    </Form.Item>
                </Card>
                <Card title={<span><MailOutlined /> Email gửi Manifest</span>} style={{ marginBottom: '20px', borderColor: '#52c41a' }}>
                    <Form.Item label="Tiêu đề" name="manifestTitle">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Nội dung" name="manifestContent">
                        <Input.TextArea />
                    </Form.Item>
                </Card>
                <Card title={<span><UserOutlined /> Email mời nhân viên tham gia đăng ký hệ thống</span>} style={{ marginBottom: '20px', borderColor: '#faad14' }}>
                    <Form.Item label="Tiêu đề" name="invitationTitle">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Nội dung" name="invitationContent">
                        <Input.TextArea />
                    </Form.Item>
                </Card>
                <Card title={<span><NotificationOutlined /> * Email gửi thông báo taekbae giao thành công</span>} style={{ borderColor: '#f5222d' }}>
                    <Form.Item label="Tiêu đề" name="notificationTitle">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Nội dung" name="notificationContent">
                        <Input.TextArea />
                    </Form.Item>
                </Card>
            </Form>
        </Card>
    );
}

export default SampleContent;
