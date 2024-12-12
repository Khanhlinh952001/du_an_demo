import { Card, Col, Row, Modal, Button, Input, Form, Table, Select, Checkbox, List, message } from "antd";
import { useState } from "react";
import { ROLES, RoleType } from "@/constants";
// Define RoleType as an enum


// Define PermissionType as a union of string literals in English
type PermissionType = 
    | 'viewAdminPage'
    | 'managePickup'
    | 'manageAirOrders'
    | 'manageSeaOrders'
    | 'manageThecbe'
    | 'lookup'
    | 'createOrders'
    | 'createManifest'
    | 'debt'
    | 'receiveStatistics'
    | 'viewSender'
    | 'viewReceiver';

interface DecentralizationProps {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
}

const mockData: DecentralizationProps[] = [
    { id: '1', name: 'Admin', description: 'Quản lý các nhân viên và các quyền hạn của họ.', isActive: true },
    { id: '2', name: 'Manager', description: 'Quản lý nghiêp vụ logistics', isActive: true },
    { id: '3', name: 'Sales', description: 'Quản lý Khách hàng', isActive: true },
    {
        id: '4',
        name: 'Warehouse_Kr',
        description: 'Quản lý kho Hàn Quốc',
        isActive: true
    },
    {
        id: '5',
        name: 'Warehouse_Vn',
        description: 'Quản lý kho Việt Nam',
        isActive: true
    },
    {
        id: '6',
        name: 'Accountant',
        description: 'Quản lý công nợ',
        isActive: true
    },


]

function Decentralization() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
    const [selectedPermissions, setSelectedPermissions] = useState<PermissionType[]>([]);

    // Comprehensive list of all possible permissions with English values and Vietnamese labels
    const allPermissions: { label: string, value: PermissionType }[] = [
    
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

    const rolePermissions: Record<RoleType, PermissionType[]> = {
        [ROLES.ADMIN]: [
            
            'viewAdminPage', 'managePickup', 'manageAirOrders', 
            'manageSeaOrders', 'manageThecbe', 'lookup', 
            'createOrders', 'createManifest', 'debt',
            'viewSender', 'viewReceiver'
        ],
        [ROLES.EMPLOYEE]: [
            'viewAdminPage', 'managePickup', 'manageAirOrders', 
            'manageSeaOrders', 'manageThecbe', 'lookup', 
            'createOrders', 'createManifest', 'debt',
            'viewSender', 'viewReceiver'
        ],
       
        [ROLES.CUSTOMER]: ['lookup', 'receiveStatistics', 'viewReceiver'],
        [ROLES.WAREHOUSE_KR]: ['managePickup', 'manageAirOrders', 'manageSeaOrders', 'manageThecbe', 'lookup', 'createOrders', 'createManifest', 'debt', 'viewSender', 'viewReceiver'],
        [ROLES.WAREHOUSE_VN]: ['managePickup', 'manageAirOrders', 'manageSeaOrders', 'manageThecbe', 'lookup', 'createOrders', 'createManifest', 'debt', 'viewSender', 'viewReceiver'],
        [ROLES.ACCOUNTANT]: ['debt', 'receiveStatistics', 'viewSender', 'viewReceiver'],
        [ROLES.MANAGER]: ['managePickup', 'manageAirOrders', 'manageSeaOrders', 'manageThecbe', 'lookup', 'createOrders', 'createManifest', 'debt', 'viewSender', 'viewReceiver'],
    };

    const handleRoleChange = (value: RoleType) => {
        setSelectedRole(value);
        setSelectedPermissions(rolePermissions[value] || []);
    };

    const handleSave = () => {
        // Log the selected permissions and role
        console.log(`Selected Role: ${selectedRole}`);
        console.log('Selected Permissions:', selectedPermissions);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // Logic to handle adding a new role
        console.log('Add new role');
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
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
            render: (text: string, record: DecentralizationProps) => (
                <Button onClick={() => handleEdit(record.id)}>Chỉnh sửa</Button>
            ),
        },
    ];

    return ( 
        <Card title="Phân quyền" style={{ marginTop: '20px' ,backgroundColor: '#f0f2f5' }} >
            <Row gutter={24}>
                <Col span={12}>
                    <Card title="Lựa chọn quyền thiết lập" >
                        <Select style={{ width: '100%' }} onChange={handleRoleChange}>
                            <Select.Option value={ROLES.ADMIN}>Admin</Select.Option>
                            <Select.Option value={ROLES.ACCOUNTANT}>Kế toán</Select.Option>
                            <Select.Option value={ROLES.WAREHOUSE_KR}>Nhân viên Kho Hàn Quốc</Select.Option>
                            <Select.Option value={ROLES.WAREHOUSE_VN}>Nhân viên Kho Việt Nam</Select.Option>
                            <Select.Option value={ROLES.MANAGER}>Quản lý</Select.Option>
                            <Select.Option value={ROLES.CUSTOMER}>Khách hàng</Select.Option>
                          
                          
                        </Select>
                        <Form>
                            <Form.Item label="Quyền">
                                <Checkbox.Group
                                    value={selectedPermissions}
                                    onChange={(checkedValues) => setSelectedPermissions(checkedValues as PermissionType[])}
                                >
                                    <List
                                        dataSource={allPermissions}
                                        renderItem={({ label, value }) => (
                                            <List.Item>
                                                <Checkbox value={value}>
                                                    {label}
                                                </Checkbox>
                                            </List.Item>
                                        )}
                                    />
                                </Checkbox.Group>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={handleSave}>Lưu</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Danh sách quyền" >
                        <Table dataSource={mockData} columns={columns} rowKey="id" />
                        <Button type="primary" onClick={showModal}>Thêm mới</Button>
                    </Card>
                </Col>
            </Row>
            <Modal title="Thêm quyền mới" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form>
                    <Form.Item label="Tên quyền" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
}

function handleEdit(id: string) {
    // Logic to edit the role with the given id
    message.info(`Chuc nang dang phát triển`);
    console.log(`Edit role with id: ${id}`);
}

export default Decentralization;
