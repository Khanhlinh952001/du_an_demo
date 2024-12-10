"use client"
import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, DatePicker, Select, Row, Col, Card, Space, Checkbox, Button, Table, Tag } from 'antd';
import type { Sender } from '@/types/Sender';
import dayjs from 'dayjs';
import { FacebookOutlined, MessageFilled, UserOutlined, PhoneOutlined, EnvironmentOutlined, CalendarOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { SiZalo } from 'react-icons/si';
import AddRecipientModal from './AddRecipientModal';
import { getRecipientsBySenderId } from '@/mocks/recipientMockData';
import RecipientList from '../recipients/RecipientList';
interface AddSenderModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: Sender) => void;
  initialData?: Sender;
  mode?: 'add' | 'edit';
}

const AddSenderModal: React.FC<AddSenderModalProps> = ({ open, onCancel, onSubmit, initialData, mode = 'add' }) => {
  const [form] = Form.useForm();
  const [receivers, setReceivers] = useState<any[]>([]);
  const [isRecipientModalOpen, setIsRecipientModalOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null);

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      form.setFieldsValue({
        ...initialData,
        joinDate: initialData.joinDate ? dayjs(initialData.joinDate) : null,
      });
    }
  }, [initialData, form, mode]);

  useEffect(() => {
    const senderId = form.getFieldValue('senderId');
    if (senderId) {
      const existingRecipients = getRecipientsBySenderId(senderId);
      setReceivers(existingRecipients);
    }
  }, [form.getFieldValue('senderId')]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const contactChannels = values.contactChannels || [];

      if (contactChannels.length === 0) {
        throw new Error('Vui lòng chọn ít nhất một kênh liên hệ');
      }

      onSubmit({
        ...values,
        joinDate: values.joinDate?.toISOString(),
        registerDate: new Date().toISOString(),
      });
      form.resetFields();
    } catch (error) {
      if (error instanceof Error) {
        Modal.error({
          title: 'Lỗi',
          content: error.message,
        });
      }
      console.error('Validation failed:', error);
    }
  };

  const handleRecipientSubmit = (values: any) => {
    setReceivers([...receivers, values]);
    setIsRecipientModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setReceivers([]);
    setSelectedRecipient(null);
    onCancel();
  };

  return (
    <Modal
      title={mode === 'add' ? "Thêm người gửi mới" : "Chỉnh sửa người gửi"}
      open={open}
      onCancel={handleCancel}
      onOk={handleSubmit}
      width={1200}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          contactChannel: 'Facebook'
        }}
        style={{ padding: '20px' }}
      >
        <Row gutter={16} >
          <Col span={12}>
            <Card title="Thông tin người gửi" style={{ marginBottom: '24px', height: '400px' }}> 
              <Form.Item
              name="senderId"
              label="Mã khách hàng"

            >
              <Input placeholder="Nhập mã khách hàng" disabled />
            </Form.Item>
              <Space style={{ width: '100%' }} direction="horizontal" size="small">
                <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
                <Form.Item name="name" label="Tên khách hàng" rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}>
                  <Input placeholder="Nhập tên khách hàng" />
                </Form.Item>
              </Space>
              <Form.Item name="contactChannels">
                <h4>Liên hệ</h4>
                <Checkbox.Group>
                  <Space>
                    <Checkbox value="facebook">Facebook</Checkbox>
                    <Checkbox value="zalo">Zalo</Checkbox>
                    <Checkbox value="kakaoTalk">Kakaotalk</Checkbox>
                  </Space>
                </Checkbox.Group>
              </Form.Item>
              <Space>
                <Form.Item name="facebook" style={{ marginBottom: 0 }}>
                  <Input prefix={<FacebookOutlined />} placeholder="Facebook" style={{ width: 150 }} />
                </Form.Item>
                <Form.Item name="zalo" style={{ marginBottom: 0 }}>
                  <Input prefix={<SiZalo />} placeholder="Zalo" style={{ width: 150 }} />
                </Form.Item>
              </Space>
            </Card>

          </Col>
          <Col span={12}>
            <Card
              title="* Thông tin người nhận: "
              style={{ marginBottom: '24px', height: '400px' }}
              extra={
                <Button
                  type="primary"
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={() => setIsRecipientModalOpen(true)}
                  disabled={!form.getFieldValue('senderId')}
                  title={!form.getFieldValue('senderId') ? "Vui lòng nhập mã khách hàng trước" : ""}
                >
                  Thêm người nhận
                </Button>
              }
            >
              <Table
                size="small"
                dataSource={receivers}
                columns={[
                  {
                    title: 'Tên người nhận',
                    dataIndex: 'name',
                    key: 'name',
                  },
                  {
                    title: 'Số điện thoại',
                    dataIndex: 'phone',
                    key: 'phone',
                  },
                  {
                    title: 'Địa chỉ',
                    dataIndex: 'address',
                    key: 'address',
                  },
                  {
                    title: 'Khu vực',
                    dataIndex: 'region',
                    key: 'region',
                    render: (area: string) => (
                      <Tag color={area === 'HAN' ? 'blue' : 'green'}>
                        {area}
                      </Tag>
                    ),
                  },
                  {
                    title: 'Thao tác',
                    key: 'actions',
                    width: 120,
                    render: (_, record, index) => (
                      <Space>
                        <Button
                          type="text"
                          icon={<EditOutlined />}
                          onClick={() => {
                            setSelectedRecipient(record);
                            setIsRecipientModalOpen(true);
                          }}
                        />
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => {
                            Modal.confirm({
                              title: 'Xác nhận xóa',
                              content: 'Bạn có chắc chắn muốn xóa người nhận này?',
                              onOk: () => {
                                const newReceivers = [...receivers];
                                newReceivers.splice(index, 1);
                                setReceivers(newReceivers);
                              }
                            });
                          }}
                        />
                      </Space>
                    ),
                  }
                ]}
                pagination={false}
                locale={{ emptyText: 'Chưa có người nhận nào' }}
              />
            </Card>

            <AddRecipientModal
              open={isRecipientModalOpen}
              onCancel={() => {
                setIsRecipientModalOpen(false);
                setSelectedRecipient(null);
              }}
              onSubmit={(values) => {
                if (selectedRecipient) {
                  // Edit mode
                  const newReceivers = receivers.map(r =>
                    r.id === selectedRecipient.id ? { ...values, id: r.id } : r
                  );
                  setReceivers(newReceivers);
                } else {
                  // Add mode
                  setReceivers([...receivers, { ...values, id: Date.now() }]);
                }
                setIsRecipientModalOpen(false);
                setSelectedRecipient(null);
              }}
              mode={selectedRecipient ? 'edit' : 'add'}
              initialData={selectedRecipient}
            />
          </Col>
        </Row>

        <Row gutter={16} >
          <Col span={12}>
            <Card
              className="bg-white"
              title={
                <div className="flex items-center gap-2 text-base font-medium">
                  <span role="img" aria-label="shipping">🚚</span>
                  Dịch vụ vận chuyển quan tâm
                </div>
              }
              style={{ marginBottom: '24px', height: '500px' }}
            >
              {/* Air Service Korea -> Vietnam */}
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3 text-base font-medium">
                  <span role="img" aria-label="airplane">✈️</span>
                  Đơn giá bay Hàn-Việt
                </div>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="hanPrice" className="mb-3">
                      <Input
                        addonBefore={<Tag color="blue">HAN</Tag>}
                        type="number"
                        placeholder="Giá HAN"
                        prefix="₩"
                        className="w-full"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="sgnPrice" className="mb-3">
                      <Input
                        addonBefore={<Tag color="blue">SGN</Tag>}
                        type="number"
                        placeholder="Giá SGN"
                        prefix="₩"
                        className="w-full"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              {/* Air Service Vietnam -> Korea */}
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3 text-base font-medium">
                  <span role="img" aria-label="airplane">✈️</span>
                  Đơn giá bay Việt-Hàn
                </div>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="priceInKRW" className="mb-3">
                      <Input
                        addonBefore={<Tag color="blue">WON</Tag>}
                        type="number"
                        placeholder="Giá HAN"
                        prefix="₩"
                        className="w-full"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="priceInVND" className="mb-3">
                      <Input
                        addonBefore={<Tag color="blue">VND</Tag>}
                        type="number"
                        placeholder="Giá SGN"
                        prefix="₫"
                        className="w-full"
                      />
                    </Form.Item>
                  </Col>
                </Row>

              </div>

              {/* Sea Service */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3 text-base font-medium">
                  <span role="img" aria-label="ship">🚢</span>
                  Đơn giá vận chuyển đường biển
                </div>
                <Form.Item name="seaPrice" className="mb-0">
                  <Input
                    type="number"
                    placeholder="Nhập đơn giá đường biển"
                    prefix="₫"
                    className="w-full"
                  />
                </Form.Item>
              </div>

            </Card>
          </Col>
          <Col span={12}>
            <Card
              title="* Dịch vụ khác: "
              style={{ marginBottom: '24px', height: '500px' }}
            >
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="exchangeRate" label="Tỷ giá">
                      <Input
                        type="number"
                        placeholder="Nhập tỷ giá"
                        prefix="₩/₫"
                        className="hover:border-blue-400"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="serviceFee" label="Công mua">
                      <Input
                        type="number"
                        placeholder="Nhập công mua"
                        prefix="%"
                        className="hover:border-blue-400"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="rating" label="Xếp loại">
                      <Select
                        placeholder="Chọn xếp loại"
                        className="hover:border-blue-400"
                        dropdownStyle={{ padding: '8px' }}
                      >
                        <Select.Option value="VIP">
                          <Tag color="gold">VIP</Tag>
                        </Select.Option>
                        <Select.Option value="Thường">
                          <Tag color="blue">Thường</Tag>
                        </Select.Option>
                        <Select.Option value="Tiềm năng">
                          <Tag color="green">Tiềm năng</Tag>
                        </Select.Option>
                        <Select.Option value="Xấu">
                          <Tag color="red">Xấu</Tag>
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="employee" label="Nhân viên phụ trách">
                      <Select
                        placeholder="Chọn nhân viên"
                        className="hover:border-blue-400"
                        dropdownStyle={{ padding: '8px' }}
                      >
                        <Select.Option value="nv1">
                          <Space>
                            <UserOutlined style={{ color: '#1890ff' }} />
                            Nhân viên 1
                          </Space>
                        </Select.Option>
                        <Select.Option value="nv2">
                          <Space>
                            <UserOutlined style={{ color: '#1890ff' }} />
                            Nhân viên 2
                          </Space>
                        </Select.Option>
                        <Select.Option value="nv3">
                          <Space>
                            <UserOutlined style={{ color: '#1890ff' }} />
                            Nhân viên 3
                          </Space>
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item name="notes" label="Ghi chú">
                  <Input.TextArea
                    rows={4}
                    placeholder="Nhập ghi chú"
                    className="hover:border-blue-400"
                  />
                </Form.Item>
              </Space>
            </Card>
          </Col>
        </Row>


      </Form>
    </Modal>
  );
};

export default AddSenderModal; 
