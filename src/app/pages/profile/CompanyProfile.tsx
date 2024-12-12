"use client"

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Form, Input } from "antd";
import { Card } from "antd";
import { Row } from "antd";
import { Col } from "antd";
import { useState } from "react";
import Image from "next/image";
import { Space } from "antd";
import { Button } from "antd";
export default function CompanyProfile() {
    const { user ,companyInfo } = useAuth();
    const isManager = user?.role === "Manage";
    const [isEditingCompany, setIsEditingCompany] = useState(false);
    const handleCompanySave = () => {
        // TODO: Implement save logic
        setIsEditingCompany(false);
    };
    return    <Row gutter={16}>
    <Col span={12}>
        <Card title="Thông tin công ty" bordered={false}>
            <Form layout="vertical">
                <Form.Item name="companyName" label="Company Name">
                    {!isEditingCompany ? (
                        <h1 className="border-b border-gray-300 pb-2">
                            {companyInfo?.companyName}
                        </h1>
                    ) : (
                        <Input 
                            placeholder="Company Name" 
                            defaultValue={companyInfo?.companyName}
                            className={companyInfo?.companyName ? 'text-black' : ''} 
                        />
                    )}
                </Form.Item>
                <Form.Item name="companyCode" label="Company Code">
                    <Input 
                        placeholder="VHA" 
                        defaultValue={companyInfo?.companyCode}
                        disabled={!isEditingCompany} 
                    />
                </Form.Item>
                <Form.Item name="bizLicenseNumber" label="Biz License Number">
                    <Input 
                        placeholder="Business License" 
                        defaultValue={companyInfo?.bizLicenseNumber}
                        disabled={!isEditingCompany} 
                    />
                </Form.Item>
                <Form.Item name="companyAddress" label="Address">
                    <Input 
                        placeholder="Address" 
                        defaultValue={companyInfo?.companyAddress}
                        disabled={!isEditingCompany} 
                    />
                </Form.Item>
                <Form.Item name="companyPhone" label="SĐT Công ty">
                    <Input 
                        placeholder="Phone Number" 
                        defaultValue={companyInfo?.companyPhone}
                        disabled={!isEditingCompany} 
                    />
                </Form.Item>
                <Form.Item name="companyEmail" label="Email Công ty">
                    <Input 
                        placeholder="Company Email" 
                        defaultValue={companyInfo?.companyEmail}
                        disabled={!isEditingCompany} 
                    />
                </Form.Item>
                <Form.Item name="representativeName" label="Tên người đại diện">
                    <Input 
                        placeholder="Representative Name" 
                        defaultValue={companyInfo?.representativeName}
                        disabled={!isEditingCompany} 
                    />
                </Form.Item>
               
            </Form>
        </Card>
    </Col>
    <Col span={12}>
        <Card title="Thông tin bổ sung" bordered={false}>
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
    {isManager && (
        <Col span={24}>
            <div className="flex justify-center mt-4">
                {!isEditingCompany ? (
                    <Button 
                        type="primary" 
                        onClick={() => setIsEditingCompany(true)}
                        style={{ padding: '0 30px' }}
                    >
                        Chỉnh sửa
                    </Button>
                ) : (
                    <Space>
                        <Button 
                            type="primary" 
                            onClick={handleCompanySave}
                            style={{ padding: '0 30px' }}
                        >
                            Lưu
                        </Button>
                        <Button 
                            onClick={() => setIsEditingCompany(false)}
                            style={{ padding: '0 30px' }}
                        >
                            Hủy
                        </Button>
                    </Space>
                )}
            </div>
        </Col>
    )}
</Row>;
}