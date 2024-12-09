import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { UserOutlined, TeamOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { ROLES } from '@/constants';
import type { RoleType } from '@/constants';
import { values } from '@ant-design/plots/es/core/utils';
import { ROLE_SELECT_OPTIONS, DEPARTMENT_SELECT_OPTIONS } from '@/constants/selectOptions';
import { generateRandomPassword } from '@/utils/passwordUtils';
// import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

interface Employee {
  employeeId: string;
  name: string;
  email: string;
  phone?: string;
  role: RoleType;
  department: string;
  updatedAt?: Date;
  password?: string;
}

interface EditEmployeeModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: Employee) => void;
  initialData?: Employee;
  mode?: 'add' | 'edit';
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({
  open,
  onCancel,
  onSubmit,
  initialData,
  mode = 'edit'
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (mode === 'add') {
      form.setFieldsValue({
        password: generateRandomPassword(),
        employeeId: `NV${Date.now().toString().slice(-6)}`
      });
    } else if (mode === 'edit' && initialData) {
      form.setFieldsValue(initialData);
    }
  }, [initialData, form, mode, open]);

  const handleSubmit = async () => {
    // try {
    //   const values = await form.validateFields();
      
    //   if (mode === 'add') {
    //     // Tạo tài khoản Firebase cho nhân viên mới
    //     const email = `${values.employeeId}@yourdomain.com`; // Hoặc sử dụng email thật
    //     const userCredential = await createUserWithEmailAndPassword(
    //       auth,
    //       email,
    //       values.password
    //     );

    //     // Thêm thông tin nhân viên vào Firestore
    //     onSubmit({
    //       ...values,
    //       uid: userCredential.user.uid, // Lưu UID của Firebase user
    //       updatedAt: new Date(),
    //     });
    //   } else {
    //     // Xử lý cập nhật thông tin
    //     onSubmit({
    //       ...values,
    //       updatedAt: new Date(),
    //     });
    //   }
      
    //   form.resetFields();
    // } catch (error) {
    //   console.error('Error:', error);
    //   message.error('Có lỗi xảy ra khi tạo tài khoản');
    // }
  };

  return (
    <Modal
      title={mode === 'add' ? "Thêm Nhân Viên Mới" : "Chỉnh Sửa Thông Tin Nhân Viên"}
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleSubmit}
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={mode === 'edit' ? initialData : undefined}
        style={{ padding: '20px' }}
      >
        <div style={{ marginBottom: '24px' }}>
          <h3><UserOutlined style={{ color: '#1890ff', marginRight: '8px' }} />Thông tin cơ bản</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item
              name="name"
              label="Họ và Tên"
              rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
            >
              <Input prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} placeholder="Nhập họ tên" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không hợp lệ' }
              ]}
            >
              <Input prefix={<MailOutlined style={{ color: '#bfbfbf' }} />} placeholder="Nhập email" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại"
            >
              <Input prefix={<PhoneOutlined style={{ color: '#bfbfbf' }} />} placeholder="Nhập số điện thoại" />
            </Form.Item>

            <Form.Item
              name="employeeId"
              label="Mã nhân viên"
              rules={[{ required: true, message: 'Vui lòng nhập mã nhân viên' }]}
            >
              <Input 
                disabled={true}
                placeholder="Mã nhân viên sẽ được tạo tự động"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: 'Mật khẩu là bắt buộc' }]}
            >
              <Input.Password 
                placeholder={mode === 'add' ? "Mật khẩu sẽ được tạo tự động" : "Nhập mật khẩu mới"}
                disabled={mode === 'add'}
              />
            </Form.Item>
          </div>
        </div>

        <div>
          <h3><TeamOutlined style={{ color: '#52c41a', marginRight: '8px' }} />Thông tin công việc</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item
              name="role"
              label="Vai trò"
              rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
            >
              <Select
                placeholder="Chọn vai trò"
                options={ROLE_SELECT_OPTIONS}
              />
            </Form.Item>

            <Form.Item
              name="department"
              label="Phòng ban"
              rules={[{ required: true, message: 'Vui lòng chọn phòng ban' }]}
            >
              <Select
                placeholder="Chọn phòng ban"
                options={DEPARTMENT_SELECT_OPTIONS}
              />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default EditEmployeeModal;
