'use client';

import React from 'react';
import { Typography, Card, Row, Col, Timeline, Statistic } from 'antd';
import { GlobalOutlined, TeamOutlined, CarOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const IntroducePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Typography className="text-center mb-16">
          <Title level={1} className="!text-red-800">Giới thiệu về chúng tôi</Title>
          <Paragraph className="text-lg text-red-600">
            Chuyên cung cấp dịch vụ vận chuyển hàng hóa hai chiều Hàn Quốc - Việt Nam
            Order và mua hộ hàng hóa - Xuất nhập khẩu uy tín
          </Paragraph>
        </Typography>

        {/* Thông tin chính - thêm shadow và hover effect */}
        <Card className="mb-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Statistic 
                title={<span className="text-red-600">Năm kinh nghiệm</span>}
                value={5}
                prefix={<TeamOutlined className="text-red-500" />}
                suffix="+"
                className="hover:scale-105 transition-transform duration-300"
              />
            </Col>
            <Col xs={24} md={8}>
              <Statistic 
                title="Đơn hàng thành công"
                value={1000}
                prefix={<CheckCircleOutlined />}
                suffix="+"
              />
            </Col>
            <Col xs={24} md={8}>
              <Statistic 
                title="Đối tác tại Hàn Quốc"
                value={50}
                prefix={<GlobalOutlined />}
                suffix="+"
              />
            </Col>
          </Row>
        </Card>

        {/* Dịch vụ chính - thêm gradient và hover effects */}
        <Title level={2} className="text-center mb-8 !text-red-800">Dịch vụ của chúng tôi</Title>
        <Row gutter={[24, 24]} className="mb-12">
          <Col xs={24} md={8}>
            <Card 
              title={<span className="text-red-700">Vận chuyển hàng hóa</span>}
              className="h-full hover:shadow-xl transition-shadow duration-300 border-t-4 border-red-500"
              headStyle={{ background: 'linear-gradient(to right, #FEE2E2, #FFFFFF)' }}
            >
              <ul className="list-disc pl-4">
                <li>Vận chuyển hàng từ Hàn Quốc về Việt Nam</li>
                <li>Vận chuyển hàng từ Việt Nam đi Hàn Quốc</li>
                <li>Dịch vụ door-to-door</li>
                <li>Vận chuyển hàng container</li>
              </ul>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card 
              title={<span className="text-red-700">Mua hộ - Order</span>}
              className="h-full hover:shadow-xl transition-shadow duration-300 border-t-4 border-red-500"
              headStyle={{ background: 'linear-gradient(to right, #FEE2E2, #FFFFFF)' }}
            >
              <ul className="list-disc pl-4">
                <li>Mua hộ hàng hóa từ Hàn Quốc</li>
                <li>Tư vấn sản phẩm</li>
                <li>Kiểm tra chất lượng</li>
                <li>Đóng gói cẩn thận</li>
              </ul>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card 
              title={<span className="text-red-700">Xuất nhập khẩu</span>}
              className="h-full hover:shadow-xl transition-shadow duration-300 border-t-4 border-red-500"
              headStyle={{ background: 'linear-gradient(to right, #FEE2E2, #FFFFFF)' }}
            >
              <ul className="list-disc pl-4">
                <li>Tư vấn thủ tục xuất nhập khẩu</li>
                <li>Khai báo hải quan</li>
                <li>Giấy phép xuất nhập khẩu</li>
                <li>Bảo hiểm hàng hóa</li>
              </ul>
            </Card>
          </Col>
        </Row>

        {/* Quy trình làm việc - thêm background và border */}
        <Title level={2} className="text-center mb-8 !text-red-800">Quy trình làm việc</Title>
        <Card 
          className="mb-12 shadow-lg bg-gradient-to-r from-red-50 to-white"
          bordered={false}
        >
          <Timeline
            items={[
              {
                color: 'red',
                children: 'Tiếp nhận yêu cầu từ khách hàng',
              },
              {
                color: 'red',
                children: 'Tư vấn và báo giá chi tiết',
              },
              {
                color: 'red',
                children: 'Xác nhận đơn hàng và thanh toán',
              },
              {
                color: 'red',
                children: 'Thực hiện dịch vụ (vận chuyển/mua hộ/xuất nhập khẩu)',
              },
              {
                color: 'green',
                children: 'Giao hàng và hoàn tất dịch vụ',
              },
            ]}
          />
        </Card>

        {/* Cam kết - thêm hover effects và gradients */}
        <Card 
          title={<span className="text-red-700 text-xl">Cam kết của chúng tôi</span>}
          className="mb-12"
          headStyle={{ background: 'linear-gradient(to right, #FEE2E2, #FFFFFF)' }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={6}>
              <Card 
                type="inner" 
                title="An toàn"
                className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-red-500"
              >
                Đảm bảo hàng hóa nguyên vẹn
              </Card>
            </Col>
            <Col xs={24} md={6}>
              <Card 
                type="inner" 
                title="Nhanh chóng"
                className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-red-500"
              >
                Thời gian vận chuyển tối ưu
              </Card>
            </Col>
            <Col xs={24} md={6}>
              <Card 
                type="inner" 
                title="Giá cả"
                className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-red-500"
              >
                Chi phí cạnh tranh, minh bạch
              </Card>
            </Col>
            <Col xs={24} md={6}>
              <Card 
                type="inner" 
                title="Hỗ trợ"
                className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-red-500"
              >
                Tư vấn 24/7, theo dõi đơn hàng
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default IntroducePage;
