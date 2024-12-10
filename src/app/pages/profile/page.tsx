"use client"
import MainLayout from "@/layout/MainLayout";
import { Button, Card, Col, Form, Input, Row, Space, Typography } from "antd";
import { SP } from "next/dist/shared/lib/utils";
import Image from 'next/image';

function Profile() {
    return (<MainLayout>
        <Card>
            <Space direction="horizontal">
            <Typography>
                Ho so cua toi 
            </Typography>
            <Button>
                di toi trang Admin
            </Button>
            </Space>
           
            <Row gutter={16}>
                <Col span={12} >
                    <Card title="Thong tin nguoi dung ">

                        <Form.Item
                            name="CompanyName"
                            label="Company Name"

                        >
                            <Input placeholder="Company Name" />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            label="Company Code"

                        >
                            <Input placeholder="VHA" />
                        </Form.Item>
                        <Form.Item
                            name="bizLicenseNumber"
                            label="Biz License Number"

                        >
                            <Input placeholder="232-01-42531" />
                        </Form.Item>
                        <Form.Item
                            name="address"
                            label="Address"

                        >
                            <Input placeholder="서울시 광진구 중곡동" />
                        </Form.Item>
                        <Form.Item
                            name="representativePhone"
                            label="SDT Nguoi dai dien"

                        >
                            <Input placeholder="010 2500 0935" />
                        </Form.Item>

                        <Form.Item
                            name="representativeName"
                            label="Ten nguoi dai dien"

                        >
                            <Input placeholder="NGUYEN VAN A" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"

                        >
                            <Input placeholder="exam@gmail.com" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="MAt khau "

                        >
                            <Input.Password placeholder="*****" />
                        </Form.Item>
                    </Card>
                </Col>
                <Col span={12} >
                    <Card title="* Thông tin bổ sung:">

                        <Form.Item
                            name="logo"
                            label="Company Logo"
                            style={{ marginBottom: 16 }}
                        >
                            <div >
                                <div className="flex">
                                    <Image
                                        width={80}
                                        height={80}
                                        src=""
                                        alt="Company Logo"
                                        style={{
                                            borderRadius: 8,
                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                        }}
                                    />
                                    <input type="file" />
                                </div>

                            </div>
                        </Form.Item>
                        <Form.Item
                            name="warehouseKrAddress"
                            label="Dia chi kho o han "

                        >
                            <Input placeholder=" warehouseKrAddress" />
                        </Form.Item>
                        <Form.Item
                            name="phoneKorea"
                            label="SDT o HAN"

                        >
                            <Space direction="horizontal">
                            <Input placeholder="010223123" />
                            <Input placeholder="010223123" />
                            </Space>
                            
                        </Form.Item>

                        <Form.Item
                            name="warehouseVnHanAddress"
                            label="Dia chi kho o Ha noi "

                        >
                            <Input placeholder=" warehouseVnHanAddress" />
                        </Form.Item>
                        <Form.Item
                            name="phoneVnHan"
                            label="SDT o Vn"

                        >
                            <Space direction="horizontal">
                            <Input placeholder="010223123" />
                            <Input placeholder="010223123" />
                            </Space>
                            
                        </Form.Item>

                        <Form.Item
                            name="warehouseVnHanAddress"
                            label="Dia chi kho o HCM "

                        >
                            <Input placeholder=" warehouseVnSgnAddress" />
                        </Form.Item>
                        <Form.Item
                            name="phoneVnSgn"
                            label="SDT o Vn"

                        >
                            <Space direction="horizontal">
                            <Input placeholder="010223123" />
                            <Input placeholder="010223123" />
                            </Space>
                            
                        </Form.Item>
                    </Card>
                </Col>
            </Row>

            <div className="flex justify-center mt-4">
                <Button>
                    Cap nhat 
                </Button>
            </div>
        </Card>
    </MainLayout>);
}

export default Profile;
