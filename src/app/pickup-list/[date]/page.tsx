"use client"
import { useState, useEffect } from 'react';
import { Card, List, Tag, Button, Modal, Input, message } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { PickupInfo } from '@/types/Pickup';
import { mockPickups } from '@/mocks/PickupMock';
import dayjs from 'dayjs';

export default function PickupListPage({ params }: { params: { date: string } }) {
    const [pickups, setPickups] = useState<PickupInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [updateModal, setUpdateModal] = useState<{
        visible: boolean;
        pickup?: PickupInfo;
    }>({ visible: false });
    const [note, setNote] = useState('');
    const [cancelModal, setCancelModal] = useState<{
        visible: boolean;
        pickup?: PickupInfo;
    }>({ visible: false });
    const [cancelReason, setCancelReason] = useState('');
    const isToday = dayjs(params.date).isSame(dayjs(), 'day');

    const handleStatusUpdate = async () => {
        if (!updateModal.pickup) return;

        try {
            const updatedPickup: PickupInfo = {
                ...updateModal.pickup,
                status: 'completed',
                statusHistory: [
                    ...(updateModal.pickup.statusHistory || []),
                    {
                        status: 'completed',
                        timestamp: new Date(),
                        updatedBy: 'pickup-staff'
                    }
                ],
                updatedAt: new Date(),
                updatedBy: 'pickup-staff'
            };

            setPickups(prev => 
                prev.map(p => p.pickupId === updatedPickup.pickupId ? updatedPickup : p)
            );

            message.success('Xác nhận lấy hàng thành công');
            setUpdateModal({ visible: false });
        } catch (error) {
            message.error('Có lỗi xảy ra khi cập nhật');
        }
    };

    const handleCancel = async () => {
        if (!cancelModal.pickup) return;

        try {
            const updatedPickup: PickupInfo = {
                ...cancelModal.pickup,
                status: 'cancelled',
                statusHistory: [
                    ...(cancelModal.pickup.statusHistory || []),
                    {
                        status: 'cancelled',
                        timestamp: new Date(),
                        note: cancelReason,
                        updatedBy: 'pickup-staff'
                    }
                ],
                updatedAt: new Date(),
                updatedBy: 'pickup-staff'
            };

            setPickups(prev => 
                prev.map(p => p.pickupId === updatedPickup.pickupId ? updatedPickup : p)
            );

            message.success('Đã hủy đơn hàng');
            setCancelModal({ visible: false });
            setCancelReason('');
        } catch (error) {
            message.error('Có lỗi xảy ra khi hủy đơn');
        }
    };

    useEffect(() => {
        const fetchPickups = async () => {
            try {
                // Filter pickups for the specific date and added to today's list
                const datePickups = mockPickups.filter(pickup => 
                    dayjs(pickup.pickupDate).format('YYYY-MM-DD') === params.date &&
                    pickup.isAddedToTodayList
                );
                setPickups(datePickups);
            } catch (error) {
                message.error('Không thể tải danh sách pickup');
            } finally {
                setLoading(false);
            }
        };

        fetchPickups();
    }, [params.date]);

    return (
        <div className="p-4">
            <Card>
                <div className="mb-4">
                    <h1 className="text-xl font-bold">
                        Danh sách lấy hàng ngày {dayjs(params.date).format('DD/MM/YYYY')}
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Tổng số đơn: {pickups.length} | 
                        Đã lấy: {pickups.filter(p => p.status === 'completed').length} | 
                        Chưa lấy: {pickups.filter(p => p.status !== 'completed').length}
                    </p>
                </div>

                <List
                    dataSource={pickups}
                    loading={loading}
                    renderItem={(pickup: PickupInfo) => (
                        <Card 
                            className="mb-4"
                            size="small"
                        >
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Mã PickUp: {pickup.pickupId}</span>
                                    <Tag color={
                                        pickup.status === 'completed' ? 'success' :
                                        pickup.status === 'pending' ? 'orange' :
                                        pickup.status === 'confirmed' ? 'blue' :
                                        pickup.status === 'in_progress' ? 'processing' : 'error'
                                    }>
                                        {pickup.status}
                                    </Tag>
                                </div>

                                <div className="text-sm space-y-1">
                                    <p><strong>Người gửi:</strong> {pickup.senderName}</p>
                                    <p><strong>SĐT:</strong> {pickup.senderPhone}</p>
                                    <p><strong>Địa chỉ:</strong> {pickup.senderAddress}</p>
                                    <p><strong>Số lượng:</strong> {pickup.packageCount}</p>
                                    {pickup.specialInstructions && (
                                        <p><strong>Ghi chú:</strong> {pickup.specialInstructions}</p>
                                    )}
                                </div>

                                {isToday && pickup.status !== 'completed' && pickup.status !== 'cancelled' && (
                                    <div className="mt-3 space-y-2">
                                        <Button
                                            type="primary"
                                            block
                                            onClick={() => setUpdateModal({ visible: true, pickup })}
                                        >
                                            Xác nhận lấy hàng
                                        </Button>
                                        <Button
                                            danger
                                            block
                                            onClick={() => setCancelModal({ visible: true, pickup })}
                                        >
                                            Hủy đơn
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Card>
                    )}
                />

                <Modal
                    title="Xác nhận lấy hàng"
                    open={updateModal.visible}
                    onCancel={() => setUpdateModal({ visible: false })}
                    footer={null}
                >
                    <div className="space-y-4">
                        <div>
                            <p className="font-medium">Mã PickUp: {updateModal.pickup?.pickupId}</p>
                            <p>Người gửi: {updateModal.pickup?.senderName}</p>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <Button onClick={() => setUpdateModal({ visible: false })}>
                                Đóng
                            </Button>
                            <Button 
                                type="primary"
                                onClick={handleStatusUpdate}
                            >
                                Xác nhận đã lấy hàng
                            </Button>
                        </div>
                    </div>
                </Modal>

                <Modal
                    title="Hủy đơn hàng"
                    open={cancelModal.visible}
                    onCancel={() => setCancelModal({ visible: false })}
                    footer={null}
                >
                    <div className="space-y-4">
                        <div>
                            <p className="font-medium">Mã PickUp: {cancelModal.pickup?.pickupId}</p>
                            <p>Người gửi: {cancelModal.pickup?.senderName}</p>
                        </div>
                        
                        <Input.TextArea
                            value={cancelReason}
                            placeholder="Vui lòng nhập lý do hủy đơn *"
                            rows={4}
                            onChange={(e) => setCancelReason(e.target.value)}
                            required
                        />

                        <div className="flex justify-end space-x-2">
                            <Button onClick={() => setCancelModal({ visible: false })}>
                                Đóng
                            </Button>
                            <Button 
                                danger
                                onClick={handleCancel}
                                disabled={!cancelReason.trim()}
                            >
                                Xác nhận hủy
                            </Button>
                        </div>
                    </div>
                </Modal>
            </Card>
        </div>
    );
} 
