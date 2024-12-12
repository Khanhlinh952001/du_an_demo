'use client'
import { useAuth } from "@/hooks/useAuth";
import { Card, Form, Input, Button, Space, Col, Row } from "antd";
import { useState } from "react";
import Image from "next/image";
import { User } from '@/types/User';

export default function PersonalProfile() {
    const { user, uploadUserProfile } = useAuth();
    const [isEditingPersonal, setIsEditingPersonal] = useState(false);
    const [form] = Form.useForm();

    const handlePersonalSave = async () => {
        try {
            const values = await form.validateFields();
            if (user) {
                const updatedUser: User = {
                    ...user,
                    displayName: values.displayName,
                    photoURL: values.photoURL || user.photoURL,
                };
                await uploadUserProfile(updatedUser);
                setIsEditingPersonal(false);
            }
        } catch (error) {
            console.error('Failed to save profile:', error);
        }
    };

    return    <Card bordered={false}>
    <Form layout="vertical" form={form}>
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
                            src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}`}
                            alt="Avatar"
                            width={80}
                            height={80}
                            style={{
                                borderRadius: '50%',
                                marginRight: '16px'
                            }}
                        />
                      <input type="file" />
                    </div>
                </Form.Item>
                <Form.Item name="password" label="Thay đổi mật khẩu">
                    <Input.Password placeholder="Nhập mật khẩu mới" />
                </Form.Item>
            </Col>
        </Row>
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
    </Form>
</Card>
}
