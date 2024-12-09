import { PickupInfo } from '@/types/Pickup';
import { Button, Space, Tag, Tooltip, Image } from 'antd';
import { PhoneOutlined, FacebookFilled, MessageFilled, WechatOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';

export const createColumns = (setSelectedPickup: (pickup: PickupInfo) => void, setIsModalOpen: (isOpen: boolean) => void) => [
    {
        title: 'Mã Pickup',
        dataIndex: 'pickupId',
        key: 'pickupId',
        width: 120,
    },
    {
        title: 'Thông tin người gửi',
        key:'SenderInformation',
        children: [
            {
                title: 'Tên',
                dataIndex: 'senderName',
                key: 'senderName',
                width: 150,
            },
            {
                title: 'Liên hệ',
                key: 'contactInfo',
                width: 150,
                render: (_: any, record: PickupInfo) => (
                    <Space>
                        {record.senderPhone && (
                            <Tooltip title={record.senderPhone}>
                                <PhoneOutlined className="text-blue-500" />
                            </Tooltip>
                        )}
                        {record.senderContactChannels?.includes('Facebook') && (
                            <Tooltip title="Facebook">
                                <FacebookFilled className="text-blue-600" />
                            </Tooltip>
                        )}
                        {record.senderContactChannels?.includes('Zalo') && (
                            <Tooltip title="Zalo">
                                <MessageFilled className="text-blue-400" />
                            </Tooltip>
                        )}
                        {record.senderContactChannels?.includes('KakaoTalk') && (
                            <Tooltip title="KakaoTalk">
                                <WechatOutlined className="text-yellow-500" />
                            </Tooltip>
                        )}
                    </Space>
                ),
            },
            {
                title: 'Địa chỉ',
                dataIndex: 'senderAddress',
                key: 'senderAddress',
                width: 200,
                ellipsis: true,
            },
        ],
    },
    {
        title: 'Thông tin lấy hàng',
        key:'PickUpInformation',
        children: [
            {
                title: 'Địa chỉ',
                dataIndex: 'pickupAddress',
                key: 'pickupAddress',
                width: 200,
                ellipsis: true,
            },
            {
                title: 'SĐT',
                dataIndex: 'pickupPhone',
                key: 'pickupPhone',
                width: 120,
            },
            {
                title: 'Thời gian',
                key: 'pickupTime',
                width: 200,
                render: (_:any, record: PickupInfo) => (
                    <Space direction="vertical" size="small">
                        <span>{dayjs(record.pickupDate).format('DD/MM/YYYY')}</span>
                        {record.preferredTimeSlot && (
                            <Tag color="blue">{record.preferredTimeSlot}</Tag>
                        )}
                    </Space>
                ),
            },
        ],
    },
    {
        title: 'Chi tiết gói hàng',
        key:'PackInformation',
        children: [
            {
                title: 'Số kiện',
                dataIndex: 'packageCount',
                key: 'packageCount',
                width: 100,
            },
            {
                title: 'Ghi chú',
                dataIndex: 'specialInstructions',
                key: 'specialInstructions',
                width: 200,
                ellipsis: true,
            },
        ],
    },
    {
        title: 'Trạng thái',
        key: 'status',
        width: 120,
        render: (_:any, record: PickupInfo) => {
            const statusColors = {
                pending: 'orange',
                confirmed: 'blue',
                in_progress: 'processing',
                completed: 'success',
                cancelled: 'error',
            };
            return <Tag color={statusColors[record.status]}>{record.status}</Tag>;
        },
    },
    {
        title: 'Phí pickup',
        dataIndex: 'pickupFee',
        key: 'pickupFee',
        width: 120,
        render: (fee: number) => fee ? `${fee.toLocaleString()}đ` : '-',
    },
    {
        title: 'Thời gian',
        key:'time',
        children: [
            {
                title: 'Tạo',
                dataIndex: 'createdAt',
                key: 'createdAt',
                width: 150,
                render: (date: Date) => dayjs(date).format('DD/MM/YYYY HH:mm'),
            },
            {
                title: 'Cập nhật',
                dataIndex: 'updatedAt',
                key: 'updatedAt',
                width: 150,
                render: (date: Date) => dayjs(date).format('DD/MM/YYYY HH:mm'),
            },
        ],
    },
    {
        title: 'Thao tác',
        key: 'action',
        fixed: 'right' as const,
        width: 100,
        render: (_: any, record: PickupInfo) => (
            <Button 
                type="primary"
                onClick={() => {
                    setSelectedPickup(record);
                    setIsModalOpen(true);
                }}
            >
                Chi tiết
            </Button>
        ),
    },
];
