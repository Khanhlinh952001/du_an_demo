import React from 'react';
import { Avatar, Dropdown, MenuProps } from 'antd';
import { 
  UserOutlined, 
  DownOutlined, 
  LogoutOutlined,
  SettingOutlined,
  UsergroupAddOutlined 
} from '@ant-design/icons';
import Link from 'next/link';
import { useAuthContext } from '@/provider/AuthProvider';

const UserMenu: React.FC = () => {
    const { logout, user } = useAuthContext();

    const userMenuItems: MenuProps['items'] = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: (
              <Link href="/pages/profile">
                <div className="flex items-center py-2 px-1 hover:text-blue-500">
                  <span className="ml-2">Hồ sơ của tôi</span>
                </div>
              </Link>
            )
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: (
              <Link href="/pages/settings">
                <div className="flex items-center py-2 px-1 hover:text-blue-500">
                  <span className="ml-2">Cài đặt</span>
                </div>
              </Link>
            )
        },
        {
            type: 'divider'
        },
        {
            key: 'roles',
            icon: <UsergroupAddOutlined />,
            label: (
              <div className="flex items-center py-2 px-1">
                <span className="ml-2 font-medium">Vai trò: {user?.role}</span>
              </div>
            )
        },
        {
            type: 'divider'
        },
        {
            key: 'logout',
            onClick: logout,
            label: (
              <div className="flex items-center py-2 px-1 text-red-500 hover:text-red-600">
                <LogoutOutlined />
                <span className="ml-2">Đăng xuất</span>
              </div>
            )
        },
    ];

    return (
        <div className="flex items-center px-6">
            <Dropdown
                menu={{ items: userMenuItems }}
                trigger={['click']}
                placement="bottomRight"
            >
                <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200">
                    <Avatar 
                      size="large"
                      icon={<UserOutlined />} 
                      src={user?.avatar}
                      className="border-2 border-gray-200"
                    />
                    <div className="ml-3 hidden md:block">
                      <div className="font-medium text-gray-700">{user?.displayName || 'Người dùng'}</div>
                      <div className="text-sm text-gray-500">{user?.email}</div>
                    </div>
                    <DownOutlined className="ml-2 text-gray-400" />
                </div>
            </Dropdown>
        </div>
    );
};

export default UserMenu;
