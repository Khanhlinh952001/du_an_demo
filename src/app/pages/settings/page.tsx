'use client';

import { useState } from 'react';
import { Tabs, Card } from 'antd';
import { FaUserTie, FaMoneyBillWave, FaUsersCog } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';
import MainLayout from '@/layout/MainLayout';
import { UserMockData } from '@/mocks/UserMockData';
import ProfileTab from './components/ProfileTab';
import PricesTab from './components/PricesTab';
import EmployeesTab from './components/EmployeesTab';
import OtherSettingsTab from './components/OtherSettingsTab';
const { TabPane } = Tabs;

export default function SettingsPage() {
  const [currentUser] = useState(UserMockData[0]);

  return (
    <MainLayout>
      <Card className="w-full">
        <h1 className="text-2xl mb-4 font-bold text-gray-800">Cài Đặt Hệ Thống</h1>
        <Tabs defaultActiveKey="profile">
          <TabPane
            tab={<span className="flex items-center"><FaUserTie className="mr-2 text-lg" /> Thông Tin Cá Nhân</span>}
            key="profile"
          >
            <ProfileTab currentUser={currentUser} />
          </TabPane>

          <TabPane
            tab={<span className="flex items-center"><FaMoneyBillWave className="mr-2 text-lg" /> Cài Đặt Giá</span>}
            key="prices"
          >
            <PricesTab currentUser={currentUser} />
          </TabPane>

          <TabPane
            tab={<span className="flex items-center"><FaUsersCog className="mr-2 text-lg" /> Quản Lý Nhân Viên</span>}
            key="employees"
          >
            <EmployeesTab />
          </TabPane>

          <TabPane
            tab={<span className="flex items-center"><MdSettings className="mr-2 text-lg" /> Cài Đặt Khác</span>}
            key="other"
          >
            <OtherSettingsTab currentUser={currentUser} />
          </TabPane>
        </Tabs>
      </Card>
    </MainLayout>
  );
}

