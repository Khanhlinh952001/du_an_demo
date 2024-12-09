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
  LoginOutlined
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
    label: 'Quản lý vận đơn',
    icon: <FileAddOutlined />, 
    children: [
      { 
        key: '3-1', 
        label: <Link href="/pages/orders" style={{ color: 'inherit' }}>Tạo vận đơn</Link>, 
        icon: <FileAddOutlined />
      },
      { key: '3-2', label: <Link href="/pages/orders/pickup" style={{ color: 'inherit' }}>Quản lý pickup</Link>, icon: <SendOutlined /> },
      { key: '3-3', label: <Link href="/pages/orders/manage" style={{ color: 'inherit' }}>Quản lý đơn</Link>, icon: <RocketOutlined /> }
    ]
  },
  { key: '4', label: <Link href="/pages/manifest" style={{ color: 'inherit' }}>Tạo manifest</Link>, icon: <ProfileOutlined /> },
  { key: '5', label: <Link href="/pages/debt" style={{ color: 'inherit' }}>Công nợ</Link>, icon: <DollarOutlined /> },
  { key: '6', label: <Link href="/pages/settings" style={{ color: 'inherit' }}>Cài đặt</Link>, icon: <SettingOutlined /> },
];

const pathToKeyMap: Record<string, string[]> = {
  '/pages/search': ['1'],
  '/pages/statistics': ['2'],
  '/pages/orders': ['3', '3-1'],
  '/pages/orders/pickup': ['3', '3-2'],
  '/pages/orders/manage': ['3', '3-3'],
  '/pages/manifest': ['4'],
  '/pages/debt': ['5'],
  '/pages/settings': ['6'],
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
    href: '/pages/orders/manage'
  },
  {
    key: 'intro',
    icon: <InfoCircleOutlined />,
    label: 'Giới thiệu',
    href: '/pages/orders/manage'
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
    return [keys[0]];
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
                className={`text-sm ${
                  pathName === button.href ? 'bg-blue-500 text-white' : 'bg-white'
                }`}
              >
                <Link href={button.href}>{button.label}</Link>
              </Button>
            ))}
            <Button
              type="text" 
              icon={<QuestionCircleOutlined />}
              className={`text-sm ${
                pathName === '/' ? 'bg-green-500' : 'bg-white'
              }`}
            >
              Hướng dẫn sử dụng
            </Button>
          </div>

          <div className="flex items-center px-6">
            <Button
              type="text" 
              icon={<InfoCircleOutlined />}
              className="text-sm mr-4"
            >
              Giới thiệu
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
