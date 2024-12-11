import React from 'react';
import { Avatar, Dropdown, Button, MenuProps } from 'antd';
import { UserOutlined, DownOutlined, InfoCircleOutlined, LoginOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useAuthContext } from '@/provider/AuthProvider';

const UserMenu: React.FC = () => {
    const { logout, user } = useAuthContext();

    const userMenuItems: MenuProps['items'] = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: <Link href="/pages/profile">Hồ sơ của tôi</Link>
        },
        // {
        //     type: 'divider'
        // },

        {
            key: 'roles',

            icon: <UsergroupAddOutlined />,
            label: <div> {user?.role || "Manager"} </div>
        },
         {
            key: 'logout',
            onClick: () => {
                logout();
            },
            label: <div className='text-red-400'><LoginOutlined className='mr-2' />Đăng xuất</div>
        },
    ];

    return (
        <div className="flex items-center px-6">
            {/* <Link href={'/pages/profile'}>
                <Button
                    type="text"
                    icon={<InfoCircleOutlined />}
                    className="text-sm mr-4"
                >
                    Hồ sơ của tôi
                </Button>
            </Link> */}

            <Dropdown
                menu={{ items: userMenuItems }}
                trigger={['click']}
                placement="bottomRight"
            >
                <div className="flex items-center cursor-pointer">
                    <Avatar icon={<UserOutlined />} src={user?.avatar} />
                    <DownOutlined className="ml-2 text-gray-500" />
                </div>
            </Dropdown>
        </div>
    );
};

export default UserMenu;
