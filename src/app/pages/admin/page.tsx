"use client"
import MainLayout from "@/layout/MainLayout";
import { Card, Tabs } from "antd";

function AdminPage() {
    const onChange = (key: string) => {
        console.log(key);
    };

    const items = [
        {
            key: '1',
            label: 'Cấu hình email',
            children: <div>Nội dung cho Cấu hình email</div>,
        },
        {
            key: '2',
            label: 'Thiết lập đơn giá',
            children: <div>Nội dung cho Thiết lập đơn giá</div>,
        },
        {
            key: '3',
            label: 'Nội dung mẫu',
            children: <div>Nội dung cho Nội dung mẫu</div>,
        },
        {
            key: '4',
            label: 'Nhân sự',
            children: <div>Nội dung cho Nhân sự</div>,
        },
        {
            key: '5',
            label: 'Phân quyền',
            children: <div>Nội dung cho Phân quyền</div>,
        },
        {
            key: '6',
            label: 'Thông báo hệ thống',
            children: <div>Nội dung cho Thông báo hệ thống</div>,
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
