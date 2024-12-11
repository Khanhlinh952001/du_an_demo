"use client"
import MainLayout from "@/layout/MainLayout";
import { Button, Card, Col, Form, Input, Row, Space, Typography } from "antd";
import Image from 'next/image';
import Link from "next/link";

function Profile() {
    return (
        <MainLayout>
            <Card style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Space direction="horizontal" style={{ marginBottom: '20px' }}>
                    <Typography.Title level={3}>Hồ sơ Chung</Typography.Title>
                    <Link href="/pages/admin">
                    <Button type="primary" style={{ marginLeft: 'auto' }}>
                        Đi tới trang Admin
                    </Button>
                    </Link>
                    
                </Space>

                <Row gutter={16}>
                    <Col span={12}>
                        <Card title="Thông tin người dùng" bordered={false} style={{ marginBottom: '20px' }}>
                            <Form layout="vertical">
                                <Form.Item name="CompanyName" label="Company Name">
                                    <Input placeholder="Company Name" disabled />
                                </Form.Item>
                                <Form.Item name="code" label="Company Code">
                                    <Input placeholder="VHA" disabled />
                                </Form.Item>
                                <Form.Item name="bizLicenseNumber" label="Biz License Number">
                                    <Input placeholder="232-01-42531" disabled />
                                </Form.Item>
                                <Form.Item name="address" label="Address">
                                    <Input placeholder="서울시 광진구 중곡동" disabled />
                                </Form.Item>
                                <Form.Item name="representativePhone" label="SĐT Người đại diện">
                                    <Input placeholder="010 2500 0935" />
                                </Form.Item>
                                <Form.Item name="representativeName" label="Tên người đại diện">
                                    <Input placeholder="NGUYEN VAN A" />
                                </Form.Item>

                                <Card title="Thông tin cá nhân" bordered={false} style={{ marginTop: '20px' }}>
                                   <Form.Item name="email" label="Email">
                                    <Input placeholder="exam@gmail.com" />
                                </Form.Item>
                                <Form.Item name="password" label="Mật khẩu">
                                    <Input.Password placeholder="*****" />
                                </Form.Item>  
                                <div className="flex justify-center mt-4">
                    <Button type="primary" style={{ padding: '0 30px' }}>
                        Cập nhật
                    </Button>
                </div>
                                </Card>
                               
                            </Form>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="* Thông tin bổ sung:" bordered={false} style={{ marginBottom: '20px' }}>
                            <Form layout="vertical">
                                <Form.Item name="logo" label="Company Logo" style={{ marginBottom: 16 }}>
                                    <div className="flex">
                                        <Image
                                            width={80}
                                            height={80}
                                            src=""
                                            alt="Company Logo"
                                            style={{
                                                borderRadius: 8,
                                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                                marginRight: '10px'
                                            }}
                                        />
                                        <input type="file" />
                                    </div>
                                </Form.Item>
                                <Form.Item name="warehouseKrAddress" label="Địa chỉ kho ở Hàn">
                                    <Input placeholder="warehouseKrAddress" disabled />
                                </Form.Item>
                                <Form.Item name="phoneKorea" label="SĐT ở Hàn">
                                    <Space direction="horizontal">
                                        <Input placeholder="010223123" disabled />
                                        <Input placeholder="010223123" disabled />
                                    </Space>
                                </Form.Item>
                                <Form.Item name="warehouseVnHanAddress" label="Địa chỉ kho ở Hà Nội">
                                    <Input placeholder="warehouseVnHanAddress" disabled />
                                </Form.Item>
                                <Form.Item name="phoneVnHan" label="SĐT ở VN">
                                    <Space direction="horizontal">
                                        <Input placeholder="010223123" disabled />
                                        <Input placeholder="010223123" disabled />
                                    </Space>
                                </Form.Item>
                                <Form.Item name="warehouseVnSgnAddress" label="Địa chỉ kho ở HCM">
                                    <Input placeholder="warehouseVnSgnAddress" disabled />
                                </Form.Item>
                                <Form.Item name="phoneVnSgn" label="SĐT ở VN">
                                    <Space direction="horizontal">
                                        <Input placeholder="010223123" disabled />
                                        <Input placeholder="010223123" disabled />
                                    </Space>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>

              
            </Card>
        </MainLayout>
    );
}

export default Profile;
