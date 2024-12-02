"use client"
import React from 'react';
import { Card, Row, Col, Typography, Carousel } from 'antd';
import { ShoppingOutlined, GiftOutlined, CarOutlined } from '@ant-design/icons';
import MainLayout from '@/layout/MainLayout';
const { Title, Paragraph } = Typography;

const HomePage = () => {
  const ads = [
    {
      id: 1,
      title: "Khuyến mãi đặc biệt",
      description: "Giảm giá 50% cho tất cả sản phẩm",
      icon: <ShoppingOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
      image: "/images/promo1.jpg",
    },
    {
      id: 2, 
      title: "Sản phẩm mới",
      description: "Khám phá bộ sưu tập mới nhất",
      icon: <GiftOutlined style={{ fontSize: '32px', color: '#52c41a' }} />,
      image: "/images/new-collection.jpg",
    },
    {
      id: 3,
      title: "Miễn phí vận chuyển",
      description: "Cho đơn hàng từ 500k",
      icon: <CarOutlined style={{ fontSize: '32px', color: '#faad14' }} />,
      image: "/images/free-shipping.jpg",
    }
  ];

  return (
    <MainLayout >
      {/* Banner Carousel */}
      <Carousel autoplay>
        {ads.map(ad => (
          <div key={ad.id}>
            <img 
              src={ad.image} 
              alt={ad.title}
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
          </div>
        ))}
      </Carousel>

      {/* Ads Cards */}
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        {ads.map(ad => (
          <Col key={ad.id} xs={24} sm={12} md={8}>
            <Card 
              hoverable
              style={{ height: '100%' }}
            >
              <div style={{ textAlign: 'center' }}>
                {ad.icon}
                <Title level={4} style={{ marginTop: '16px' }}>{ad.title}</Title>
                <Paragraph>{ad.description}</Paragraph>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </MainLayout>
  );
};

export default HomePage;
