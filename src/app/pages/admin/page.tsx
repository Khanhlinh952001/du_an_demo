"use client"
import MainLayout from "@/layout/MainLayout";
import { Card, Tabs } from "antd";
import EmailSetting from "./Email";
import Price from "./Price";
import SampleContent from "./SampleContent";
import Employee from "./Employee";
import Decentralization from "./Decentralization";
import SystemNotifications from "./SystemNotifications";

function AdminPage() {
    const onChange = (key: string) => {
        console.log(key);
    };

    const items = [
        {
            key: '1',
            label: 'Cấu hình email',
            children: <EmailSetting />,
        },
        {
            key: '2',
            label: 'Thiết lập đơn giá',
            children: <Price />,
        },
        {
            key: '3',
            label: 'Nội dung mẫu',
            children: <SampleContent />,
        },
        {
            key: '4',
            label: 'Nhân sự',
            children: <Employee />,
        },
        {
            key: '5',
            label: 'Phân quyền',
            children: <Decentralization />,
        },
        {
            key: '6',
            label: 'Thông báo hệ thống',
            children: <SystemNotifications />,
        },
    ];

    return (
        <MainLayout>
            <Card title="Admin">
            <Tabs
                defaultActiveKey="1"
                items={items}
                onChange={onChange}
            />
            </Card>
           
        </MainLayout>
    );
}

export default AdminPage;
