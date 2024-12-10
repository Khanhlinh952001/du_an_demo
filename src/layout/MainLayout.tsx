import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, type MenuProps } from 'antd';
import {
  SearchOutlined,
  FileAddOutlined,
  ProfileOutlined,
  DollarOutlined,
  UserOutlined,
  TeamOutlined,
  DownOutlined,
  QuestionCircleOutlined,
  SendOutlined,
  RocketOutlined,
  InfoCircleOutlined,
  BarChartOutlined,
  SettingOutlined,
  LoginOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import Link from 'next/link';
const { Header, Content, Sider } = Layout;

import { ROLES ,RoleType} from '@/constants';
import { usePathname} from 'next/navigation';

const menuItems: MenuProps['items'] = [
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
    label: 'Danh sách khách hàng',
    icon: <UsergroupAddOutlined />,
    children: [
      { 
        key: '6-1', 
        label: <Link href="/pages/sender" style={{ color: 'inherit' }}>Người gửi</Link>,
        icon: <UserOutlined />
      },
      { 
        key: '6-2', 
        label: <Link href="/pages/recipients" style={{ color: 'inherit' }}>Người nhận</Link>,
        icon: <UserOutlined />
      },
    ]
  },
  { key: '7', label: <Link href="/pages/settings" style={{ color: 'inherit' }}>Cài đặt</Link>, icon: <SettingOutlined /> },
];

const pathToKeyMap: Record<string, string[]> = {
  '/pages/search': ['1'],
  '/pages/statistics': ['2'],
  '/pages/orders': ['3'],
  '/pages/manifest': ['4'],
  '/pages/debt': ['5'],
  '/pages/sender': ['6', '6-1'],
  '/pages/recipients': ['6', '6-2'],
  '/pages/settings': ['7'],
};

// Consolidate header buttons into a configuration array
const headerButtons = [
  { 
    key: 'pickup',
    icon: <SendOutlined />,
    label: 'Quản lý pickup',
    href: '/pages/orders/pickup'
  },
  {
    key: 'air',
    icon: <RocketOutlined />,
    label: 'Quản lý đơn bay',
    href: '/pages/manageAir'
  },
  {
    key: 'sea',
    icon: <ProfileOutlined />,
    label: 'Quản lý đơn biển',
    href: '/pages/manageSea'
  },
  {
    key: 'taekbae',
    icon: <TeamOutlined />,
    label: 'Quản lý taekbae',
    href: '/pages/manageTaekbae'
  },
  {
    key: 'intro',
    icon: <InfoCircleOutlined />,
    label: 'Giới thiệu',
    href: '/pages/'
  }
];

const userMenuItems: MenuProps['items'] = [
  {
    key: 'profile',
    icon: <UserOutlined />,
    label: <Link href="/pages/profile">Hồ sơ của tôi</Link>
  },
  {
    type: 'divider'
  },
  {
    key: 'logout',
    icon: <LoginOutlined />,
    label: 'Đăng xuất'
  }
];

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathName = usePathname();
  const selectedKeys = React.useMemo(() => {
    const keys = pathToKeyMap[pathName] || [''];
    return keys;
  }, [pathName]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        width={240}
        theme="dark"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          borderRight: '1px solid #E5E7EB',
        }}
      >
        <div className="logo" style={{
          height: 64,
          margin: '16px 24px',
          background: '#1890ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
        }}>
          <h1 style={{ color: 'white', margin: 0 }}>LOGO</h1>
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          defaultOpenKeys={selectedKeys}
          items={menuItems}
          style={{ border: 'none', padding: '0 12px' }}
        />
      </Sider>
      <Layout style={{ marginLeft: 240 }}>
        <Header className="bg-white p-0 h-[64px] shadow-sm sticky top-0 z-[1000] flex justify-between">
          <div className="flex items-center space-x-2 h-full px-6">
            {headerButtons.map(button => (
              <Button
                key={button.key}
                type="text"
                icon={button.icon}
                style={{
                  fontSize: '14px',
                  backgroundColor: pathName === button.href ? '#1577ff' : 'white',
                  color: pathName === button.href ? 'white' : 'inherit'
                }}
                onMouseEnter={(e) => {
                  if (pathName === button.href) {
                    e.currentTarget.style.backgroundColor = '#1577ff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathName === button.href) {
                    e.currentTarget.style.backgroundColor = '#1890ff';
                  }
                }}
              >
                <Link href={button.href}>{button.label}</Link>
              </Button>
            ))}

          </div>

          <div className="flex items-center px-6">
            <Button
              type="text" 
              icon={<InfoCircleOutlined />}
              className="text-sm mr-4"
            >
              Hồ sơ của tôi
            </Button>
            <Dropdown 
              menu={{ items: userMenuItems }} 
              trigger={['click']} 
              placement="bottomRight"
            >
              <div className="flex items-center cursor-pointer">
                <Avatar icon={<UserOutlined />} />
                <DownOutlined className="ml-2 text-gray-500" />
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content style={{ 
          padding: '24px',
          minHeight: 280,
          background: '#F9FAFB'
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
