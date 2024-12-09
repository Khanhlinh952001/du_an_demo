import { PickupInfo } from '@/types/Pickup';
import { Modal, Form, Input, Row, Col, Card, Checkbox, Space, List, Typography, DatePicker, Select } from 'antd';
import { useEffect, useState } from 'react';
import { SearchOutlined, PhoneOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { senderMockData } from '@/mocks/senderMockData';
import dayjs from 'dayjs';
import { Sender } from '@/types/Sender';

interface PickupModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedSender?: PickupInfo;
    mode: 'create' | 'edit';
    onSuccess?: () => void;
}

export function PickupModal({ isOpen, onClose, selectedSender, mode, onSuccess }: PickupModalProps) {
    const [form] = Form.useForm();
    const [searchResults, setSearchResults] = useState<Sender[]>([]);

    const handleClose = () => {
        form.resetFields();
        onClose();
    };

    useEffect(() => {
        if (mode === 'edit' && selectedSender) {
            form.setFieldsValue({
                ...selectedSender,
                pickupDate: selectedSender.pickupDate ? dayjs(selectedSender.pickupDate) : null,
                scheduledTime: selectedSender.scheduledTime ? dayjs(selectedSender.scheduledTime) : null,
            });
        } else {
            form.resetFields();
        }
    }, [mode, selectedSender, form]);

    const handleNameSearch = (value: string) => {
        if (!value) {
            setSearchResults([]);
            return;
        }

        const results = senderMockData.filter(customer => 
            customer.name.toLowerCase().includes(value.toLowerCase()) ||
            customer.senderId.toLowerCase().includes(value.toLowerCase()) ||
            customer.phone.includes(value)
        );
        
        if (results.length === 0) {
            Modal.confirm({
                title: 'Không tìm thấy khách hàng',
                content: 'Bạn có muốn thêm khách hàng mới không?',
                okText: 'Thêm mới',
                cancelText: 'Hủy',
            });
        }
        setSearchResults(results);
    };

    const handleCustomerSelect = (senderId: string) => {
        const selected = searchResults.find(sender => sender.senderId === senderId);
        if (selected) {
            form.setFieldsValue({
                senderId: selected.senderId,
                senderName: selected.name,
                senderPhone: selected.phone,
                senderAddress: selected.address,
                senderContactChannels: selected.contactChannels
            });
            setSearchResults([]);
        }
    };

    return (
        <Modal
            title={mode === 'create' ? "Thêm yêu cầu Pickup" : "Thông tin Pickup"}
            open={isOpen}
            onCancel={handleClose}
            width={1000}
            onOk={() => {
                form.validateFields()
                    .then(values => {
                        const formData = {
                            ...values,
                            pickupDate: values.pickupDate?.toDate(),
                            scheduledTime: values.scheduledTime?.toDate(),
                            status: mode === 'create' ? 'pending' : values.status,
                            createdAt: mode === 'create' ? new Date() : values.createdAt,
                            updatedAt: new Date(),
                            createdBy: mode === 'create' ? 'ADMIN001' : values.createdBy,
                            updatedBy: 'ADMIN001',
                        };
                        console.log(formData);
                        onSuccess?.();
                        handleClose();
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form form={form} layout="vertical">
                <Row gutter={24}>
                    <Col span={12}>
                        <Card title="Thông tin người gửi">
                            <Space.Compact block>
                                <Form.Item style={{ flex: 1, marginBottom: 8 }}>
                                    <Input
                                        placeholder="Tìm người gửi..."
                                        onChange={(e) => handleNameSearch(e.target.value)}
                                        allowClear
                                        prefix={<SearchOutlined />}
                                    />
                                </Form.Item>
                            </Space.Compact>

                            <Form.Item name="senderId" hidden>
                                <Input />
                            </Form.Item>

                            <Form.Item label="Tên người gửi" name="senderName" rules={[{ required: true }]}>
                                <Input prefix={<UserOutlined />} />
                            </Form.Item>

                            <Form.Item label="Số điện thoại" name="senderPhone" rules={[{ required: true }]}>
                                <Input prefix={<PhoneOutlined />} />
                            </Form.Item>

                            <Form.Item label="Địa chỉ" name="senderAddress" rules={[{ required: true }]}>
                                <Input prefix={<HomeOutlined />} />
                            </Form.Item>

                            <Form.Item label="Kênh liên hệ" name="senderContactChannels">
                                <Checkbox.Group>
                                    <Space>
                                        <Checkbox value="Facebook">Facebook</Checkbox>
                                        <Checkbox value="Zalo">Zalo</Checkbox>
                                        <Checkbox value="KakaoTalk">KakaoTalk</Checkbox>
                                    </Space>
                                </Checkbox.Group>
                            </Form.Item>

                            {searchResults.length > 0 && (
                                <List
                                    size="small"
                                    dataSource={searchResults}
                                    renderItem={(item) => (
                                        <List.Item
                                            className="hover:bg-blue-50 cursor-pointer"
                                            onClick={() => handleCustomerSelect(item.senderId)}
                                        >
                                            <List.Item.Meta
                                                title={item.name}
                                                description={
                                                    <Space direction="vertical" size="small">
                                                        <Typography.Text type="secondary">
                                                            <PhoneOutlined /> {item.phone}
                                                        </Typography.Text>
                                                        <Typography.Text type="secondary" ellipsis>
                                                            <HomeOutlined /> {item.address}
                                                        </Typography.Text>
                                                    </Space>
                                                }
                                            />
                                        </List.Item>
                                    )}
                                />
                            )}
                        </Card>
                    </Col>

                    <Col span={12}>
                        <Card title="Thông tin pickup">
                            <Form.Item label="Số kiện" name="packageCount" rules={[{ required: true }]}>
                                <Input type="number" />
                            </Form.Item>

                            <Form.Item label="Địa chỉ pickup" name="pickupAddress" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item label="SĐT pickup" name="pickupPhone" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item label="Ngày lấy hàng" name="pickupDate" rules={[{ required: true }]}>
                                <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item label="Khung giờ" name="preferredTimeSlot">
                                <Select>
                                    <Select.Option value="9:00-12:00">9:00-12:00</Select.Option>
                                    <Select.Option value="14:00-17:00">14:00-17:00</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item label="Ghi chú đặc biệt" name="specialInstructions">
                                <Input.TextArea />
                            </Form.Item>

                            <Form.Item label="Phí pickup" name="pickupFee">
                                <Input type="number" addonAfter="WON" />
                            </Form.Item>

                           
                        </Card>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
} 
