import React, { useState, useEffect } from "react";
import { Form, Input, Card, Table, Button, Modal, Select, message, Spin, Avatar, Switch } from "antd";
import { Employee as EmployeeType } from "@/types/Employee";
import { ROLES } from "@/constants";
import { useEmployee } from "@/hooks/useEmployee";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/types/User";
function Employee() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingEmployee, setEditingEmployee] = useState<User | null>(null);
    
    const { user } = useAuth();
    const { createEmployee, updateEmployee, deleteEmployee, employees ,loading} = useEmployee(user?.companyId || '');
   
    console.log(employees)
  

        const showModal = (employee?: User) => {
        if (employee) {
            form.setFieldsValue(employee);
            setEditingEmployee(employee);
        }
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            
            if (editingEmployee) {
                await updateEmployee(editingEmployee.uid, {
                    ...values,
                    updatedAt: new Date()
                });
                message.success('Cập nhật nhân viên thành công');
            } else {
                await createEmployee(
                    values.email,
                    values.password,
                    values.role,
                    values.displayName,
                    values.phone,
                    values.isActive
                );
                message.success('Thêm nhân viên thành công');
            }
            
            setIsModalVisible(false);
            form.resetFields();
            setEditingEmployee(null);
        } catch (error) {
            message.error('Có lỗi xảy ra');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setEditingEmployee(null);
    };

    const handleDelete = async (uid: string) => {
        try {
            await deleteEmployee(uid);
            message.success('Xóa nhân viên thành công');
        } catch (error) {
            message.error('Không thể xóa nhân viên');
        }
    };

    const handleEdit = (employeeId: string) => {
        const employee = employees.find(emp => emp.uid === employeeId);
        if (employee) {
            showModal(employee);
        }
    };

    const columns = [
        { title: 'Mã nhân viên', dataIndex: 'employeeId', key: 'employeeId' },
        { title: 'Hình đại diện', dataIndex: 'photoURL', key: 'photoURL', render: (photoURL: string) => <Avatar src={photoURL} /> },
        { title: 'Tên nhân viên', dataIndex: 'displayName', key: 'displayName' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
        { title: 'Vai trò', dataIndex: 'role', key: 'role' },
        { title: 'Trạng thái', dataIndex: 'isActive', key: 'isActive', render: (isActive: boolean) => isActive ? 'Đang làm việc' : 'Đã nghỉ' },
        {
            title: 'Hành động',
            key: 'action',
            render: (_: any, record:User) => (
                <>
                    <Button type="text" onClick={() => handleEdit(record?.uid)}>Sửa</Button>
                    {record.role !== ROLES.MANAGER && (
                        <Button type="text" style={{ color: 'red' }} onClick={() => handleDelete(record.uid)}>Xóa</Button>
                    )}
                </>
            ),
        },
    ];

    return (
        <Card title="Thiết lập nhân viên" style={{ margin: '20px', backgroundColor: '#f0f2f5' }}>
            <Spin spinning={loading} tip="Loading..."> 
            <Button type="primary" onClick={() => showModal()} style={{ marginBottom: '20px' }}>
                Thêm nhân viên
            </Button>
            <Table columns={columns} dataSource={employees as any} rowKey="uid" />
            <Modal 
                title={editingEmployee ? "Sửa nhân viên" : "Thêm nhân viên"} 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="displayName" label="Tên nhân viên" rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
                        <Input />
                    </Form.Item>
                    {!editingEmployee && (
                        <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                            <Input.Password />
                        </Form.Item>
                    )}
                    <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Trạng thái" name="isActive">
                        <Switch defaultChecked={true} />
                    </Form.Item>
                    <Form.Item name="role" label="Vai trò" rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}>
                        <Select options={Object.values(ROLES).map(role => ({ label: role, value: role }))} />
                    </Form.Item>
                   
                </Form>
            </Modal>
            </Spin>
        </Card>
    );
}

export default Employee;
