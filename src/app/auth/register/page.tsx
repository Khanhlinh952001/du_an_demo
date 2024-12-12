'use client'
import React from 'react';
import { Form, Input, Button, Row, Col, Typography, notification, Alert } from 'antd';
import Link from 'next/link';
const { Title } = Typography;
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
function Register() {
    const router = useRouter();
    const { registerWithEmail, loading } = useAuth();
    const onFinish = async (values: any) => {
        const formData = {
            email: values.email,
            password: values.password,
            companyName: values.companyName,
            companyCode: values.companyCode,
            bizLicenseNumber: values.bizLicenseNumber,
            address: values.address,
            phone: values.phone,
            representativeName: values.representativeName,
        }
        console.log(formData);
        // Alert(values)
        try {
            await registerWithEmail(values.email, values.password, values.companyName, values.companyCode, values.bizLicenseNumber, values.address, values.phone, values.representativeName);
            router.push('/pages/search');
        } catch (error) {
            console.error('Registration error:', error);
        }
       
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Col span={8}>
                <div style={{ padding: '24px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Title level={2} style={{ textAlign: 'center' }}>Register</Title>
                    <Form
                        name="register"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="vertical"
                    >
                        <Form.Item
                            label="CompanyName"
                            name="companyName"
                            rules={[{ required: true, message: 'Please input your CompanyName!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="CompanyCode"
                            name="companyCode"
                            rules={[{ required: true, message: 'Please input your CompanyCode!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Biz license number"
                            name="bizLicenseNumber"
                            rules={[{ required: true, message: 'Please input your BizLicenseNumber!' }]}
                        >
                            <Input />
                        </Form.Item>
                       

                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Please input your Address!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your Phone!' }]}
                        >
                            <Input />
                        </Form.Item>
                        {/* <Form.Item
                            label="Upload biz license file(jpg, png):
"
                            name="bizLicenseFile"
                            rules={[{ required: true, message: 'Please input your BizLicenseFile!' }]}
                        >
                            <Input type='file' />
                        </Form.Item> */}
                        <Form.Item
                            label="representativeName"
                            name="representativeName"
                            rules={[{ required: true, message: 'Please input your Name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                        >
                            <Input type='email' />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Confirm Password"
                            name="ConfirmPassword"
                            rules={[{ required: true, message: 'Please input your ConfirmPassword!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                {loading ? 'Registering...' : 'Register'}
                            </Button>
                            <Link className='flex justify-center mt-2 text-blue-500' href="/auth/login">
                                Already have an account?
                            </Link>

                        </Form.Item>
                    </Form>
                </div>
            </Col>
        </Row>
    );
}

export default Register;
