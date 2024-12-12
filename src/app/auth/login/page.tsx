'use client'
import React from 'react';
import { Form, Input, Button, notification } from 'antd';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Loading from '@/app/loading';
function Login() {
    const router = useRouter();
    const { loginWithEmail ,loading } = useAuth();
    const onFinish = async (values: any) => {
      await loginWithEmail(values.username, values.password);
      router.push('/pages/profile');
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    if(loading){
      return <Loading/>;
    }

    return (
        <div style={{ 
            display: 'flex', 
            height: '100vh', 
            backgroundColor: '#f0f2f5',
        }}>
            <div className='w-1/3' style={{ 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f0f2f5',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                padding: '40px',
            }}>
                <img src="https://bavik.kr/wp-content/uploads/2024/01/9.png" alt="Logo" style={{ width: '100px', marginBottom: '20px', position: 'absolute', top: '20px', left: '40px' }}  />
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    style={{ width: 300, backgroundColor: 'white' ,padding: '20px' ,borderRadius: '10px'}}
                >
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Đăng Nhập</h2>
                    <Form.Item
                        label="Email"
                        name="username"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Login
                        </Button>
                    </Form.Item>

                    <div style={{ justifyContent: 'space-between', marginTop: '10px' }}>
                        <p className="flex justify-center">Bạn chưa có tài khoản? <a href="/auth/register" style={{ color: '#1890ff' }}>Đăng ký</a></p>
                        <p className="flex justify-center"><a href="/forgot-password" style={{ color: '#1890ff' }}>Quên mật khẩu?</a></p>
                    </div>
                </Form>
            </div>
            <div className='w-2/3' style={{ 
                backgroundImage: 'url(https://hungalogistics.com/userfile/news/main/2022_12_22_14_19_19_62.jpg)',
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                filter: 'hue-rotate(0deg) saturate(100%) brightness(100%)',
            }} />
        </div>
    );
}

export default Login;
