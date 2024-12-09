
import { UserOutlined, PhoneOutlined } from '@ant-design/icons'; 
// Cập nhật cấu hình columns
  export const columns = [
    {
      title: 'Ngày Xuất',
      dataIndex: 'shipmentDate',
      key: 'shipmentDate',
      width: 120,
      align: 'center' as const,
      render: (text: string) => (
        <div className="font-medium">{text}</div>
      ),
    },
    {
      title: 'Mã Đơn Hàng',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 120,
      align: 'center' as const,
      render: (text: string) => (
        <div className="font-semibold text-blue-600">{text}</div>
      ),
    },
    {
      title: 'Người Gửi',
      dataIndex: 'senderName',
      key: 'senderName',
      render: (text: string) => (
        <div className="flex items-center">
          <UserOutlined className="mr-2 text-gray-500" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'SĐT Người Gửi',
      dataIndex: 'senderPhone',
      key: 'senderPhone',
      render: (text: string) => (
        <div className="flex items-center">
          <PhoneOutlined className="mr-2 text-gray-500" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Địa Chỉ Người Gửi',
      dataIndex: 'senderAddress',
      key: 'senderAddress',
    },
    {
      title: 'Người Nhận',
      dataIndex: 'receiverName',
      key: 'receiverName',
    },
    {
      title: 'SĐT Người Nhận',
      dataIndex: 'receiverPhone',
      key: 'receiverPhone',
    },
    {
      title: 'Khu Vực',
      dataIndex: 'receiverRegion',
      key: 'receiverRegion',
    },
    {
      title: 'Địa Chỉ Người Nhận',
      dataIndex: 'receiverAddress',
      key: 'receiverAddress',
    },
    {
      title: 'Số Kiện',
      dataIndex: 'totalPackages',
      key: 'totalPackages',
    },
    {
      title: 'Trọng Lượng',
      dataIndex: 'weight',
      key: 'weight',
      align: 'right' as const,
      render: (value: number) => (
        <div className="font-medium">{value} kg</div>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      align: 'right' as const,
      render: (value: number) => (
        <div className="font-medium text-green-600">
          {new Intl.NumberFormat('vi-VN', { 
            style: 'currency', 
            currency: 'VND' 
          }).format(value)}
        </div>
      ),
    },
    {
      title: 'Thành Tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      align: 'right' as const,
      render: (value: number) => (
        <div className="font-semibold text-green-700">
          {new Intl.NumberFormat('vi-VN', { 
            style: 'currency', 
            currency: 'VND' 
          }).format(value)}
        </div>
      ),
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center' as const,
      render: (status: string) => {
        const statusConfig: Record<string, { color: string; text: string }> = {
          pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Đang chờ' },
          processing: { color: 'bg-blue-100 text-blue-800', text: 'Đang xử lý' },
          completed: { color: 'bg-green-100 text-green-800', text: 'Hoàn thành' },
          cancelled: { color: 'bg-red-100 text-red-800', text: 'Đã hủy' },
        };
        const config = statusConfig[status] || statusConfig.pending;
        return (
          <span className={`px-2 py-1 rounded-full text-sm ${config.color}`}>
            {config.text}
          </span>
        );
      },
    },
    {
      title: 'Ghi Chú',
      dataIndex: 'note',
      key: 'note',
    },
  ];
