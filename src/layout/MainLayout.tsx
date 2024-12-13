import React, { useState, useEffect } from 'react';
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
import { usePathname} from 'next/navigation';
import { useAuthContext } from '@/provider/AuthProvider';
import Login from '@/app/auth/login/page';
import UserMenu from './UserMenu';
import { headerButtons } from './headerButton';
import { menuItems } from './menuItems';
import { useDecentralization } from '@/hooks/useDecentralization';
import { PermissionType } from '@/constants/decentalization';


const pathToKeyMap: Record<string, string[]> = {
  '/pages/search': ['1'],
  '/pages/statistics': ['2'],
  '/pages/orders': ['3'],
  '/pages/manifest': ['4'],
  '/pages/debt': ['5'],
  '/pages/sender': ['6'],
  '/pages/recipients': ['7'],
};

// Consolidate header buttons into a configuration array



const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathName = usePathname();
  const { user } = useAuthContext();
  const { decentralization } = useDecentralization(user?.companyId || '');

  const hasPermission = (requiredPermission: PermissionType) => {
    const userRole = user?.role;
    if (!userRole || !decentralization) return false;
    
    const rolePermissions = decentralization.find(d => d.role === userRole);
    return rolePermissions?.permission.includes(requiredPermission) ?? false;
  };

  const filteredMenuItems = React.useMemo(() => {
    const permissionMap: Record<string, PermissionType> = {
      '1': 'lookup',
      '2': 'receiveStatistics',
      '3': 'createOrders',
      '4': 'createManifest',
      '5': 'debt',
      '6': 'viewSender',
      '7': 'viewReceiver'
    };

    return (menuItems || []).filter(item => {
      if (!item?.key) return false;
      const permission = permissionMap[item.key as string];
      return permission ? hasPermission(permission) : false;
    });
  }, [decentralization]);

  const filteredHeaderButtons = React.useMemo(() => {
    const permissionMap: Record<string, PermissionType> = {
      'pickup': 'managePickup',
      'air': 'manageAirOrders',
      'sea': 'manageSeaOrders',
      'taekbae': 'manageThecbe'
    };

    return headerButtons.filter(button => {
      const permission = permissionMap[button.key];
      return permission ? hasPermission(permission) : false;
    });
  }, [decentralization]);

  const selectedKeys = pathToKeyMap[pathName] || [];

  if (!user) {
    return <Login />;
  }

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
          items={filteredMenuItems}
          style={{ border: 'none', padding: '0 12px' }}
        />
      </Sider>
      <Layout style={{ marginLeft: 240 }}>
        <Header className="bg-white p-0 h-[64px] shadow-sm sticky top-0 z-[1000] flex justify-between">
          <div className="flex items-center space-x-2 h-full px-6">
            {filteredHeaderButtons.map(button => (
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

          <UserMenu />
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
