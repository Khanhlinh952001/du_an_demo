import { PickupInfo } from '@/types/Pickup';
import { Button, Space, Tag, Tooltip, Image } from 'antd';
import { PhoneOutlined, FacebookFilled, MessageFilled, WechatOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import { getCustomerById } from '@/utils/orderHelpers';
import { senderMockData } from '@/mocks/senderMockData';
import Link from 'next/link';
import { SiKakaotalk, SiZalo } from 'react-icons/si';
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
                dataIndex: 'senderId',
                key: 'senderName',
                width: 150,
                render: (senderId: string) => getCustomerById(senderMockData , senderId)?.name || '-',
            },
            {
                title: 'Liên hệ',
                dataIndex: 'senderId',
                key: 'contactInfo',
                width: 150,
                render: (senderId: string) => {
                    const customer = getCustomerById(senderMockData, senderId);
                    if (!customer) return '-';
                    
                    return (
                        <Space>
                          
                            <Tooltip title={
                                <Space direction="horizontal">
                                    {customer.contactChannels.includes('Facebook') && (
                                        <Link href={`https://facebook.com/${customer.facebook}`} target="_blank">
                                            <FacebookFilled className='text-blue-500 bg-white rounded p-1' />
                                        </Link>
                                    )}
                                    {customer.contactChannels.includes('Zalo') && (
                                        <Link href={`https://zalo.me/${customer.zalo}`} target="_blank">
                                            <SiZalo className='text-blue-500 bg-white rounded text-xl p-1' />
                                        </Link>
                                    )}
                                    {customer.contactChannels.includes('KakaoTalk') && (
                                           <Link href={`https://kakao.com/${customer.kakaoTalk}`} target="_blank">
                                           <SiKakaotalk className='text-blue-500 bg-white rounded text-xl p-1' />
                                           </Link> 
                                    )}
                                </Space>
                            }>
                                {/* <PhoneOutlined /> */}
                          
                                {customer.phone}
                            </Tooltip>
                        </Space>
                    );
                },
            },
            

            {
                title: 'Địa chỉ',
                dataIndex: 'senderId',
                key: 'senderAddress',
                width: 200,
                ellipsis: true,
                render: (senderId: string) => getCustomerById(senderMockData, senderId)?.address || '-',
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
            {
                title: 'Hình ảnh',
                dataIndex: 'images',
                key: 'images',
                width: 100,
                ellipsis: true,
                render: (images: string[]) => {
                    return images.map((image, index) => (
                        <Image src={image} alt={`Image ${index + 1}`} width={50} height={50} />
                    ));
                },
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
