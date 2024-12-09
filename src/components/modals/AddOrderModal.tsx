import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, InputNumber, DatePicker, Space, Checkbox, Button, List, Typography, Tabs, Card } from 'antd';
import { UserOutlined, PhoneOutlined, HomeOutlined, ShoppingOutlined, DollarOutlined, PrinterOutlined, SearchOutlined, FacebookOutlined, MessageOutlined, WechatOutlined, GlobalOutlined, BoxPlotOutlined, SaveOutlined } from '@ant-design/icons';
import type { Order } from '@/types/Order';
import dayjs from 'dayjs';
import { SiFacebook, SiKakaotalk, SiZalo } from 'react-icons/si';
import { senderMockData } from '@/mocks/senderMockData';
import { recipientMockData } from '@/mocks/recipientMockData';
import { Sender } from '@/types/Sender';
import type { Recipient } from '@/types/Recipient';
import { ITEM_TYPES, ORDER_TYPE, SHIPPING_METHOD, ORDER_STATUS, PAYMENT_STATUS } from '@/constants';
import { generateVietnamToKoreaAirBillId , generateKoreaToVietnamSeaBillId } from '@/utils/idGenerators';
import { formatDate } from '@/utils/format';
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
  const [searchResults, setSearchResults] = useState<Sender[]>([]);
  const [recipientResults, setRecipientResults] = useState<Recipient[]>([]);

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      console.log('Initial Data received:', initialData); // Debug log
      form.setFieldsValue({
        // IDs and References
        orderId: initialData.orderId,
        manageId: initialData.manageId,
        handlerId: initialData.handlerId,
        
        // Sender Information
        senderId: initialData.senderId,
        senderName: initialData.senderName,
        senderPhone: initialData.senderPhone,
        senderAddress: initialData.senderAddress,
        
        // Receiver Information
        receiverId: initialData.receiverId,
        receiverName: initialData.receiverName,
        receiverPhone: initialData.receiverPhone,
        receiverAddress: initialData.receiverAddress,
        receiverRegion: initialData.receiverRegion,
        
        // Shipping Information
        serviceType: initialData.shippingType,
        shippingMethod: initialData.serviceType,
        price: initialData.price,
        
        // Package Information
        packageType: initialData.itemType,
        weight: initialData.weight,
        totalPackages: initialData.totalPackages,
        trackingNumber: initialData.trackingNumber,
        
        // Dates
        shipmentDate: dayjs(initialData.shipmentDate),
        deliveryDate: dayjs(initialData.deliveryDate),
        
        // Status and Payment
        status: initialData.status,
        paymentStatus: initialData.paymentStatus,
        note: initialData.note,
        paidAmount: initialData.paidAmount,
      });
      
      console.log('Form values after setting:', form.getFieldsValue()); // Debug log
    }
  }, [initialData, form, mode]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      // Required field validation
      const requiredFields = {
        senderName: 'Tên người gửi',
        senderPhone: 'Số điện thoại người gửi',
        senderAddress: 'Địa chỉ người gửi',
        receiverName: 'Tên người nhận',
        receiverPhone: 'Số điện thoại người nhận',
        receiverAddress: 'Địa chỉ người nhận',
        weight: 'Cân nặng',
        price: 'Đơn giá',
        serviceType: 'Loại dịch vụ',
        shippingMethod: 'Phương thức vận chuyển'
      };

      const missingFields = [];
      for (const [field, label] of Object.entries(requiredFields)) {
        if (!values[field]) {
          missingFields.push(label);
        }
      }

      // Specific validations
      if (values.weight <= 0) {
        missingFields.push('Cân nặng phải lớn hơn 0');
      }
      if (values.price <= 0) {
        missingFields.push('Đơn giá phải lớn hơn 0');
      }

      if (missingFields.length > 0) {
        Modal.error({
          title: 'Thông tin không hợp lệ',
          content: (
            <div>
              <p>Vui lòng điền đầy đủ các thông tin sau:</p>
              <ul>
                {missingFields.map((field, index) => (
                  <li key={index}>{field}</li>
                ))}
              </ul>
            </div>
          ),
        });
        return;
      }

      // Generate appropriate ID based on shipping method
      let generatedId;
      if (values.shippingMethod === 'air') {
        generatedId = generateVietnamToKoreaAirBillId();
      } else if (values.shippingMethod === 'sea') {
        generatedId = generateKoreaToVietnamSeaBillId();
      }
      
      // Format the order data according to Order interface
      const formattedOrder: Order = {
        // Use the generated ID for both orderId and trackingNumber
        orderId: generatedId || crypto.randomUUID(),
        trackingNumber: generatedId || '',
        
        // Rest of the order properties
        manageId: values.manageId || '',
        handlerId: values.handlerId,
        
        // Sender Information
        senderId: values.senderId || '',
        senderName: values.senderName || '',
        senderPhone: values.senderPhone || '',
        senderAddress: values.senderAddress || '',
        
        // Receiver Information
        receiverId: values.receiverId || '',
        receiverName: values.receiverName || '',
        receiverPhone: values.receiverPhone || '',
        receiverAddress: values.receiverAddress || '',
        receiverRegion: values.receiverRegion || '',
        
        // Shipping Information
      
        serviceType: values.shippingMethod || 'air',
        shippingType: values.serviceType || 'export',
        price: values.price || 0,
        
        // Package Information
        itemType: values.packageType || ITEM_TYPES.OTHER,
        weight: values.weight || 0,
        totalPackages: values.totalPackages || 0,
        
        // Dates
        // shipmentDate: formatDate( values.shipmentDate?.toDate()) || formatDate(new Date()), 
        // deliveryDate: formatDate(values.deliveryDate?.toDate())  || formatDate(new Date()) ,
        createdAt: mode === 'add' ? formatDate(new Date())  : initialData?.createdAt || formatDate(new Date()) ,
        updatedAt: formatDate(new Date()) ,
       
        // Status and Payment
        status: values.status || ORDER_STATUS.PENDING,
        paymentStatus: values.paymentStatus || PAYMENT_STATUS.UNPAID,
        totalAmount: (values.price || 0) * (values.weight || 0),
        note: values.note,
      };

      console.log('Creating new order with values:', formattedOrder);
      onSubmit(formattedOrder);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

   // Hàm tìm kiếm theo tên
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
    console.log('Selected sender:', selected);
    if (selected) {
      // Tạo mảng channels dựa trên dữ liệu thực tế
    

      form.setFieldsValue({
        senderId:selected.senderId,
        senderName: selected.name,
        senderPhone: selected.phone,
        senderAddress: selected.address,
        facebook: selected.facebook,
        zalo: selected.zalo,
        price: selected.unitPrice,
        contactChannels:  selected.contactChannels // Set channels dựa trên dữ liệu thực tế
      });
      
      console.log('Form values after set:', form.getFieldsValue());
      
      // If recipient is already selected, clear all results
      if (form.getFieldValue('receiverName')) {
        setSearchResults([]);
        setRecipientResults([]);
        return;
      }

      // Otherwise, show matching recipients
      const matchingRecipients = recipientMockData.filter(
        recipient => recipient.senderId === senderId
      );
      setRecipientResults(matchingRecipients);
      setSearchResults([]);
    }
  };

  // Add a new search handler for recipients
  const handleRecipientSearch = (value: string) => {
    if (!value) {
      setRecipientResults([]);
      return;
    }

    const results = recipientMockData.filter(recipient => 
      recipient.name.toLowerCase().includes(value.toLowerCase()) ||
      recipient.phone.includes(value)
    );

    if (results.length === 0) {
      Modal.confirm({
        title: 'Không tìm thấy người nhận',
        content: 'Bạn có muốn thêm người nhận mới không?',
        okText: 'Thêm mới',
        cancelText: 'Hủy',
      });
    }
    setRecipientResults(results);
  };

  // Update handleRecipientSelect
  const handleRecipientSelect = (recipient: Recipient) => {
    form.setFieldsValue({
      receiverId:recipient.recipientId,
      receiverName: recipient.name,
      receiverPhone: recipient.phone,
      receiverAddress: recipient.address,
      receiverRegion: recipient.region,
    });

    // If sender is already selected, clear all results
    if (form.getFieldValue('senderName')) {
      setSearchResults([]);
      setRecipientResults([]);
      return;
    }

    // Otherwise, show matching senders
    const matchingSenders = senderMockData.filter(
      sender => sender.senderId === recipient.senderId
    );
    
    if (matchingSenders.length > 0) {
      setSearchResults(matchingSenders);
    }
    setRecipientResults([]);
  };

  return (
    <Modal
      title={mode === 'add' ? "Tạo v���n đơn mới > Tao mộ đơn" : "Chỉnh sửa vận đơn"}
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleSubmit}
      okText="Lưu"
      cancelText="Hủy"
      width={1200}
    >
      <Form form={form} layout="vertical" initialValues={initialData}>
        <div style={{ display: 'flex', gap: '16px' }}>
          {/* Left Column */}
          <div style={{ flex: 1 }}>
            {/* Sender Info */}
            <Card className="">
              <h3 className='flex items-center gap-2 mb-4'>
                <span>Người gửi:</span>
                <Input 
                  prefix={<UserOutlined className="text-gray-400" />} 
                  disabled 
                  value={form.getFieldValue('senderId') ? `#${form.getFieldValue('senderId')}` : ''} 
                  className="w-32 ml-2"
                  style={{ 
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #d9d9d9',
                    borderRadius: '6px',
                    padding: '4px 11px',
                    fontSize: '14px'
                  }}
                />
              </h3>

              <Space.Compact block>
                <Form.Item name="senderSearch" style={{ flex: 1, marginBottom: 8 }}>
                  <Input
                    placeholder="Tìm người gửi..."
                    onChange={(e) => handleNameSearch(e.target.value)}
                    allowClear
                    prefix={<SearchOutlined />}
                  />
                </Form.Item>
              </Space.Compact>
             
              <Space style={{ width: '100%' }} direction="vertical" size="small">
                <Input.Group compact>
                  <Form.Item name="senderName" style={{ width: '50%' }}>
                    <Input prefix={<UserOutlined />} placeholder="Tên người gửi" />
                  </Form.Item>
                 
                  <Form.Item name="senderPhone" style={{ width: '50%' }}>
                    <Input prefix={<PhoneOutlined />} placeholder="SĐT" />
                  </Form.Item>
                </Input.Group>
                
                <Form.Item name="senderAddress">
                  <Input prefix={<HomeOutlined />} placeholder="Địa chỉ" />
                </Form.Item>
             
                <Space>
                  <Form.Item name="facebook" style={{ marginBottom: 0 }}>
                    <Input prefix={<FacebookOutlined />} placeholder="Facebook" style={{ width: 150 }} />
                  </Form.Item>
                  <Form.Item name="zalo" style={{ marginBottom: 0 }}>
                    <Input prefix={<SiZalo />} placeholder="Zalo" style={{ width: 150 }} />
                  </Form.Item>
                </Space>

                <Form.Item name="contactChannels">
                  <Card>
                    <h4>Kênh liên hệ</h4>
                    <Space>
                      <Checkbox 
                        checked={form.getFieldValue('contactChannels')?.includes('Facebook')}
                      >
                        Facebook
                      </Checkbox>
                      <Checkbox 
                        checked={form.getFieldValue('contactChannels')?.includes('Zalo')}
                      >
                       Zalo
                      </Checkbox>
                      <Checkbox 
                        checked={form.getFieldValue('contactChannels')?.includes('KakaoTalk')}
                      >
                      Kakaotalk
                      </Checkbox>
                    </Space>
                  </Card>
                </Form.Item>
              </Space>
            </Card>

            {/* Package Info - Simplified */}
            <Card className="mt-4">
              <h3>Thông tin hàng</h3>
              <Space direction="vertical" style={{ width: '100%' }} size="small">
                <Input.Group compact>
                  <Form.Item name="packageType" style={{ width: '50%' }}>
                    <Select placeholder="Loại hàng">
                      {Object.entries(ITEM_TYPES).map(([key, value]) => (
                        <Select.Option key={value} value={value}>
                          {key}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item name="totalPackages" style={{ width: '50%' }}>
                    <InputNumber style={{ width: '100%' }} placeholder="Số kiện" />
                  </Form.Item>
                </Input.Group>

                <Input.Group compact>
                  <Form.Item name="weight" style={{ width: '50%' }}>
                    <InputNumber style={{ width: '100%' }} placeholder="Cân nặng (kg)" />
                  </Form.Item>
                  <Form.Item name="price" style={{ width: '50%' }}>
                    <InputNumber style={{ width: '100%' }} placeholder="Đơn giá (won)" />
                  </Form.Item>
                </Input.Group>
              </Space>
            </Card>
          </div>

          {/* Right Column */}
          <div style={{ flex: 1 }}>
            {/* Receiver Info */}
            <Card className="">
              <h3 className='flex items-center gap-2 mb-4'>
                <span>Người nhận:</span>
                <Input 
                  prefix={<UserOutlined className="text-gray-400" />} 
                  disabled 
                  value={form.getFieldValue('receiverId') ? `#${form.getFieldValue('receiverId')}` : ''} 
                  className="w-32 ml-2"
                  style={{ 
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #d9d9d9',
                    borderRadius: '6px',
                    padding: '4px 11px',
                    fontSize: '14px'
                  }}
                />
              </h3>
              <Space.Compact block>
                <Form.Item name="receiverSearch" style={{ flex: 1, marginBottom: 8 }}>
                  <Input
                    placeholder="Tìm người nhận..."
                    onChange={(e) => handleRecipientSearch(e.target.value)}
                    allowClear
                    prefix={<SearchOutlined />}
                  />
                </Form.Item>
              </Space.Compact>

              <Space style={{ width: '100%' }} direction="vertical" size="small">
                <Input.Group compact>
                  <Form.Item name="receiverName" style={{ width: '50%' }}>
                    <Input prefix={<UserOutlined />} placeholder="Tên người nhận" />
                  </Form.Item>
               
                  <Form.Item name="receiverPhone" style={{ width: '50%' }}>
                    <Input prefix={<PhoneOutlined />} placeholder="SĐT" />
                  </Form.Item>
                </Input.Group>

                <Form.Item name="receiverAddress">
                  <Input prefix={<HomeOutlined />} placeholder="Địa chỉ nhận" />
                </Form.Item>
                
                <Form.Item name="receiverRegion">
                  <Input prefix={<GlobalOutlined />} placeholder="Khu vực" />
                </Form.Item>
              </Space>
            </Card>

            {/* Shipping Info - Simplified */}
            <Card className=" mt-4">
              <h3>Vận chuyển</h3>
              <Space direction="vertical" style={{ width: '100%' }} size="small">
                <Input.Group compact>
                  <Form.Item name="serviceType" style={{ width: '50%' }}>
                    <Select placeholder="Loại dịch vụ">
                      {Object.entries(ORDER_TYPE).map(([key, value]) => (
                        <Select.Option key={value} value={value}>
                          {key === 'EXPORT' ? 'Xuất khẩu' : 'Nhập khẩu'}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item name="shippingMethod" style={{ width: '50%' }}>
                    <Select placeholder="Phương thức">
                      {Object.entries(SHIPPING_METHOD).map(([key, value]) => (
                        <Select.Option key={value} value={value}>
                          {key === 'AIR' ? 'Đường bay' : 'Đường biển'}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Input.Group>

                <Form.Item name="note">
                  <Input.TextArea placeholder="Ghi chú" rows={3} />
                </Form.Item>
              </Space>
            </Card>
          </div>

          {/* Search Results Sidebar - Keep existing code */}
          {(searchResults.length > 0 || recipientResults.length > 0) && (
            <div style={{ width: '250px', border: '1px solid #d9d9d9', padding: '16px', borderRadius: '8px' }}>
              <Tabs defaultActiveKey="senders">
                {searchResults.length > 0 && (
                  <Tabs.TabPane tab="Người gửi" key="senders">
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
                                <Space>
                                  {item.facebook && (
                                    <SiFacebook className="text-blue-600" />
                                  )}
                                  {item.zalo && (
                                    <SiZalo className="text-blue-500" />
                                  )}
                                  {item.kakaoTalk && (
                                    <SiKakaotalk className="text-yellow-500" />
                                  )}
                                </Space>
                              </Space>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Tabs.TabPane>
                )}
                {recipientResults.length > 0 && (
                  <Tabs.TabPane tab="Người nhận" key="recipients">
                    <List
                      size="small"
                      dataSource={recipientResults}
                      renderItem={(item) => (
                        <List.Item
                          className="hover:bg-blue-50 cursor-pointer"
                          onClick={() => handleRecipientSelect(item)}
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
                  </Tabs.TabPane>
                )}
              </Tabs>
            </div>
          )}
        </div>
      </Form>
    </Modal>
  );
};

// Add some styles to your CSS
const styles = `
.form-section {
  padding: 12px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  margin-bottom: 16px;
}

.form-section h3 {
  margin-bottom: 12px;
  font-size: 16px;
  color: #1890ff;
}
`;

export default AddOrderModal;
