import React, { useState } from "react";
import { Form, Input, Card, Table, Button, Modal, Select } from "antd";
import { Employee as EmployeeType } from "@/types/Employee";
import { ROLES } from "@/constants";
function Employee() {
    const [employees, setEmployees] = useState<EmployeeType[]>([
        {
            employeeId: "123",
            manageId: "admin123",
            name: "Nguyen Van A",
            email: "nguyenvana@example.com",
            password: "hashedpassword",
            phone: "0123456789",
            role: "Manager",
            department: "Kế toán",
            isActive: true,
            hireDate: new Date(),
            assignOrders: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingEmployee, setEditingEmployee] = useState<EmployeeType | null>(null);

    const showModal = (employee?: EmployeeType) => {
        if (employee) {
            form.setFieldsValue(employee);
            setEditingEmployee(employee);
        }
        setIsModalVisible(true);
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            if (editingEmployee) {
                setEmployees(employees.map(emp => emp.employeeId === editingEmployee.employeeId ? { ...editingEmployee, ...values, updatedAt: new Date() } : emp));
            } else {
                setEmployees([...employees, { ...values, employeeId: Date.now().toString(), createdAt: new Date(), updatedAt: new Date() }]);
            }
            setIsModalVisible(false);
            form.resetFields();
            setEditingEmployee(null);
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDelete = (employeeId: string) => {
        setEmployees(employees.filter(emp => emp.employeeId !== employeeId));
    };

    const handleEdit = (employeeId: string) => {
        const employee = employees.find(emp => emp.employeeId === employeeId);
        if (employee) {
            showModal(employee);
        }
    };

    const columns = [
        { title: 'Mã nhân viên', dataIndex: 'employeeId', key: 'employeeId' },
        { title: 'Tên nhân viên', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
        { title: 'Vai trò', dataIndex: 'role', key: 'role' },
        { title: 'Bộ phận', dataIndex: 'department', key: 'department' },
        { title: 'Trạng thái', dataIndex: 'isActive', key: 'isActive', render: (isActive: boolean) => isActive ? 'Đang làm việc' : 'Đã nghỉ' },
        {
            title: 'Hành động',
            key: 'action',
            render: (_: any, record: EmployeeType) => (
                <>
                    <Button type="text" onClick={() => handleEdit(record.employeeId)}>Sửa</Button>
                    <Button type="text" style={{ color: 'red' }} onClick={() => handleDelete(record.employeeId)}>Xóa</Button>
                </>
            ),
        },
    ];

    return (
        <Card title="Thiết lập nhân viên" style={{ margin: '20px', backgroundColor: '#f0f2f5' }}>
            <Button type="primary" onClick={() => showModal()} style={{ marginBottom: '20px' }}>Thêm nhân viên</Button>
            <Table columns={columns} dataSource={employees} rowKey="employeeId" />
            <Modal title="Thêm nhân viên" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Tên nhân viên" rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="role" label="Vai trò" rules={[{ required: true, message: 'Vui lòng nhập vai trò!' }]}>
                        <Select options={Object.values(ROLES).map(role => ({ label: role, value: role }))} />
                    </Form.Item>
                    <Form.Item name="department" label="Bộ phận" rules={[{ required: true, message: 'Vui lòng nhập bộ phận!' }]}>
                        <Select
                            options={[
                                { label: 'Kế toán', value: 'Kế toán' },
                                { label: 'Kho Hàn', value: 'Kho Hàn' },
                                { label: 'Kho Việt Nam', value: 'Kho Việt Nam' },
                                {label :'Quản lý', value: 'Quản lý'},
                                // ... other departments
                            ]}
                            onChange={(value) => {
                                if (value === 'Kế toán') {
                                    alert('Bộ phận Kế toán có thể có nhiều nhân viên, hãy quản lý cẩn thận!');
                                }
                            }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    )
}

export default Employee;
