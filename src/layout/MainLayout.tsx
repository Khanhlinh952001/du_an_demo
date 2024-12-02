import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, type MenuProps } from 'antd';
import {
  HomeOutlined,
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
  ShopOutlined,
  IdcardOutlined,
  InfoCircleOutlined,
  BarChartOutlined,
  SettingOutlined,
  LoginOutlined
} from '@ant-design/icons';
import Link from 'next/link';
const { Header, Content, Sider } = Layout;

import { ROLES ,RoleType} from '@/constants/constants';
import { usePathname} from 'next/navigation';
// Function to get menu items based on user role
const getSidebarItems = (role: string): MenuProps['items'] => {
  // Menu items chung cho tất cả các role
  const commonItems = [
    { key: '1', label: <Link href="/pages/home">Home</Link>, icon: <HomeOutlined /> },
    { key: '3', label: <Link href="/pages/search">Tra cứu</Link>, icon: <SearchOutlined /> },
  ];

  // Menu items cho từng role cụ thể
  const roleSpecificItems = {
    [ROLES.ADMIN]: [
      { key: '2', label: <Link href="/statistics">Thống kê</Link>, icon: <BarChartOutlined /> },
      { 
        key: '4', 
        label: 'Quản lý vận đơn',
        icon: <FileAddOutlined />, 
        children: [
          { key: '4-1', label: 'Tạo vận đơn', icon: <FileAddOutlined /> },
          { key: '4-2', label: 'Quản lý pickup', icon: <SendOutlined /> },
          { key: '4-3', label: 'Quản lý đơn bay', icon: <RocketOutlined /> },
          { key: '4-4', label: 'Quản lý đơn biển', icon: <ShopOutlined /> },
        ]
      },
      { key: '5', label: 'Tạo manifest', icon: <ProfileOutlined /> },
      { key: '6', label: 'Công nợ', icon: <DollarOutlined /> },
      { 
        key: '7', 
        label: 'Quản lý khách hàng',
        icon: <UserOutlined />,
        children: [
          { key: '7-1', label: 'Khách hàng', icon: <UserOutlined /> },
          { key: '7-2', label: 'Danh sách người nhận', icon: <TeamOutlined /> },
        ]
      },
      { 
        key: '10', 
        label: 'Quản lý công ty', 
        icon: <TeamOutlined />,
        children: [
          { key: '10-1', label: 'Danh sách công ty', icon: <TeamOutlined /> },
          { key: '10-2', label: 'Thêm công ty mới', icon: <FileAddOutlined /> },
        ]
      },
    ],
    [ROLES.MANAGER]: [
      { key: '2', label: <Link href="/statistics">Thống kê</Link>, icon: <BarChartOutlined /> },
      { 
        key: '4', 
        label: 'Quản lý vận đơn',
        icon: <FileAddOutlined />, 
        children: [
          { key: '4-1', label: 'Tạo vận đơn', icon: <FileAddOutlined /> },
          { key: '4-2', label: 'Quản lý pickup', icon: <SendOutlined /> },
        ]
      },
      { key: '6', label: 'Công nợ', icon: <DollarOutlined /> },
    ],
    [ROLES.CHECKER]: [
      { 
        key: '4', 
        label: 'Quản lý vận đơn',
        icon: <FileAddOutlined />, 
        children: [
          { key: '4-2', label: 'Quản lý pickup', icon: <SendOutlined /> },
        ]
      },
    ],
    [ROLES.ACCOUNTANT]: [
      { key: '2', label: <Link href="/statistics">Thống kê</Link>, icon: <BarChartOutlined /> },
      { key: '6', label: 'Công nợ', icon: <DollarOutlined /> },
    ],
  };

  // Menu items chung cho profile
  const profileItems = [
    { key: '8', label: <Link href="/profile">Hồ sơ của tôi</Link>, icon: <IdcardOutlined /> },
    { key: '9', label: <Link href="/about">Giới thiệu</Link>, icon: <InfoCircleOutlined /> },
  ];

  return [...commonItems, ...(roleSpecificItems[role as keyof typeof roleSpecificItems] || []), ...profileItems];
};

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<RoleType>(ROLES.ADMIN);
  const pathName = usePathname();
  
  // Add this function to get the selected key based on pathname
  const getSelectedKey = (pathname: string) => {
    const pathToKeyMap: Record<string, string> = {
      '/pages/home': '1',
      '/pages/search': '3',
      '/statistics': '2',
      '/profile': '8',
      '/about': '9'
    };
    return pathToKeyMap[pathname] || '1';
  };

  const userMenuItems: MenuProps['items'] = [
    { 
      key: 'role', 
      label: `Vai trò: ${role}`,
      icon: <UserOutlined />,
      disabled: true 
    },
    { key: 'settings', label: 'Cài đặt', icon: <SettingOutlined /> },
    { key: 'logout', label: 'Đăng xuất', icon: <LoginOutlined /> },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: 0, height: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ padding: '0 24px', fontSize: '20px', fontWeight: 'bold' }}>
            Logo
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '0 24px' }}>
            <Button 
              type="text" 
              icon={<QuestionCircleOutlined />}
              style={{ fontSize: '16px' }}
            >
              Hướng dẫn sử dụng
            </Button>
            <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
              <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <Avatar icon={<UserOutlined />} />
                <span style={{ marginLeft: 8 }}>Tài khoản</span>
                <DownOutlined style={{ marginLeft: 8 }} />
              </div>
            </Dropdown>
          </div>
        </div>
      </Header>

      <Layout>
        <Sider width={200} theme="light">
          <Menu
            mode="vertical"
            selectedKeys={[getSelectedKey(pathName)]}
            items={getSidebarItems(role)}
            style={{ height: '100%', borderRight: 0 }}
          />
        </Sider>

        <Layout style={{ padding: '24px', backgroundColor: '#F9FAFB' }}>
          <Content >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
