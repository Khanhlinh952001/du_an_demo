"use client";
import MainLayout from "@/layout/MainLayout";
import { Card } from 'antd';
import RecipientList from '@/components/recipients/RecipientList';

const RecipientPage = () => {
  return (
    <MainLayout>
      <Card className="shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Danh sách người nhận
          </h1>
          <p className="text-gray-500 mt-1 mb-4">
            Quản lý và theo dõi danh sách người nhận
          </p>
        </div>
        
        <RecipientList senderId={""} />
      </Card>
    </MainLayout>
  );
};

export default RecipientPage;
