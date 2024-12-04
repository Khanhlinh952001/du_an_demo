import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, type MenuProps } from 'antd';
import {
  SettingFilled,
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
    { key: '1', label: <Link href="/pages/statistics" style={{ color: 'inherit' }}>Thống kê</Link>, icon: <BarChartOutlined /> },
    { key: '3', label: <Link href="/pages/search" style={{ color: 'inherit' }}>Tra cứu</Link>, icon: <SearchOutlined /> },
  ];

  // Menu items cho từng role cụ thể
  const roleSpecificItems = {
    [ROLES.ADMIN]: [
      { 
        key: '4', 
        label: 'Quản lý vận đơn',
        icon: <FileAddOutlined />, 
        children: [
          { 
            key: '4-1', 
            label: <Link href="/pages/orders" style={{ color: 'inherit' }}>Tạo vận đơn</Link>, 
            icon: <FileAddOutlined />
          },
          { key: '4-2', label: <Link href="/pages/orders/pickup" style={{ color: 'inherit' }}>Quản lý pickup</Link>, icon: <SendOutlined /> },
          { key: '4-3', label: <Link href="/pages/orders/air" style={{ color: 'inherit' }}>Quản lý đơn bay</Link>, icon: <RocketOutlined /> },
          { key: '4-4', label: <Link href="/pages/orders/sea" style={{ color: 'inherit' }}>Quản lý đơn biển</Link>, icon: <ShopOutlined /> },
        ]
      },
      { key: '5', label: <Link href="/pages/manifest" style={{ color: 'inherit' }}>Tạo manifest</Link>, icon: <ProfileOutlined /> },
      { key: '6', label: <Link href="/pages/debt" style={{ color: 'inherit' }}>Công nợ</Link>, icon: <DollarOutlined /> },
      { 
        key: '7', 
        label: 'Quản lý khách hàng',
        icon: <UserOutlined />,
        children: [
          { key: '7-1', label: <Link href="/pages/sender" style={{ color: 'inherit' }}>Danh sách người gửi </Link>, icon: <UserOutlined /> },
          { key: '7-2', label: <Link href="/pages/recipients" style={{ color: 'inherit' }}>Danh sách người nhận</Link>, icon: <TeamOutlined /> },
        ]
      },
      { 
        key: '10', 
        label: 'Quản lý công ty', 
        icon: <TeamOutlined />,
        children: [
          { key: '10-1', label: <Link href="/pages/companies" style={{ color: 'inherit' }}>Danh sách công ty</Link>, icon: <TeamOutlined /> },
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
          { 
            key: '4', 
            label: 'Tạo vận đơn', 
            icon: <FileAddOutlined />,
            // children: [
            //   { 
            //     key: '4-1-1', 
            //     label: <Link href="/pages/orders/create-single" style={{ color: 'inherit' }}>Tạo một đơn</Link>, 
            //     icon: <FileAddOutlined /> 
            //   },
            //   { 
            //     key: '4-1-2', 
            //     label: <Link href="/pages/orders/create-multiple" style={{ color: 'inherit' }}>Tạo nhiều đơn</Link>, 
            //     icon: <FileAddOutlined /> 
            //   },
            // ]
          },
          { key: '4-2', label: 'Quản lý pickup', icon: <SendOutlined /> },
        ]
      },
      { key: '6', label: 'Công nợ', icon: <DollarOutlined /> },
    ],
    [ROLES.WAREHOUSE_KR || ROLES.WAREHOUSE_VN]: [
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
    { key: '8', label: <Link href="/pages/settings" style={{ color: 'inherit' }}>Hồ sơ của tôi</Link>, icon: <SettingOutlined /> },
    { key: '9', label: <Link href="/pages/introduce" style={{ color: 'inherit' }}>Giới thiệu</Link>, icon: <InfoCircleOutlined /> },
  ];

  return [...commonItems, ...(roleSpecificItems[role as keyof typeof roleSpecificItems] || []), ...profileItems];
};

// Tách menu items ra khỏi component chính và đặt ở ngoài để tránh tạo lại mỗi lần render
const pathToKeyMap: Record<string, string[]> = {
  '/pages/statistics': ['1'],
  '/pages/search': ['3'],
  '/pages/orders': ['4'],
  // '/pages/orders/create-multiple': ['4', '4-1', '4-1-2'],
  '/pages/orders/pickup': ['4', '4-2'],
  '/pages/orders/air': ['4', '4-3'],
  '/pages/orders/sea': ['4', '4-4'],
  '/pages/manifest': ['5'],
  '/pages/debt': ['6'],
  '/pages/sender': ['7', '7-1'],
  '/pages/recipients': ['7', '7-2'],
  '/pages/companies': ['10', '10-1'],
  '/pages/settings': ['8'],
  '/pages/introduce': ['9']
};

// Tách userMenuItems ra ngoài component
const baseUserMenuItems: MenuProps['items'] = [
  { key: 'settings', label: 'Cài đặt', icon: <SettingOutlined /> },
  { key: 'logout', label: 'Đăng xuất', icon: <LoginOutlined /> },
];

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<RoleType>(ROLES.ADMIN);
  const pathName = usePathname();
  
  // Sử dụng useMemo để cache menu items
  const sidebarItems = React.useMemo(() => getSidebarItems(role), [role]);
  
  // Sử dụng useMemo cho selectedKeys
  const selectedKeys = React.useMemo(() => pathToKeyMap[pathName] || ['1'], [pathName]);
  
  // Tạo userMenuItems với useMemo
  const userMenuItems = React.useMemo(() => [
    { 
      key: 'role', 
      label: `Vai trò: ${role}`,
      icon: <UserOutlined />,
      disabled: true 
    },
    ...baseUserMenuItems,
  ], [role]);

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
          items={sidebarItems}
          style={{ 
            border: 'none',
            padding: '0 12px',
          }}
        />
      </Sider>

      <Layout style={{ 
        marginLeft: 240,
      }}>
        <Header style={{ 
          background: '#fff', 
          padding: 0, 
          height: '64px',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'flex-end',
            height: '100%',
            padding: '0 24px'
          }}>
            <Button 
              type="text" 
              icon={<QuestionCircleOutlined />}
              style={{ 
                fontSize: '14px',
                color: '#4B5563'
              }}
            >
              Hướng dẫn sử dụng
            </Button>
            <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
              <div style={{ 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center',
                marginLeft: 16
              }}>
                <Avatar 
                  icon={<UserOutlined />} 
                  style={{ backgroundColor: '#E5E7EB' }}
                />
                <span style={{ 
                  marginLeft: 8,
                  color: '#111927',
                  fontSize: '14px'
                }}>Tài khoản</span>
                <DownOutlined style={{ 
                  marginLeft: 8,
                  fontSize: '12px',
                  color: '#6B7280'
                }} />
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
