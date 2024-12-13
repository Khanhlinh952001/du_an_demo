import { Card, Table, Tag, Button, Tooltip, Badge, Space, message } from "antd";
import { useSystemNotifications } from "@/hooks/useSystemNotifications";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { formatDate } from "@/utils/format";
import { ColumnType } from "antd/es/table";
import { SystemNotifications as SystemNotificationsType } from "@/types/AdminSettings";

function SystemNotifications() {
    const { user } = useAuth();
    const { 
        notifications, 
        loading, 
        markMultipleAsRead,
        getNotifications 
    } = useSystemNotifications(user?.companyId || '', user?.uid || '');

    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    const handleMarkAsRead = async () => {
        if (selectedRows.length === 0) return;
        
        try {
            await markMultipleAsRead(selectedRows);
            setSelectedRows([]);
        } catch (error) {
            message.error('Không thể đánh dấu đã đọc');
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'warning':
                return 'red';
            case 'update':
                return 'blue';
            default:
                return 'green';
        }
    };

    const columns = [
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => formatDate(new Date(date)),
            sorter: (a: any, b: any) => 
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            render: (title: string, record: any) => (
                <Space>
                    {!record.readBy?.includes(user?.uid) && (
                        <Badge status="processing" />
                    )}
                    {title}
                </Space>
            )
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
            width: '40%'
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            render: (type: string) => (
                <Tag color={getTypeColor(type)}>
                    {type.toUpperCase()}
                </Tag>
            ),
            filters: [
                { text: 'Cập nhật', value: 'update' },
                { text: 'Cảnh báo', value: 'warning' },
                { text: 'Thông tin', value: 'info' }
            ],
            onFilter: (value: string, record: any) => record.type === value
        },
        {
            title: 'Module',
            dataIndex: 'module',
            key: 'module',
            filters: [
                { text: 'Đơn hàng', value: 'Orders' },
                { text: 'Khách hàng', value: 'Customers' },
                { text: 'Kho', value: 'Inventory' },
                { text: 'Manifest', value: 'Manifest' }
            ],
            onFilter: (value: string, record: any) => record.module === value
        },
        {
            title: 'Người tạo',
            dataIndex: 'createdBy',
            key: 'createdBy',
            render: (userId: string) => {
                // Ở đây bạn có thể thêm logic để hiển thị tên người dùng
                return userId;
            }
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[]) => {
            setSelectedRows(selectedRowKeys as string[]);
        },
        selectedRowKeys: selectedRows
    };

    return ( 
        <Card 
            title={
                <Space>
                    Thông báo hệ thống
                    {selectedRows.length > 0 && (
                        <Button 
                            type="primary" 
                            onClick={handleMarkAsRead}
                        >
                            Đánh dấu đã đọc ({selectedRows.length})
                        </Button>
                    )}
                </Space>
            }
            style={{ 
                margin: '20px', 
                backgroundColor: '#f0f2f5', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
            }}
        >
            <Table 
                columns={columns as ColumnType<SystemNotificationsType>[]   } 
                dataSource={notifications}
                rowKey="id"
                rowSelection={rowSelection}
                loading={loading}
                bordered 
                size="middle" 
                pagination={{ 
                    pageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total) => `Tổng số ${total} thông báo`
                }}
            />
        </Card>
    );
}

export default SystemNotifications;
