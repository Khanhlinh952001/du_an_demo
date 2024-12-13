import { Card, Col, Row, Modal, Button, Input, Form, Table, Select, Checkbox, List, message, Spin } from "antd";
import { useState, useEffect } from "react";
import { ROLES, RoleType } from "@/constants";
import { PermissionType } from "@/constants/decentalization";
import { useDecentralization } from '@/hooks/useDecentralization';
import { useAuth } from '@/hooks/useAuth';
import { CheckboxChangeEvent } from "antd/es/checkbox";

interface Item {
  value: { label: string; value: string };
  checked: boolean;
}

function Decentralization() {
    const { user } = useAuth();
    const { 
        createDecentralization, 
        updateDecentralization,
        getDecentralization,
        loading,
        decentralization
    } = useDecentralization(user?.companyId || '');

    console.log('decentralization', decentralization);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
    const [selectedPermissions, setSelectedPermissions] = useState<PermissionType[]>([]);

    // Danh sách tất cả các quyền có thể
    const allPermissions = [
        { label: 'Xem Trang Admin (View Admin Page)', value: 'viewAdminPage' },
        { label: 'Quản lý pickup (Manage Pickup)', value: 'managePickup' },
        { label: 'Quản lý đơn bay (Manage Air Orders)', value: 'manageAirOrders' },
        { label: 'Quản lý đơn biển (Manage Sea Orders)', value: 'manageSeaOrders' },
        { label: 'Quản lý thecbe (Manage Thecbe)', value: 'manageThecbe' },
        { label: 'Tra cứu (Lookup)', value: 'lookup' },
        { label: 'Tạo vận đơn (Create Orders)', value: 'createOrders' },
        { label: 'Tạo manifest (Create Manifest)', value: 'createManifest' },
        { label: 'Công nợ (Debt)', value: 'debt' },
        { label: 'Người nhận thống kê (Receive Statistics)', value: 'receiveStatistics' },
        { label: 'Xem Người Gửi (View Sender)', value: 'viewSender' },
        { label: 'Xem Người Nhận (View Receiver)', value: 'viewReceiver' }
    ];

    const handleRoleChange = (value: RoleType) => {
        setSelectedRole(value);
        // Tìm và set các quyền hiện có của role được chọn
        const existingPermissions = decentralization.find(item => item.role === value)?.permission || [];
        setSelectedPermissions(existingPermissions as PermissionType[]);
        console.log('Selected Role:', value);
        console.log('Existing Permissions:', existingPermissions);
    };

    const handleSave = async () => {
        if (!selectedRole || !selectedPermissions.length) {
            message.error('Vui lòng chọn role và quyền');
            return;
        }

        try {
            await updateDecentralization(selectedRole, selectedPermissions);
            message.success('Cập nhật quyền thành công');
            await getDecentralization();
        } catch (error) {
            message.error('Cập nhật quyền thất bại');
        }
    };

    const handleOk = async () => {
        if (!selectedRole || !selectedPermissions.length) {
            message.error('Vui lòng chọn role và quyền');
            return;
        }

        try {
            await createDecentralization(selectedRole, selectedPermissions);
            message.success('Thêm quyền mới thành công');
            setIsModalVisible(false);
            await getDecentralization();
        } catch (error) {
            message.error('Thêm quyền mới thất bại');
        }
    };

    const columns = [
        {
            title: 'Tên Cấp bậc',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_: any, record: any) => (
                <Button onClick={() => handleEdit(record.id)}>Chỉnh sửa</Button>
            ),
        },
    ];

    const mockData = [
        { id: '2', name: 'Manager', description: 'Quản lý nghiêp vụ logistics' },
        { id: '4', name: 'Warehouse_Kr', description: 'Quản ly kho Hàn Quốc' },
        { id: '5', name: 'Warehouse_Vn', description: 'Quản lý kho Việt Nam' },
        { id: '6', name: 'Accountant', description: 'Quản lý công nợ' },
    ];

    const handlePermissionChange = (e: CheckboxChangeEvent) => {
        const permissionValue = e.target.value.value;
        const newPermissions = e.target.checked 
            ? [...selectedPermissions, permissionValue as PermissionType]
            : selectedPermissions.filter(p => p !== permissionValue);
        setSelectedPermissions(newPermissions);
    };

    const result: Item[] = allPermissions.map(permission => ({
        value: permission,
        checked: decentralization.some(decentralizationItem => 
            decentralizationItem.role === selectedRole && 
            decentralizationItem.permission.includes(permission.value)
        ),
    }));

    console.log('result', result);

    return (
        <Card title="Phân quyền" style={{ marginTop: '20px', backgroundColor: '#f0f2f5' }}>
            <Spin spinning={loading}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Card title="Lựa chọn quyền thiết lập">
                            <Select 
                                placeholder="Chọn cấp bậc"
                                style={{ width: '100%', marginBottom: '20px' }}
                                onChange={handleRoleChange}
                                value={selectedRole}
                            >
                                {decentralization.map((item, index) => (
                                    <Select.Option key={index} value={item.role}>
                                        {item.role}
                                    </Select.Option>
                                ))}
                            </Select>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {result.map((item, index) => (
                                    <Checkbox 
                                        key={index} 
                                        checked={selectedPermissions.includes(item.value.value as PermissionType)}
                                        onChange={handlePermissionChange}   
                                        value={item.value}
                                    >
                                        {item.value.label}
                                    </Checkbox>
                                ))}
                            </div>
                            
                            <Button 
                                type="primary" 
                                onClick={handleSave}
                                style={{ marginTop: '20px' }}
                                disabled={!selectedRole}
                            >
                                Lưu
                            </Button>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="Danh sách quyền">
                            <Table 
                                dataSource={mockData} 
                                columns={columns} 
                                rowKey="id" 
                            />
                            <Button 
                                type="primary" 
                                onClick={() => setIsModalVisible(true)}
                            >
                                Thêm mới
                            </Button>
                        </Card>
                    </Col>
                </Row>

                <Modal
                    title="Thêm quyền mới"
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={() => setIsModalVisible(false)}
                >
                    <Form>
                        <Form.Item label="Tên quyền" name="name">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Mô tả" name="description">
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </Spin>
        </Card>
    );
}

function handleEdit(id: string) {
    message.info(`Chức năng đang phát triển`);
    console.log(`Edit role with id: ${id}`);
}

export default Decentralization;
