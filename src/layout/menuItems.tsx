import { MenuProps } from 'antd';
import Link from 'next/link';
import { SearchOutlined, BarChartOutlined, FileAddOutlined, ProfileOutlined, DollarOutlined, UserOutlined, UsergroupAddOutlined, SettingOutlined } from '@ant-design/icons';

export const menuItems: MenuProps['items'] = [
    { key: '1', label: <Link href="/pages/search" style={{ color: 'inherit' }}>Tra cứu</Link>, icon: <SearchOutlined /> },
    { key: '2', label: <Link href="/pages/statistics" style={{ color: 'inherit' }}>Thống kê</Link>, icon: <BarChartOutlined /> },
    { 
      key: '3', 
      icon: <FileAddOutlined />, 
      label: <Link href="/pages/orders" style={{ color: 'inherit' }}>Tạo vận đơn</Link>, 
     
    },
    
    { key: '4', label: <Link href="/pages/manifest" style={{ color: 'inherit' }}>Tạo manifest</Link>, icon: <ProfileOutlined /> },
    { key: '5', label: <Link href="/pages/debt" style={{ color: 'inherit' }}>Công nợ</Link>, icon: <DollarOutlined /> },
    { 
        key: '6', 
        label: <Link href="/pages/sender" style={{ color: 'inherit' }}>Người gửi</Link>,
        icon: <UserOutlined />
      },

      { 
        key: '7', 
        label: <Link href="/pages/recipients" style={{ color: 'inherit' }}>Người nhận</Link>,
        icon: <UserOutlined />
      },
    
  ];
