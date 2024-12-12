"use client"
import MainLayout from "@/layout/MainLayout";
import { Button, Card, Col, Form, Input, Row, Space, Typography, Tabs } from "antd";
import Image from 'next/image';
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import CompanyProfile from "./CompanyProfile";

function Profile() {
    const { user ,companyInfo } = useAuth();
    console.log(companyInfo)
    const isManager = user?.role === "Manage";
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
                            label: 'Hồ sơ công ty',
                            children: <CompanyProfile />
                              
                    ,
                        },
                        {
                            key: '2',
                            label: 'Hồ sơ cá nhân',
                            children: (
                                <Card bordered={false}>
                                    <Form layout="vertical">
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item name="displayName" label="Họ và tên">
                                                    {!isEditingPersonal ? (
                                                        <h1 className="border-b border-gray-300 pb-2">
                                                            {user?.displayName}
                                                        </h1>
                                                    ) : (
                                                        <Input 
                                                            placeholder="Họ và tên" 
                                                            defaultValue={user?.displayName}
                                                        />
                                                    )}
                                                </Form.Item>
                                                <Form.Item name="email" label="Email">
                                                    {!isEditingPersonal ? (
                                                        <h1 className="border-b border-gray-300 pb-2">
                                                            {user?.email}
                                                        </h1>
                                                    ) : (
                                                        <Input 
                                                            placeholder="example@gmail.com" 
                                                            defaultValue={user?.email}
                                                            disabled
                                                        />
                                                    )}
                                                </Form.Item>
                                                <Form.Item name="role" label="Vai trò">
                                                    {!isEditingPersonal ? (
                                                        <h1 className="border-b border-gray-300 pb-2">
                                                            {user?.role}
                                                        </h1>
                                                    ) : (
                                                        <Input 
                                                            placeholder="Vai trò" 
                                                            defaultValue={user?.role}
                                                            disabled
                                                        />
                                                    )}
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name="photoURL" label="Ảnh đại diện">
                                                    <div className="flex items-center">
                                                        <Image
                                                            src={user?.photoURL || "/default-avatar.png"}
                                                            alt="Avatar"
                                                            width={80}
                                                            height={80}
                                                            style={{
                                                                borderRadius: '50%',
                                                                marginRight: '16px'
                                                            }}
                                                        />
                                                        {isManager && <input type="file" />}
                                                    </div>
                                                </Form.Item>
                                                <Form.Item name="password" label="Mật khẩu">
                                                    <Input.Password placeholder="Nhập mật khẩu mới" disabled={!isManager} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        {isManager && (
                                            <div className="flex justify-center mt-4">
                                                {!isEditingPersonal ? (
                                                    <Button 
                                                        type="primary" 
                                                        onClick={() => setIsEditingPersonal(true)}
                                                        style={{ padding: '0 30px' }}
                                                    >
                                                        Chỉnh sửa
                                                    </Button>
                                                ) : (
                                                    <Space>
                                                        <Button 
                                                            type="primary" 
                                                            onClick={handlePersonalSave}
                                                            style={{ padding: '0 30px' }}
                                                        >
                                                            Lưu
                                                        </Button>
                                                        <Button 
                                                            onClick={() => setIsEditingPersonal(false)}
                                                            style={{ padding: '0 30px' }}
                                                        >
                                                            Hủy
                                                        </Button>
                                                    </Space>
                                                )}
                                            </div>
                                        )}
                                    </Form>
                                </Card>
                            ),
                        },
                    ]}
                />
            </Card>
        </MainLayout>
    );
}

export default Profile;
