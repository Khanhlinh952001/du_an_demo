import React from 'react';
import Link from 'next/link';
import { Button, Result } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Result
        status="404"
        title="404"
        subTitle={
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-800">
              Không tìm thấy trang
            </h2>
            <p className="text-gray-600">
              Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
            </p>
          </div>
        }
        extra={
          <Link href="/">
            <Button 
              type="primary"
              size="large"
              icon={<HomeOutlined />}
              className="bg-green-600 hover:bg-green-500"
            >
              Quay về trang chủ
            </Button>
          </Link>
        }
      />
    </div>
  );
} 