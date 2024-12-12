"use client"
import MainLayout from "@/layout/MainLayout";
import { Button, Card, Col, Form, Input, Row, Space, Typography, Tabs } from "antd";
import Image from 'next/image';
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import CompanyProfile from "./CompanyProfile";
import { ROLES } from "@/constants";
import PersonalProfile from "./PersonalProfile";
function Profile() {
    const { user ,companyInfo } = useAuth();
    console.log(companyInfo)
    const isManager = user?.role === ROLES.MANAGER;
    const [isEditingCompany, setIsEditingCompany] = useState(false);
    const [isEditingPersonal, setIsEditingPersonal] = useState(false);

    const handleCompanySave = () => {
        // TODO: Implement save logic
        setIsEditingCompany(false);
    };

    const handlePersonalSave = () => {
        // TODO: Implement save logic
        setIsEditingPersonal(false);
    };

    console.log(user)
    // console.log(companyInfo)
    return (
        <MainLayout>
            <Card style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Space direction="horizontal" style={{ marginBottom: '20px' }}>
                    <Typography.Title level={3}>Hồ sơ Chung</Typography.Title>
                    {isManager && (
                        <Link href="/pages/admin">
                            <Button type="primary" style={{ marginLeft: 'auto' }}>
                                Đi tới trang Admin
                            </Button>
                        </Link>
                    )}
                </Space>

                <Tabs
                    items={[
                     
                        {
                            key: '1',
                            label: 'Hồ sơ cá nhân',
                            children: (
                                <PersonalProfile />
                            ),
                        },
                        {
                            key: '2',
                            label: 'Hồ sơ công ty',
                            children: <CompanyProfile />
                              
                        },
                    ]}
                />
            </Card>
        </MainLayout>
    );
}

export default Profile;
