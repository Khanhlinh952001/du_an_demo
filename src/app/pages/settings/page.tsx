'use client';

import { useState } from 'react';
import { Tabs, Card, Form, Input, Button, Select, InputNumber, Switch } from 'antd';
import { UserOutlined, TeamOutlined, SettingOutlined, DollarOutlined, PlusOutlined, BellOutlined, GlobalOutlined, SafetyCertificateOutlined, FileOutlined, CheckCircleOutlined, ClockCircleOutlined, TranslationOutlined, CalendarOutlined, LockOutlined, FileExcelOutlined, FilePdfOutlined, FileTextOutlined, PhoneOutlined, MailOutlined, IdcardOutlined, BankOutlined, NumberOutlined, HomeOutlined, UploadOutlined, DollarCircleOutlined, RocketOutlined, EditOutlined, StopOutlined } from '@ant-design/icons';
import { UserMockData } from '@/mocks/UserMockData';
import { EmployeeMockData } from '@/mocks/EmployeeMockData';
import MainLayout from '@/layout/MainLayout';
import { ROLES } from '@/constants/constants';
import EditEmployeeModal from '@/components/modals/EditEmployeeModal';
import { 
  FaUserTie, 
  FaBuilding, 
  FaFileContract, 
  FaMoneyBillWave,
  FaPlane, 
  FaShip, 
  FaUsers,
  FaUsersCog
} from 'react-icons/fa';
import { 
  MdSecurity, 
  MdNotifications, 
  MdLanguage, 
  MdSettings 
} from 'react-icons/md';
import { 
  BiExport, 
  BiTime 
} from 'react-icons/bi';
import { 
  BsFileEarmarkPdf, 
  BsFileEarmarkExcel, 
  BsFileEarmarkText 
} from 'react-icons/bs';

const { TabPane } = Tabs;

export default function SettingsPage() {
  const [currentUser] = useState(UserMockData[0]);
  const [form] = Form.useForm();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const handleProfileUpdate = (values: any) => {
    console.log('Profile updated:', values);
  };

  const handlePriceUpdate = (values: any) => {
    console.log('Prices updated:', values);
  };

  const handleEditEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setIsEditModalVisible(true);
  };

  const handleEmployeeUpdate = (values: any) => {
    if (Object.keys(ROLES).includes(values.role)) {
      console.log('Employee updated:', values);
      setIsEditModalVisible(false);
    } else {
      console.error('Invalid role');
    }
  };

  const handleAddEmployee = (values: any) => {
    console.log('New employee:', {
      ...values,
      employeeId: `EMP${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setIsAddModalVisible(false);
  };

  return (
    <MainLayout>
      <h1 className="text-2xl mb-4 font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Cài Đặt Hệ Thống</h1>

      <Tabs defaultActiveKey="profile">
        <TabPane
          tab={
            <span className=" flex items-center">
              <FaUserTie className="mr-2 text-lg" /> Thông Tin Cá Nhân
            </span>
          }
          key="profile"
        >
          <Card className="max-w-2xl">
            <Form
              form={form}
              layout="vertical"
              initialValues={currentUser}
              onFinish={handleProfileUpdate}
            >
              <Form.Item 
                label={<span><UserOutlined className="mr-2" />Họ và Tên</span>} 
                name="name"
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item 
                label={<span><MailOutlined className="mr-2" />Email</span>} 
                name="email"
              >
                <Input prefix={<MailOutlined />} type="email" />
              </Form.Item>
              <Form.Item 
                label={<span><PhoneOutlined className="mr-2" />Số Điện Thoại</span>} 
                name="phone"
              >
                <Input prefix={<PhoneOutlined />} />
              </Form.Item>

              <div className="border-t mt-4 pt-4">
                <h3 className="text-lg font-medium mb-4 flex items-center text-blue-600">
                  <FaBuilding className="mr-2 text-xl" /> Thông Tin Công Ty
                </h3>
                <Form.Item 
                  label={<span><IdcardOutlined className="mr-2" />Mã Công Ty</span>} 
                  name={['company', 'companyCode']}
                >
                  <Input prefix={<IdcardOutlined />} />
                </Form.Item>
                <Form.Item 
                  label={<span><NumberOutlined className="mr-2" />Số Giấy Phép Kinh Doanh</span>} 
                  name={['company', 'bizLicenseNumber']}
                >
                  <Input prefix={<NumberOutlined />} />
                </Form.Item>
                <Form.Item 
                  label={<span><HomeOutlined className="mr-2" />Địa Chỉ Công Ty</span>} 
                  name={['company', 'address']}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item 
                  label={<span><UploadOutlined className="mr-2" />Giấy Phép Kinh Doanh</span>} 
                  name={['company', 'bizLicenseFile']}
                >
                  <Input type="file" />
                </Form.Item>
              </div>

              <Button type="primary" htmlType="submit">
                Cập Nhật Thông Tin
              </Button>
            </Form>
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span className="flex items-center">
              <FaMoneyBillWave className="mr-2 text-lg" /> Cài Đặt Giá
            </span>
          }
          key="prices"
        >
          <Card className="max-w-2xl">
            <Form
              layout="vertical"
              initialValues={currentUser.settings}
              onFinish={handlePriceUpdate}
            >
              <Form.Item 
                label={<span><DollarCircleOutlined className="mr-2" />Giá Cơ Bản</span>} 
                name="baseRate"
              >
                <InputNumber
                  prefix="₫"
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item 
                label={<span className="flex items-center"><FaPlane className="mr-2" />Giá Vận Chuyển Đường Hàng Không</span>} 
                name="airShippingRate"
              >
                <InputNumber
                  prefix="₫"
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item 
                label={<span className="flex items-center"><FaShip className="mr-2" />Giá Vận Chuyển Đường Biển</span>} 
                name="seaShippingRate"
              >
                <InputNumber
                  prefix="₫"
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Cập Nhật Giá
              </Button>
            </Form>
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span className=" flex items-center">
              <FaUsersCog className="mr-2 text-lg" /> Quản Lý Nhân Viên
            </span>
          }
          key="employees"
        >
          <Card>
            <div className="mb-4">
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsAddModalVisible(true)}
              >
                <span><TeamOutlined className="mr-2" />Thêm Nhân Viên Mới</span>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {EmployeeMockData.map((employee) => (
                <Card 
                  key={employee.employeeId} 
                  size="small" 
                  title={<span><UserOutlined className="mr-2" />{employee.name}</span>}
                >
                  <p><IdcardOutlined className="mr-2" />ID: {employee.employeeId}</p>
                  <p><SafetyCertificateOutlined className="mr-2" />Vai trò: {ROLES[employee.role as keyof typeof ROLES]}</p>
                  <p><TeamOutlined className="mr-2" />Phòng ban: {employee.department}</p>
                  <p><MailOutlined className="mr-2" />Email: {employee.email}</p>
                  <div className="mt-2">
                    <Button 
                      size="small" 
                      type="primary" 
                      icon={<EditOutlined />}
                      onClick={() => handleEditEmployee(employee)}
                    >
                      Chỉnh sửa
                    </Button>
                    <Button 
                      size="small" 
                      danger 
                      className="ml-2"
                      icon={<TranslationOutlined />}
                    >
                      Vô hiệu hóa
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span className="flex items-center">
              <MdSettings className="mr-2 text-lg" /> Cài Đặt Khác
            </span>
          }
          key="other"
        >
          <Card className="max-w-2xl">
            <Form 
              layout="vertical"
              initialValues={currentUser.settings}
              onFinish={(values) => console.log('Settings updated:', values)}
            >
              {/* Notification Settings */}
              <h3 className="text-lg font-medium mb-4 flex items-center text-blue-600">
                <MdNotifications className="mr-2 text-xl" /> Cài Đặt Thông Báo
              </h3>
              <Form.Item label="Thông Báo Chung" name="notificationsEnabled">
                <Switch 
                  checkedChildren={<CheckCircleOutlined />} 
                  unCheckedChildren={<ClockCircleOutlined />}
                  defaultChecked={currentUser.settings.notificationsEnabled} 
                />
              </Form.Item>
              <Form.Item label="Thông Báo Qua Email" name="emailNotifications">
                <Switch 
                  checkedChildren={<CheckCircleOutlined />} 
                  unCheckedChildren={<ClockCircleOutlined />}
                />
              </Form.Item>
              <Form.Item label="Thông Báo Đơn Hàng Mới" name="newOrderNotifications">
                <Switch 
                  checkedChildren={<CheckCircleOutlined />} 
                  unCheckedChildren={<ClockCircleOutlined />}
                />
              </Form.Item>

              {/* Display Settings */}
              <h3 className="text-lg font-medium mt-6 mb-4 flex items-center text-green-600">
                <MdLanguage className="mr-2 text-xl" /> Hiển Thị
              </h3>
              <Form.Item 
                label={<span><TranslationOutlined className="mr-2" />Ngôn Ngữ</span>} 
                name="language"
              >
                <Select
                  defaultValue="vi"
                  options={[
                    { value: 'vi', label: 'Tiếng Việt' },
                    { value: 'en', label: 'English' },
                    { value: 'ko', label: '한국어' },
                  ]}
                />
              </Form.Item>
              <Form.Item 
                label={<span><GlobalOutlined className="mr-2" />Múi Giờ</span>} 
                name="timezone"
              >
                <Select
                  defaultValue="Asia/Ho_Chi_Minh"
                  options={[
                    { value: 'Asia/Ho_Chi_Minh', label: 'Hồ Chí Minh (GMT+7)' },
                    { value: 'Asia/Seoul', label: 'Seoul (GMT+9)' },
                    { value: 'UTC', label: 'UTC' },
                  ]}
                />
              </Form.Item>
              <Form.Item 
                label={<span><CalendarOutlined className="mr-2" />Định Dạng Ngày</span>} 
                name="dateFormat"
              >
                <Select
                  defaultValue="DD/MM/YYYY"
                  options={[
                    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
                  ]}
                />
              </Form.Item>

              {/* Security Settings */}
              <h3 className="text-lg font-medium mt-6 mb-4 flex items-center text-red-600">
                <MdSecurity className="mr-2 text-xl" /> Bảo Mật
              </h3>
              <Form.Item 
                label={<span><LockOutlined className="mr-2" />Xác Thực 2 Lớp</span>} 
                name="twoFactorAuth"
              >
                <Switch 
                  checkedChildren={<CheckCircleOutlined />} 
                  unCheckedChildren={<ClockCircleOutlined />}
                />
              </Form.Item>

              {/* Export Settings */}
              <h3 className="text-lg font-medium mt-6 mb-4 flex items-center text-purple-600">
                <BiExport className="mr-2 text-xl" /> Xuất Dữ Liệu
              </h3>
              <Form.Item 
                label={<span><FileOutlined className="mr-2" />Định Dạng File Xuất</span>} 
                name="exportFormat"
              >
                <Select
                  defaultValue="xlsx"
                  options={[
                    { 
                      value: 'xlsx', 
                      label: <span className="flex items-center">
                        <BsFileEarmarkExcel className="mr-2 text-green-600" />Excel (XLSX)
                      </span> 
                    },
                    { 
                      value: 'csv', 
                      label: <span className="flex items-center">
                        <BsFileEarmarkText className="mr-2 text-gray-600" />CSV
                      </span> 
                    },
                    { 
                      value: 'pdf', 
                      label: <span className="flex items-center">
                        <BsFileEarmarkPdf className="mr-2 text-red-600" />PDF
                      </span> 
                    },
                  ]}
                />
              </Form.Item>

              <Button type="primary" htmlType="submit" className="mt-4">
                Lưu Cài Đặt
              </Button>
            </Form>
          </Card>
        </TabPane>
      </Tabs>

      <EditEmployeeModal
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onSubmit={handleEmployeeUpdate}
        initialData={selectedEmployee}
      />

      <EditEmployeeModal
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onSubmit={handleAddEmployee}
        mode="add"
      />
    </MainLayout>
  );
}

