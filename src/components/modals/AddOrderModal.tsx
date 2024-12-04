import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, DatePicker, Space, Checkbox, Button } from 'antd';
import { UserOutlined, PhoneOutlined, HomeOutlined, ShoppingOutlined, DollarOutlined, PrinterOutlined, SearchOutlined, FacebookOutlined, MessageOutlined, WechatOutlined, GlobalOutlined, BoxPlotOutlined, SaveOutlined } from '@ant-design/icons';
import type { Order } from '@/types/Order';
import dayjs from 'dayjs';
import { SiFacebook, SiZalo } from 'react-icons/si';

interface AddOrderModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: Order) => void;
  initialData?: Order;
  mode?: 'add' | 'edit';
}

const AddOrderModal: React.FC<AddOrderModalProps> = ({
  open,
  onCancel,
  onSubmit,
  initialData,
  mode = 'add'
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      form.setFieldsValue({
        ...initialData,
        shipmentDate: initialData.shipmentDate ? dayjs(initialData.shipmentDate) : null,
        deliveryDate: initialData.deliveryDate ? dayjs(initialData.deliveryDate) : null,
      });
    }
  }, [initialData, form, mode]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit({
        ...values,
        createdAt: mode === 'add' ? new Date() : initialData?.createdAt,
        updatedAt: new Date(),
      });
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={mode === 'add' ? "Tạo vận đơn > Tạo từng đơn" : "Chỉnh sửa vận đơn"}
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleSubmit}
      width={1300}
    >
      <Form form={form} layout="vertical" initialValues={initialData}>
        <div style={{ display: 'flex', gap: '24px' }}>
          {/* Left section */}
          <div style={{ flex: 1 }}>
            {/* Sender Information */}
            <div style={{ marginBottom: '24px', border: '1px solid #d9d9d9', padding: '16px', borderRadius: '8px' }}>
              <h3>Thông tin người gửi:</h3>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                <Form.Item
                  label="Tìm theo tên/sdt gửi:"
                  style={{ flex: 1, marginBottom: '8px' }}
                >
                  <Input.Search prefix={<SearchOutlined />} />
                </Form.Item>
              </div>
              
              <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                <Form.Item
                  name="senderPhone"
                  label="SĐT gửi:"
                  style={{ flex: 1 }}
                >
                  <Input prefix={<PhoneOutlined />} />
                </Form.Item>
                <Form.Item
                  name="senderName"
                  label="Người gửi:"
                  style={{ flex: 1 }}
                >
                  <Input prefix={<UserOutlined />} />
                </Form.Item>
              </div>

              <div style={{ marginBottom: '8px' }}>
                <Form.Item label="Liên hệ:">
                  <Space>
                    <Form.Item name="zalo" valuePropName="checked" noStyle>
                      <Checkbox>Zalo</Checkbox>
                    </Form.Item>
                    <Form.Item name="kakaotalk" valuePropName="checked" noStyle>
                      <Checkbox>Facebook</Checkbox>
                    </Form.Item>
                  </Space>
                </Form.Item>
              </div>

              <Form.Item
                name="facebook"
                label="Facebook:"
              >
                <Input prefix={<SiFacebook />} />
              </Form.Item>

              <Form.Item
                name="zalo"
                label="Zalo"
              >
                <Input prefix={<SiZalo />} />
              </Form.Item>

              <Form.Item
                name="senderAddress"
                label="Địa chỉ gửi:"
              >
                <Input prefix={<HomeOutlined />} />
              </Form.Item>
            </div>

            {/* Shipping Information */}
            <div style={{ marginBottom: '24px', border: '1px solid #d9d9d9', padding: '16px', borderRadius: '8px' }}>
              <h3>Thông tin vận chuyển:</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                <Form.Item name="serviceType" label="Dịch vụ:">
                  <Input prefix={<GlobalOutlined />} />
                </Form.Item>
                
                <Form.Item name="region" label="Khu vực:">
                  <Input />
                </Form.Item>
                <Form.Item name="price" label="Đơn giá(won):">
                  <InputNumber prefix={<DollarOutlined />} style={{ width: '100%' }} />
                </Form.Item>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div style={{ flex: 1 }}>
            {/* Receiver Information */}
            <div style={{ marginBottom: '24px', border: '1px solid #d9d9d9', padding: '16px', borderRadius: '8px' }}>
              <h3>Thông tin người nhận:</h3>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                <Form.Item
                  label="Tìm theo tên/sdt nhận:"
                  style={{ flex: 1 }}
                >
                  <Input.Search prefix={<SearchOutlined />} />
                </Form.Item>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                <Form.Item
                  name="receiverPhone"
                  label="SĐT nhận:"
                  style={{ flex: 1 }}
                >
                  <Input prefix={<PhoneOutlined />} />
                </Form.Item>
                <Form.Item
                  name="receiverName"
                  label="Người nhận:"
                  style={{ flex: 1 }}
                >
                  <Input prefix={<UserOutlined />} />
                </Form.Item>
              </div>

              <Form.Item
                name="receiverAddress"
                label="Địa chỉ nhận:"
              >
                <Input prefix={<HomeOutlined />} />
              </Form.Item>
            </div>

            {/* Package Information */}
            <div style={{ marginBottom: '24px', border: '1px solid #d9d9d9', padding: '16px', borderRadius: '8px' }}>
              <h3>Thông tin mặt hàng:</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                <Form.Item name="packageType" label="Loại hàng:">
                  <Input prefix={<BoxPlotOutlined />} />
                </Form.Item>
                <Form.Item name="totalPackages" label="Số kiện:">
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="weight" label="Cân nặng(kg)">
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="note" label="GHI CHÚ:">
                  <Input />
                </Form.Item>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ width: '250px', border: '1px solid #d9d9d9', padding: '16px', borderRadius: '8px' }}>
            <h3>List người nhận/gửi:</h3>
            {/* Add table or list component here */}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Button type="primary" icon={<SaveOutlined />} onClick={handleSubmit}>
            Lưu
          </Button>
          <Button icon={<PrinterOutlined />} style={{ marginLeft: '8px' }}>
            In
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddOrderModal;