"use client"

import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Form, Input, InputNumber, Spin, Tag } from "antd";
import { Card } from "antd";
import { Row } from "antd";
import { Col } from "antd";
import { useState } from "react";
import Image from "next/image";
import { Space } from "antd";
import { Button } from "antd";
import { ROLES } from "@/constants";
import { useCompany } from '@/hooks/useCompany';
import { message } from 'antd';


export default function CompanyProfile() {
    const { user, companyInfo ,loading } = useAuth();
    const { updateCompany } = useCompany();
    const [form] = Form.useForm();
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const isManager = user?.role == ROLES.MANAGER;
    const [isEditingCompany, setIsEditingCompany] = useState(false);

    // Thêm useEffect để khởi tạo giá trị form
    useEffect(() => {
        if (companyInfo) {
            form.setFieldsValue({
                // Thông tin cơ bản
                companyName: companyInfo.companyName,
                companyCode: companyInfo.companyCode,
                bizLicenseNumber: companyInfo.bizLicenseNumber,
                companyAddress: companyInfo.companyAddress,
                companyPhone: companyInfo.companyPhone,
                companyEmail: companyInfo.companyEmail,
                representativeName: companyInfo.representativeName,

                // Thông tin kho
                warehouseKrAddress: companyInfo.warehouseKrAddress || '',
                warehouseVnHanAddress: companyInfo.warehouseVnHanAddress || '',
                warehouseVnSgnAddress: companyInfo.warehouseVnSgnAddress || '',

                // Số điện thoại
                phoneKorea: companyInfo.phoneKorea || ['', ''],
                phoneVnHan: companyInfo.phoneVnHan || ['', ''],
                phoneVnSgn: companyInfo.phoneVnSgn || ['', ''],

                // Thông tin giá
                sgnPrice: companyInfo.sgnPrice || 0,
                hanPrice: companyInfo.hanPrice || 0,
                seaPrice: companyInfo.seaPrice || 0,
                vnToKrPriceInKRW: companyInfo.vnToKrPriceInKRW || 0,
                vnToKrPriceInVND: companyInfo.vnToKrPriceInVND || 0,
                exchangeRate: companyInfo.exchangeRate || 0,
            });
        }
    }, [companyInfo, form]);

    const handleCompanySave = async () => {
        try {
            const values = await form.validateFields();
            const values1 = await form1.validateFields();
            const values2 = await form2.validateFields();
            if (!companyInfo?.companyId) {
                message.error('Không tìm thấy ID công ty');
                return;
            }

            // Log để debug
            console.log('Form values before update:', values);

            const updateData = {
                companyId: companyInfo.companyId,
                // Thông tin cơ bản
                companyName: values.companyName,
                companyCode: values.companyCode,
                bizLicenseNumber: values.bizLicenseNumber,
                companyAddress: values.companyAddress,
                companyPhone: values.companyPhone,
                companyEmail: values.companyEmail,
                representativeName: values.representativeName,
                logo: values.logo || companyInfo?.logo,
                warehouseKrAddress: values1.warehouseKrAddress,
                phoneKorea: [values1.phoneKorea1 || companyInfo?.phoneKorea?.[0], values1.phoneKorea2 || companyInfo?.phoneKorea?.[1]],
                phoneVnHan: [values1.phoneVnHan1 || companyInfo?.phoneVnHan?.[0], values1.phoneVnHan2 || companyInfo?.phoneVnHan?.[1]],
                phoneVnSgn: [values1.phoneVnSgn1 || companyInfo?.phoneVnSgn?.[0], values1.phoneVnSgn2 || companyInfo?.phoneVnSgn?.[1]],
                warehouseVnHanAddress: values1.warehouseVnHanAddress || companyInfo?.warehouseVnHanAddress,
                warehouseVnSgnAddress: values1.warehouseVnSgnAddress || companyInfo?.warehouseVnSgnAddress,
                sgnPrice: values2.sgnPrice || companyInfo?.sgnPrice,
                hanPrice: values2.hanPrice || companyInfo?.hanPrice,
                seaPrice: values2.seaPrice || companyInfo?.seaPrice,
                vnToKrPriceInKRW: values2.vnToKrPriceInKRW || companyInfo?.vnToKrPriceInKRW,
                vnToKrPriceInVND: values2.vnToKrPriceInVND || companyInfo?.vnToKrPriceInVND,
                exchangeRate: values2.exchangeRate || companyInfo?.exchangeRate,
                serviceFee: values2.serviceFee || companyInfo?.serviceFee,
            };

            // Log để debug
            console.log('Update data:', updateData);

            message.loading({ content: 'Đang cập nhật thông tin...', key: 'companyUpdate' });

            const success = await updateCompany(companyInfo.companyId, updateData);

            if (success) {
                message.success({
                    content: 'Cập nhật thông tin thành công',
                    key: 'companyUpdate'
                });
                setIsEditingCompany(false);
            } else {
                message.error({
                    content: 'Cập nhật thông tin thất bại',
                    key: 'companyUpdate'
                });
            }
        } catch (error) {
            console.error('Error details:', error);
            message.error({
                content: 'Đã xảy ra lỗi khi cập nhật thông tin',
                key: 'companyUpdate'
            });
        }
    };



    return<Spin spinning={loading} tip="Loading..."> <Row gutter={16}>
        
        <Col span={12}>
            <Card title="Thông tin công ty" bordered={false}>
                <Form form={form} layout="vertical">
                    <Form.Item name="companyName" label="Company Name">
                        {!isEditingCompany ? (
                            <h1 className="border-b font-bold border-gray-300 pb-2">
                                {companyInfo?.companyName}
                            </h1>
                        ) : (
                            <Input
                                placeholder="Company Name"
                                defaultValue={companyInfo?.companyName}
                                name="companyName"
                            />
                        )}
                    </Form.Item>
                    <Form.Item name="companyCode" label="Company Code">
                        {!isEditingCompany ? (
                            <h1 className="border-b font-bold border-gray-300 pb-2">
                                {companyInfo?.companyCode}
                            </h1>
                        ) : (
                            <Input
                                placeholder="VHA"
                                defaultValue={companyInfo?.companyCode}
                                name="companyCode"
                            />
                        )}
                    </Form.Item>
                    <Form.Item name="bizLicenseNumber" label="Biz License Number">
                        {!isEditingCompany ? (
                            <h1 className="border-b font-bold border-gray-300 pb-2">
                                {companyInfo?.bizLicenseNumber}
                            </h1>
                        ) : (
                            <Input
                                placeholder="Business License"
                                defaultValue={companyInfo?.bizLicenseNumber}
                                name="bizLicenseNumber"
                            />
                        )}
                    </Form.Item>
                    <Form.Item name="companyAddress" label="Address">
                        {!isEditingCompany ? (
                            <h1 className="border-b font-bold border-gray-300 pb-2">
                                {companyInfo?.companyAddress}
                            </h1>
                        ) : (
                            <Input
                                placeholder="Address"
                                defaultValue={companyInfo?.companyAddress}
                                name="companyAddress"
                            />
                        )}
                    </Form.Item>
                    <Form.Item name="companyPhone" label="SĐT Công ty">
                        {!isEditingCompany ? (
                            <h1 className="border-b font-bold border-gray-300 pb-2">
                                {companyInfo?.companyPhone}
                            </h1>
                        ) : (
                            <Input
                                placeholder="Phone Number"
                                defaultValue={companyInfo?.companyPhone}
                                name="companyPhone"
                            />
                        )}
                    </Form.Item>
                    <Form.Item name="companyEmail" label="Email Công ty">
                        {!isEditingCompany ? (
                            <h1 className="border-b font-bold border-gray-300 pb-2">
                                {companyInfo?.companyEmail}
                            </h1>
                        ) : (
                            <Input
                                placeholder="Company Email"
                                defaultValue={companyInfo?.companyEmail}
                                name="companyEmail"
                            />
                        )}
                    </Form.Item>
                    <Form.Item name="representativeName" label="Tên người đại diện">
                        {!isEditingCompany ? (
                            <h1 className="border-b font-bold border-gray-300 pb-2">
                                {companyInfo?.representativeName}
                            </h1>
                        ) : (
                            <Input
                                placeholder="Representative Name"
                                defaultValue={companyInfo?.representativeName}
                                name="representativeName"
                            />
                        )}
                    </Form.Item>

                </Form>
            </Card>
            <Card title="Thông tin giá" className="mt-4">
                    <Form form={form2}>
                <Row gutter={16}>

                    <Col span={12}>
                    <Card title="Đơn giá đi VN">
                        <Form.Item label="Đơn giá đi SGN (Sài Gòn)">
                            {!isEditingCompany ? (
                                <div className="border-b font-bold border-gray-300 pb-2">
                                    {companyInfo?.sgnPrice?.toLocaleString()} VND
                                </div>
                            ) : (
                                <Form.Item name="sgnPrice">
                                    <InputNumber
                                        className="w-full"
                                        placeholder="Nhập đơn giá"
                                        defaultValue={companyInfo?.sgnPrice || 0}
                                    />
                                </Form.Item>
                            )}
                        </Form.Item>
                        <Form.Item label="Đơn giá đi HAN (Hà Nội)">
                            {!isEditingCompany ? (
                                <h1 className="border-b font-bold border-gray-300 pb-2">
                                    {companyInfo?.hanPrice?.toLocaleString()} VND
                                </h1>
                            ) : (
                                <Form.Item name="hanPrice">
                                    <InputNumber
                                        className="w-full"
                                        placeholder="Đơn giá HAN"
                                        defaultValue={companyInfo?.hanPrice || 0}
                                        disabled={!isEditingCompany}
                                    />
                                </Form.Item>
                            )}
                        </Form.Item>
                        <Form.Item label="Đơn giá đường Biển ">
                            {!isEditingCompany ? (
                                <h1 className="border-b font-bold border-gray-300 pb-2">
                                    {companyInfo?.seaPrice?.toLocaleString()} VND
                                </h1>
                            ) : (
                                <Form.Item name="seaPrice">
                                    <InputNumber
                                        className="w-full"
                                        placeholder="Đơn giá SEA"
                                        defaultValue={companyInfo?.seaPrice || 0}
                                        disabled={!isEditingCompany}
                                    />
                                </Form.Item>
                            )}
                        </Form.Item>

                    </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="Đơn giá đi Hàn">
                            <Form.Item label="Đơn giá KRW (Hàn Quốc)">
                            {!isEditingCompany ? (
                                <h1 className="border-b border-gray-300 pb-2">
                                    {companyInfo?.vnToKrPriceInKRW?.toLocaleString()} KRW
                                </h1>
                            ) : (
                                <Form.Item name="vnToKrPriceInKRW">
                                    <InputNumber
                                        className="w-full"
                                        placeholder="Đơn giá KRW"
                                        name="vnToKrPriceInKRW"
                                        defaultValue={companyInfo?.vnToKrPriceInKRW || 0}
                                    />
                                </Form.Item>
                            )}
                        </Form.Item>
                        <Form.Item label="Đơn giá VND (Việt Nam)">
                            {!isEditingCompany ? (
                                <h1 className="border-b border-gray-300 pb-2">
                                    {companyInfo?.vnToKrPriceInVND?.toLocaleString()} VND
                                </h1>
                            ) : (
                                <Form.Item name="vnToKrPriceInVND">
                                    <InputNumber
                                        className="w-full"
                                        placeholder="Đơn giá VND"
                                        name="vnToKrPriceInVND"
                                        defaultValue={companyInfo?.vnToKrPriceInVND || 0}
                                        disabled={!isEditingCompany}
                                    />
                                </Form.Item>
                            )}
                        </Form.Item>
                        <Form.Item label="Tỷ giá">
                            {!isEditingCompany ? (
                                <h1 className="border-b border-gray-300 pb-2">
                                    {companyInfo?.exchangeRate?.toLocaleString()}
                                </h1>
                            ) : (
                                <Form.Item name="exchangeRate">
                                    <InputNumber
                                        className="w-full"
                                        placeholder="Tỷ giá"
                                        name="exchangeRate"
                                        defaultValue={companyInfo?.exchangeRate || 0}
                                    />
                                </Form.Item>
                            )}
                        </Form.Item>
                        <Form.Item name="serviceFee" label="Công mua">
                            {!isEditingCompany ? (
                                <h1 className="border-b font-bold border-gray-300 pb-2">
                                    {companyInfo?.serviceFee} %
                                </h1>
                            ) : (
                                <Form.Item name="serviceFee">
                                    <InputNumber
                                        className="w-full"
                                        placeholder="Công mua"
                                        name="serviceFee"
                                        defaultValue={companyInfo?.serviceFee || 0}
                                    />
                                </Form.Item>
                            )}
                        </Form.Item>
                        </Card>
                    </Col>
                </Row>
                    </Form>

            </Card>
        </Col>
        <Col span={12}>
            <Card title="Thông tin bổ sung" bordered={false}>
                <Form layout="vertical" form={form1}>
                    <Form.Item name="logo" label="Company Logo" style={{ marginBottom: 16 }}>
                        <div className="flex">
                            <Image
                                width={80}
                                height={80}
                                src={companyInfo?.logo || ""}
                                alt="Company Logo"
                                style={{
                                    borderRadius: 8,
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    marginRight: '10px'
                                }}
                            />
                            <input type="file" name="logo" />
                        </div>
                    </Form.Item>
                    <Card title="Thông tin kho Hàn Quốc">
                        <Form.Item name="warehouseKrAddress" label="Địa chỉ kho ở Hàn">
                            {!isEditingCompany ? (
                                <h1 className="border-b font-bold border-gray-300 pb-2">
                                    {companyInfo?.warehouseKrAddress}
                                </h1>
                            ) : (
                                <Input
                                    defaultValue={companyInfo?.warehouseKrAddress}
                                    placeholder="Nhập địa chỉ kho ở Hàn Quốc"
                                    name="warehouseKrAddress"
                                />
                            )}
                        </Form.Item>
                        <Form.Item name="phoneKorea" label="SĐT ở Hàn">
                            <Space direction="horizontal" className="w-full">
                                {!isEditingCompany ? (
                                    <h1 className="border-b border-gray-300 w-full   pb-2 space-x-4">
                                        <Tag color="blue" className="text-black">{companyInfo?.phoneKorea?.[0]} </Tag>
                                        <Tag color="blue" className="text-black">{companyInfo?.phoneKorea?.[1]} </Tag>
                                    </h1>
                                ) : (
                                    <Space direction="horizontal">
                                        <Form.Item name="phoneKorea1">
                                            <Input
                                                disabled={!isEditingCompany}
                                                defaultValue={companyInfo?.phoneKorea?.[0]}
                                                placeholder="Nhập số điện thoại 1"
                                            />
                                        </Form.Item>
                                        <Form.Item name="phoneKorea2">
                                            <Input
                                                disabled={!isEditingCompany}
                                                placeholder="Nhập số điện thoại 2"
                                                defaultValue={companyInfo?.phoneKorea?.[1]}
                                            />
                                        </Form.Item>
                                    </Space>
                                )}
                            </Space>
                        </Form.Item>
                    </Card>

                    <Card title="Thông tin kho Hà Nội" className="mt-4">

                        <Form.Item label="Địa chỉ kho ở Hà Nội">
                            {!isEditingCompany ? (
                                <h1 className="border-b font-bold border-gray-300 pb-2">
                                    {companyInfo?.warehouseVnHanAddress}
                                </h1>
                            ) : (
                                <Form.Item name="warehouseVnHanAddress">
                                    <Input.TextArea placeholder="Nhập địa chỉ kho ở Hà Nội" defaultValue={companyInfo?.warehouseVnHanAddress} />
                                </Form.Item>
                            )}
                        </Form.Item>

                        <Form.Item name="phoneVnHan" label="SĐT ở Hà Nội">
                            {!isEditingCompany ? (
                                <h1 className="border-b border-gray-300 w-full   pb-2 space-x-4">
                                    <Tag color="blue" className="text-black">{companyInfo?.phoneVnHan?.[0]} </Tag>
                                    <Tag color="blue" className="text-black">{companyInfo?.phoneVnHan?.[1]} </Tag>
                                </h1>
                            ) : (
                                <Space direction="horizontal">
                                    <Form.Item name="phoneVnHan1">
                                        <Input
                                            disabled={!isEditingCompany}
                                            placeholder="Nhập số điện thoại 1"
                                            defaultValue={companyInfo?.phoneVnHan?.[0]}
                                            />
                                    </Form.Item>
                                    <Form.Item name="phoneVnHan2">
                                        <Input
                                            disabled={!isEditingCompany}
                                            placeholder="Nhập số điện thoại 2"
                                            defaultValue={companyInfo?.phoneVnHan?.[1]}
                                        />
                                    </Form.Item>
                                </Space>
                            )
                            }
                        </Form.Item>
                    </Card>
                    <Card title="Thông tin kho HCM" className="mt-4">
                        <Form.Item name="warehouseVnSgnAddress" label="Địa chỉ kho ở HCM">
                            {!isEditingCompany ? (
                                <h1 className="border-b font-bold border-gray-300 pb-2">
                                    {companyInfo?.warehouseVnSgnAddress}
                                </h1>
                            ) : (
                                <Form.Item name="warehouseVnSgnAddress">
                                    <Input.TextArea
                                        placeholder="Nhập địa chỉ kho ở HCM"
                                        defaultValue={companyInfo?.warehouseVnSgnAddress}
                                    />
                                </Form.Item>
                            )}
                        </Form.Item>
                        <Form.Item name="phoneVnSgn" label="SĐT ở VN">
                            <Space direction="horizontal">
                                {!isEditingCompany ? (
                                    <h1 className="border-b border-gray-300 pb-2">
                                        <Tag color="blue" className="text-black">{companyInfo?.phoneVnSgn?.[0]} </Tag>
                                        <Tag color="blue" className="text-black">{companyInfo?.phoneVnSgn?.[1]} </Tag>
                                    </h1>
                                ) : (
                                    <Space direction="horizontal">
                                        <Form.Item name="phoneVnSgn1">
                                            <Input
                                                placeholder="Nhập số điện thoại 1"
                                                name="phoneVnSgn1"
                                                defaultValue={companyInfo?.phoneVnSgn?.[0]}
                                            />
                                        </Form.Item>
                                        <Form.Item name="phoneVnSgn2">
                                            <Input
                                                placeholder="Nhập số điện thoại 2"
                                                name="phoneVnSgn2"
                                                defaultValue={companyInfo?.phoneVnSgn?.[1]}
                                            />
                                        </Form.Item>
                                    </Space>
                                )}
                            </Space>
                        </Form.Item>
                    </Card>
                </Form>
            </Card>
        </Col>
        <Col span={12}>

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
   
    </Row>
    </Spin>
    ;
}
