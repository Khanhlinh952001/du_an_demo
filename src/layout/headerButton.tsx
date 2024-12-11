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
  
export const headerButtons = [
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
