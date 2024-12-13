import { useState, useCallback } from 'react';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc,
  doc,
  deleteDoc,
  orderBy,
  limit,
  arrayUnion,
  writeBatch
} from 'firebase/firestore';
    import { firestore } from '@/libs/firebase';
import { SystemNotifications } from '@/types/AdminSettings';
import { formatDate } from '@/utils/format';
import { message } from 'antd'; 
import { ROLES } from '@/constants';

export const useSystemNotifications = (companyId: string, userId: string) => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<SystemNotifications[]>([]);
  const NOTIFICATIONS_COLLECTION = 'systemNotifications';

  // Lấy danh sách thông báo với phân trang
  const getNotifications = async (page = 1, pageSize = 10) => {
    try {
      setLoading(true);
      const notificationsRef = collection(firestore, NOTIFICATIONS_COLLECTION);
      const q = query(
        notificationsRef,
        where('companyId', '==', companyId),
        orderBy('createdAt', 'desc'),
        limit(pageSize)
      );

      const querySnapshot = await getDocs(q);
      const notificationsList = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as SystemNotifications[];

      setNotifications(notificationsList);
      return notificationsList;
    } catch (error) {
      console.error('Get notifications error:', error);
      message.error('Không thể tải thông báo');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Tạo thông báo mới
  const createNotification = async (
    title: string,
    content: string,
    type: 'update' | 'warning' | 'info',
    createdBy: string,
    targetUsers?: string[]
  ) => {
    try {
      setLoading(true);
      const newNotification: Omit<SystemNotifications, 'id'> = {
        module: '',
        action: '',
        companyId,
        title,
        content,
        type,
        createdAt: formatDate(new Date()),
        createdBy,
        isRead: false,
        targetRoles: [],
        readBy: []
      };

      const notificationsRef = collection(firestore, NOTIFICATIONS_COLLECTION);
      await addDoc(notificationsRef, newNotification);

      await getNotifications();
      message.success('Đã tạo thông báo mới');
    } catch (error) {
      console.error('Create notification error:', error);
      message.error('Không thể tạo thông báo');
    } finally {
      setLoading(false);
    }
  };

  // Đánh dấu thông báo đã đọc
  const markAsRead = async (notificationId: string, userId: string) => {
    try {
      setLoading(true);
      const notificationRef = doc(firestore, NOTIFICATIONS_COLLECTION, notificationId);
      
      await updateDoc(notificationRef, {
            readBy: arrayUnion(userId)
      });

      await getNotifications();
    } catch (error) {
      console.error('Mark as read error:', error);
      message.error('Không thể cập nhật trạng thái thông báo');
    } finally {
      setLoading(false);
    }
  };

  // Xóa thông báo
  const deleteNotification = async (notificationId: string) => {
    try {
      setLoading(true);
      await deleteDoc(doc(firestore, NOTIFICATIONS_COLLECTION, notificationId));
      
      await getNotifications();
      message.success('Đã xóa thông báo');
    } catch (error) {
      console.error('Delete notification error:', error);
      message.error('Không thể xóa thông báo');
    } finally {
      setLoading(false);
    }
  };

  // Lấy số thông báo chưa đọc
  const getUnreadCount = async (userId: string) => {
    try {
      const notificationsRef = collection(firestore, NOTIFICATIONS_COLLECTION);
      const q = query(
        notificationsRef,
        where('companyId', '==', companyId),
        where('readBy', 'not-in', [userId])
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.size;
    } catch (error) {
      console.error('Get unread count error:', error);
      return 0;
    }
  };

  // Thêm hàm tạo thông báo cho manager
  const createManagerNotification = async (
    module: string,
    action: string,
    content: string,
    createdBy: string,
  ) => {
    try {
      const notificationData: Omit<SystemNotifications, 'id'> = {
        companyId,
        title: `Thông báo từ ${module}`,
        content,
        type: 'info',
        createdAt: formatDate(new Date()),
        createdBy,
        isRead: false,
        targetRoles: [ROLES.MANAGER, ROLES.ADMIN], // Gửi cho Manager và Admin
        readBy: [],
        module,
        action,
      };

      const notificationsRef = collection(firestore, NOTIFICATIONS_COLLECTION);
      await addDoc(notificationsRef, notificationData);
    } catch (error) {
      console.error('Create manager notification error:', error);
    }
  };

  // Thêm markMultipleAsRead vào hook
  const markMultipleAsRead = async (notificationIds: string[]) => {
    try {
      setLoading(true);
      const batch = writeBatch(firestore);

      notificationIds.forEach(id => {
        const notificationRef = doc(firestore, NOTIFICATIONS_COLLECTION, id);
        batch.update(notificationRef, {
          readBy: arrayUnion(userId)
        });
      });

      await batch.commit();
      await getNotifications();
      message.success('Đã đánh dấu đã đọc');
    } catch (error) {
      console.error('Mark multiple as read error:', error);
      message.error('Không thể đánh dấu đã đọc');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    notifications,
    getNotifications,
    createNotification,
    markAsRead,
    markMultipleAsRead,
    deleteNotification,
    
    getUnreadCount,
    createManagerNotification
  };
}; 





// // Trong component xử lý đơn hàng
// const { createManagerNotification } = useSystemNotifications(companyId, userId);

// // Khi nhân viên tạo đơn hàng mới
// const handleCreateOrder = async (orderData: any) => {
//   try {
//     // Logic tạo đơn hàng
//     await createOrder(orderData);
    
//     // Tạo thông báo cho manager
//     await createManagerNotification(
//       'Orders',
//       'create',
//       `Nhân viên ${userName} đã tạo đơn hàng mới ${orderData.orderCode}`,
//       userId,
//       { orderId: orderData.id }
//     );
//   } catch (error) {
//     console.error(error);
//   }
// };

// // Khi nhân viên cập nhật trạng thái đơn
// const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
//   try {
//     // Logic cập nhật trạng thái
//     await updateOrderStatus(orderId, newStatus);
    
//     await createManagerNotification(
//       'Orders',
//       'update_status',
//       `Nhân viên ${userName} đã cập nhật trạng thái đơn hàng ${orderId} thành ${newStatus}`,
//       userId,
//       { orderId, newStatus }
//     );
//   } catch (error) {
//     console.error(error);
//   }
// };

// // Khi nhân viên thay đổi thông tin khách hàng
// const handleUpdateCustomer = async (customerId: string, newData: any) => {
//   try {
//     await updateCustomer(customerId, newData);
    
//     await createManagerNotification(
//       'Customers',
//       'update',
//       `Nhân viên ${userName} đã cập nhật thông tin khách hàng ${customerId}`,
//       userId,
//       { customerId, changes: newData }
//     );
//   } catch (error) {
//     console.error(error);
//   }
// };

// // Khi nhân viên tạo manifest
// const handleCreateManifest = async (manifestData: any) => {
//   try {
//     await createManifest(manifestData);
    
//     await createManagerNotification(
//       'Manifest',
//       'create',
//       `Nhân viên ${userName} đã tạo manifest mới ${manifestData.code}`,
//       userId,
//       { manifestId: manifestData.id }
//     );
//   } catch (error) {
//     console.error(error);
//   }
// };

// // Khi có thay đổi trong kho
// const handleUpdateInventory = async (productId: string, quantity: number) => {
//   try {
//     await updateInventory(productId, quantity);
    
//     await createManagerNotification(
//       'Inventory',
//       'update',
//       `Nhân viên ${userName} đã cập nhật số lượng sản phẩm ${productId}`,
//       userId,
//       { productId, newQuantity: quantity }
//     );
//   } catch (error) {
//     console.error(error);
//   }
// };