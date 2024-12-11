import { Card, Table } from "antd";

function SystemNotifications() {
    const columns = [
        {
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'Chức vụ',
            dataIndex: 'position',
            key: 'position',
        },
    ];

    const data = [
        {
            key: '1',
            date: '2023-10-01',
            content: 'Thông báo bảo trì hệ thống.',
            position: 'Quản trị viên',
        },
        {
            key: '2',
            date: '2023-10-02',
            content: 'Cập nhật phần mềm.',
            position: 'Kỹ thuật viên',
        },
        // Thêm dữ liệu khác tại đây
    ];

    return ( 
        <Card 
            title="Thông báo hệ thống" 
            style={{ margin: '20px', backgroundColor: '#f0f2f5', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
        >
            <Table 
                columns={columns} 
                dataSource={data} 
                bordered 
                size="middle" 
                pagination={{ pageSize: 5 }}
            />
        </Card>
     );
}

export default SystemNotifications;
