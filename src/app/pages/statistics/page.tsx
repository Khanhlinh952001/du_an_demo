


"use client"
import React, { useState, useCallback, useEffect } from 'react';
import { Card, Row, Col, Typography, Table, Statistic, Progress, DatePicker, Select, Button, Space, message } from 'antd';
import MainLayout from '@/layout/MainLayout';
import { 
  DollarOutlined, 
  UserOutlined, 
  RiseOutlined, 
  ShoppingCartOutlined,
  CreditCardOutlined,
  TeamOutlined,
  ShoppingOutlined,
  DownloadOutlined,
  FilterOutlined
} from '@ant-design/icons';
import { formatCurrency } from '@/utils/format';
import type { Dayjs } from 'dayjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Column } from '@ant-design/plots';

const { Title } = Typography;
const { Option } = Select;

// Đăng ký các components Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend,
  ArcElement
);

const StatisticsPage = () => {
  // Thêm state cho bộ lọc
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [serviceType, setServiceType] = useState<'all' | 'air' | 'sea'>('all');

  // Thêm state cho dữ liệu đã lọc
  const [filteredData, setFilteredData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    northData: {
      orders: 0,
      revenue: 0,
      growth: 0
    },
    southData: {
      orders: 0,
      revenue: 0,
      growth: 0
    }
  });

  // Hàm xuất báo cáo
  const exportReport = () => {
    // Logic xuất báo cáo Excel/PDF
  };

  // Hàm lọc dữ liệu
  const filterData = useCallback(() => {
    // Kiểm tra điều kiện lọc
    if (!startDate || !endDate) {
      message.warning('Vui lòng chọn khoảng thời gian');
      return;
    }

    // Giả lập API call với các tham số lọc
    const params = {
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
      region: selectedRegion,
      serviceType: serviceType
    };

    // TODO: Thay thế bằng API call thực tế
    console.log('Filtering with params:', params);

    // Giả lập dữ liệu đã lọc
    const mockFilteredData = {
      totalOrders: 1200,
      totalRevenue: 2500000000,
      northData: {
        orders: 520,
        revenue: 1100000000,
        growth: 12
      },
      southData: {
        orders: 680,
        revenue: 1400000000,
        growth: 15
      }
    };

    setFilteredData(mockFilteredData);
    message.success('Đã cập nhật dữ liệu theo bộ lọc');
  }, [startDate, endDate, selectedRegion, serviceType]);

  // Theo dõi thay đổi của bộ lọc
  useEffect(() => {
    if (startDate && endDate) {
      filterData();
    }
  }, [startDate, endDate, selectedRegion, serviceType]);

  // Data mẫu cho biểu đồ doanh số theo phương thức vận chuyển
  const shippingData = [
    { type: 'Đường bay', value: 350000000, region: 'HN' },
    { type: 'Đường bay', value: 420000000, region: 'SGN' },
    { type: 'Đường biển', value: 280000000, region: 'HN' },
    { type: 'Đường biển', value: 310000000, region: 'SGN' },
  ];

  // Thay thế cấu hình biểu đồ cột
  const shippingChartData = {
    labels: ['Đường bay', 'Đường biển'],
    datasets: [
      {
        label: 'HN',
        data: [350000000, 280000000],
        backgroundColor: '#1890ff',
      },
      {
        label: 'SGN',
        data: [420000000, 310000000],
        backgroundColor: '#f5222d',
      },
    ],
  };

  const shippingChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Data cho biểu đồ thanh toán
  const paymentData = [
    { type: 'Đã thanh toán', value: 70 },
    { type: 'Chưa thanh toán', value: 30 },
  ];

  // Thay thế cấu hình biểu đồ tròn
  const paymentChartData = {
    labels: ['Đã thanh toán', 'Chưa thanh toán'],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ['#52c41a', '#fff1f0'],
      },
    ],
  };

  const paymentChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  // Data top khách hàng
  const topCustomersData = [
    { name: 'Công ty A', orders: 150, revenue: 450000000 },
    { name: 'Công ty B', orders: 120, revenue: 380000000 },
    { name: 'Công ty C', orders: 100, revenue: 320000000 },
    { name: 'Công ty D', orders: 90, revenue: 280000000 },
    { name: 'Công ty E', orders: 80, revenue: 250000000 },
  ];

  const topCustomersColumns = [
    { title: 'Tên khách hàng', dataIndex: 'name', key: 'name' },
    { title: 'Số đơn hàng', dataIndex: 'orders', key: 'orders' },
    { title: 'Doanh thu', dataIndex: 'revenue', key: 'revenue',
      render: (value: number) => `${value.toLocaleString()} VNĐ`
    },
  ];

  // Thêm phân tích theo khu vực
  const regionAnalysis = [
    { region: 'Miền Bắc', orders: 450, revenue: 850000000 },
    { region: 'Miền Nam', orders: 520, revenue: 980000000 },
  ];

  // Phân tích theo trạng thái đơn hàng
  const orderStatusData = [
    { status: 'Đang xử lý', count: 150 },
    { status: 'Đang vận chuyển', count: 280 },
    { status: 'Đã giao', count: 420 },
    { status: 'Đã hủy', count: 50 },
  ];

  // Thêm Card cho phân tích xu hướng
  const orderTrends = [
    { date: '2023-01-01', value: 100, type: 'Đường bay' },
    { date: '2023-01-02', value: 120, type: 'Đường bay' },
    { date: '2023-01-03', value: 150, type: 'Đường bay' },
    { date: '2023-01-04', value: 180, type: 'Đường bay' },
    { date: '2023-01-05', value: 200, type: 'Đường bay' },
  ];

  // Thêm Card cho phân tích hiệu suất nhân viên
  const employeePerformanceData = [
    { name: 'Nhân viên A', value: 80 },
    { name: 'Nhân viên B', value: 90 },
    { name: 'Nhân viên C', value: 70 },
    { name: 'Nhân viên D', value: 60 },
    { name: 'Nhân viên E', value: 75 },
  ];

  // Thêm Card cho phân tích khách hàng
  const customerChannelData = [
    { channel: 'Website', value: 50 },
    { channel: 'Mobile App', value: 30 },
    { channel: 'Social Media', value: 20 },
  ];

  // Convert customerChannelData to Chart.js format
  const customerChannelChartData = {
    labels: customerChannelData.map(item => item.channel),
    datasets: [{
      data: customerChannelData.map(item => item.value),
      backgroundColor: ['#1890ff', '#52c41a', '#faad14']
    }]
  };

  // Thêm Card cho phân tích thanh toán
  const paymentMethodData = [
    { method: 'Credit Card', value: 60 },
    { method: 'PayPal', value: 20 },
    { method: 'Bank Transfer', value: 10 },
    { method: 'Cash', value: 10 },
  ];

  // Data so sánh theo khu vực và thời gian
  const compareData = {
    north: {
      thisMonth: {
        orders: 450,
        revenue: 850000000,
        growth: 15 // % tăng trưởng
      },
      lastMonth: {
        orders: 380,
        revenue: 720000000
      }
    },
    south: {
      thisMonth: {
        orders: 520,
        revenue: 980000000,
        growth: 8
      },
      lastMonth: {
        orders: 480,
        revenue: 900000000
      }
    }
  };

  // Thay thế cấu hình biểu đồ đường
  const trendChartData = {
    labels: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05'],
    datasets: [
      {
        label: 'Đường bay',
        data: [100, 120, 150, 180, 200],
        borderColor: '#1890ff',
        tension: 0.4,
      },
    ],
  };

  const trendChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Modify the regional analysis data
  const regionAnalysisData = {
    labels: ['Miền Bắc', 'Miền Nam'],
    datasets: [{
      data: [
        filteredData.northData.orders,
        filteredData.southData.orders
      ],
      backgroundColor: ['#1890ff', '#f5222d'],
    }],
  };

  const regionChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} đơn (${percentage}%)`;
          }
        }
      }
    },
  };

  // Thêm cấu hình cho biểu đồ cột so sánh
  const regionalComparisonData = {
    labels: ['Đơn hàng', 'Doanh thu (tỷ VNĐ)'],
    datasets: [
      {
        label: 'Miền Bắc',
        data: [
          filteredData.northData.orders,
          filteredData.northData.revenue / 1000000000, // Chuyển đổi sang tỷ
        ],
        backgroundColor: '#1890ff',
      },
      {
        label: 'Miền Nam',
        data: [
          filteredData.southData.orders,
          filteredData.southData.revenue / 1000000000, // Chuyển đổi sang tỷ
        ],
        backgroundColor: '#f5222d',
      },
    ],
  };

  const regionalComparisonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'So sánh đơn hàng và doanh thu theo khu vực',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <MainLayout>
      <Title level={2}>Thống kê</Title>

      {/* Thêm bộ lọc và nút xuất báo cáo */}
      <Space style={{ marginBottom: 16 }} size="middle">
        <DatePicker
          onChange={setStartDate}
          placeholder="Từ ngày"
          style={{ width: 150 }}
        />
        <DatePicker
          onChange={setEndDate}
          placeholder="Đến ngày"
          style={{ width: 150 }}
        />
        <Select 
          defaultValue="all" 
          style={{ width: 150 }}
          onChange={setSelectedRegion}
        >
          <Option value="all">Tất cả khu vực</Option>
          <Option value="north">Miền Bắc</Option>
          <Option value="south">Miền Nam</Option>
        </Select>
        <Select 
          defaultValue="all" 
          style={{ width: 150 }}
          onChange={setServiceType}
        >
          <Option value="all">Tất cả dịch vụ</Option>
          <Option value="air">Đường bay</Option>
          <Option value="sea">Đường biển</Option>
        </Select>
        <Button 
          type="primary" 
          icon={<FilterOutlined />}
          onClick={filterData}
        >
          Lọc dữ liệu
        </Button>
        <Button 
          type="default" 
          icon={<DownloadOutlined />}
          onClick={exportReport}
        >
          Xuất báo cáo
        </Button>
      </Space>

      {/* Thống kê tổng quan - Row 1 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card hoverable style={{ backgroundColor: '#e6f7ff', borderRadius: 8 }}>
            <Statistic
              title={<span style={{ color: '#0050b3', fontSize: 16, fontWeight: 600 }}>Tổng khách hàng</span>}
              value={1000}
              prefix={<TeamOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable style={{ backgroundColor: '#f6ffed', borderRadius: 8 }}>
            <Statistic
              title={<span style={{ color: '#237804', fontSize: 16, fontWeight: 600 }}>Tổng đơn hàng </span>}
              value={filteredData.totalOrders}
              prefix={<ShoppingCartOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable style={{ backgroundColor: '#fff7e6', borderRadius: 8 }}>
            <Statistic
              title={<span style={{ color: '#d46b08', fontSize: 16, fontWeight: 600 }}>Doanh thu (theo bộ lọc)</span>}
              value={filteredData.totalRevenue}
              prefix={<DollarOutlined style={{ color: '#fa8c16' }} />}
              suffix="VNĐ"
              valueStyle={{ color: '#fa8c16', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable style={{ backgroundColor: '#f9f0ff', borderRadius: 8 }}>
            <Statistic
              title={<span style={{ color: '#531dab', fontSize: 16, fontWeight: 600 }}>Người nhận</span>}
              value={2700}
              prefix={<UserOutlined style={{ color: '#722ed1' }} />}
              valueStyle={{ color: '#722ed1', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Thống kê chi tiết - Row 2 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card 
            title={<span style={{ color: '#096dd9', fontSize: 16, fontWeight: 600 }}>Tổng tiền cần thanh toán</span>}
            style={{ borderRadius: 8 }}
            hoverable
          >
            <Statistic
              value={2500000000}
              prefix={<CreditCardOutlined style={{ color: '#722ed1' }} />}
              suffix="VNĐ"
              valueStyle={{ color: '#722ed1', fontWeight: 'bold', fontSize: 24 }}
            />
            <div style={{ marginTop: 8, color: '#8c8c8c' }}>
              Tổng số đơn hàng: 150
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card 
            title={<span style={{ color: '#096dd9', fontSize: 16, fontWeight: 600 }}>Đã thanh toán</span>}
            style={{ borderRadius: 8 }}
            hoverable
          >
            <Statistic
              value={1800000000}
              prefix={<DollarOutlined style={{ color: '#52c41a' }} />}
              suffix="VNĐ"
              valueStyle={{ color: '#52c41a', fontWeight: 'bold', fontSize: 24 }}
            />
            <div style={{ marginTop: 8, color: '#8c8c8c' }}>
              Số đơn đã thanh toán: 120
            </div>
          </Card>
        </Col>
      </Row>

      {/* Biểu đồ doanh số và Top khách hàng - Row 3 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card 
            title={<span style={{ color: '#096dd9', fontSize: 16, fontWeight: 600 }}>Phân tích doanh thu</span>}
            style={{ borderRadius: 8 }}
            hoverable
          >
            <Bar data={shippingChartData} options={shippingChartOptions} />
          </Card>
        </Col>
        <Col span={12}>
          <Card 
            title={<span style={{ color: '#096dd9', fontSize: 16, fontWeight: 600 }}>Top khách hàng</span>}
            style={{ borderRadius: 8 }}
            hoverable
          >
            <Table 
              columns={topCustomersColumns} 
              dataSource={topCustomersData} 
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* Thêm Row phân tích mới */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card 
            title={<span style={{ color: '#096dd9', fontSize: 16, fontWeight: 600 }}>Phân tích theo khu vực</span>}
            style={{ borderRadius: 8 }}
            hoverable
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Pie data={regionAnalysisData} options={regionChartOptions} />
              </Col>
              <Col span={12}>
                <Bar data={regionalComparisonData} options={regionalComparisonOptions} />
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic
                    title={<span style={{ color: '#1890ff' }}>Miền Bắc</span>}
                    value={filteredData.northData.orders}
                    suffix="đơn"
                  />
                  <div style={{ marginTop: 8 }}>
                    <span>Doanh thu: </span>
                    <span style={{ color: '#1890ff', fontWeight: 'bold' }}>
                      {formatCurrency(filteredData.northData.revenue)} VNĐ
                    </span>
                  </div>
                  <div style={{ color: '#52c41a' }}>
                    Tăng trưởng: +{filteredData.northData.growth}%
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic
                    title={<span style={{ color: '#f5222d' }}>Miền Nam</span>}
                    value={filteredData.southData.orders}
                    suffix="đơn"
                  />
                  <div style={{ marginTop: 8 }}>
                    <span>Doanh thu: </span>
                    <span style={{ color: '#f5222d', fontWeight: 'bold' }}>
                      {formatCurrency(filteredData.southData.revenue)} VNĐ
                    </span>
                  </div>
                  <div style={{ color: '#52c41a' }}>
                    Tăng trưởng: +{filteredData.southData.growth}%
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card 
            title={<span style={{ color: '#096dd9', fontSize: 16, fontWeight: 600 }}>Trạng thái đơn hàng</span>}
            style={{ borderRadius: 8 }}
            hoverable
          >
            {orderStatusData.map(status => (
              <div key={status.status} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{status.status}</span>
                  <span>{status.count}</span>
                </div>
                <Progress 
                  percent={(status.count / orderStatusData.reduce((acc, curr) => acc + curr.count, 0)) * 100} 
                  showInfo={false}
                />
              </div>
            ))}
          </Card>
        </Col>
        <Col span={8}>
          <Card 
            title={<span style={{ color: '#096dd9', fontSize: 16, fontWeight: 600 }}>Hiệu suất giao hàng</span>}
            style={{ borderRadius: 8 }}
            hoverable
          >
            <Statistic
              title="Tỷ lệ giao hàng thành công"
              value={95.8}
              precision={1}
              prefix={<RiseOutlined />}
              suffix="%"
            />
            <Statistic
              title="Thời gian giao hàng trung bình"
              value={2.3}
              precision={1}
              suffix="ngày"
              style={{ marginTop: 16 }}
            />
          </Card>
        </Col>
      </Row>

      {/* Thêm Card cho phân tích xu hướng */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card 
            title={<span style={{ color: '#096dd9', fontSize: 16, fontWeight: 600 }}>Xu hướng đơn hàng</span>}
            style={{ borderRadius: 8 }}
            hoverable
          >
            <Line data={trendChartData} options={trendChartOptions} />
          </Card>
        </Col>
        <Col span={12}>
          <Card 
            title={<span style={{ color: '#096dd9', fontSize: 16, fontWeight: 600 }}>Phân tích hiệu suất nhân viên</span>}
            style={{ borderRadius: 8 }}
            hoverable
          >
            <Table 
              columns={[
                {
                  title: 'Nhân viên',
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: 'Đơn hàng đã xử lý',
                  dataIndex: 'ordersProcessed', 
                  key: 'ordersProcessed',
                },
                {
                  title: 'Tỷ lệ hoàn thành',
                  dataIndex: 'completionRate',
                  key: 'completionRate',
                  render: (value: number) => `${value}%`
                }
              ]}
              dataSource={employeePerformanceData}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* Thêm Card cho phân tích chi tiết */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card 
            title={<span style={{ color: '#096dd9', fontSize: 16, fontWeight: 600 }}>Phân tích khách hàng</span>}
            style={{ borderRadius: 8 }}
            hoverable
          >
            <Statistic
              title="Tỷ lệ khách hàng mới"
              value={25}
              suffix="%"
              prefix={<UserOutlined />}
            />
            <Pie data={customerChannelChartData} />
          </Card>
        </Col>
        <Col span={8}>
          <Card 
            title={<span style={{ color: '#096dd9', fontSize: 16, fontWeight: 600 }}>Phân tích thanh toán</span>}
            style={{ borderRadius: 8 }}
            hoverable
          >
            <Column
              data={paymentMethodData}
              xField="method"
              yField="value"
              label={{
                position: 'top',
                style: {
                  fill: '#FFFFFF',
                  opacity: 0.6,
                },
              }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card 
            title={<span style={{ color: '#096dd9', fontSize: 16, fontWeight: 600 }}>Thời gian xử lý</span>}
            style={{ borderRadius: 8 }}
            hoverable
          >
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <Progress
                type="dashboard"
                percent={75}
                format={percent => `${percent}%`}
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
              />
              <div style={{ marginTop: 16 }}>
                <Statistic
                  title="Thời gian xử lý trung bình"
                  value={2.5}
                  suffix="ngày"
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Thêm Row phân tích so sánh */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card 
            title={<span style={{ color: '#096dd9', fontSize: 16, fontWeight: 600 }}>Miền Bắc (theo bộ lọc)</span>}
            style={{ borderRadius: 8 }}
            hoverable
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic
                  title="Đơn hàng"
                  value={filteredData.northData.orders}
                  suffix={
                    <span style={{ color: '#52c41a', fontSize: 14 }}>
                      +{filteredData.northData.growth}%
                    </span>
                  }
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Doanh thu"
                  value={filteredData.northData.revenue}
                  suffix="VNĐ"
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card 
            title={<span style={{ color: '#096dd9', fontSize: 16, fontWeight: 600 }}>Miền Nam (theo bộ lọc)</span>}
            style={{ borderRadius: 8 }}
            hoverable
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic
                  title="Đơn hàng"
                  value={filteredData.southData.orders}
                  suffix={
                    <span style={{ color: '#52c41a', fontSize: 14 }}>
                      +{filteredData.southData.growth}%
                    </span>
                  }
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Doanh thu"
                  value={filteredData.southData.revenue}
                  suffix="VNĐ"
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Thêm biểu đồ so sánh */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Card 
            title={<span style={{ color: '#096dd9', fontSize: 16, fontWeight: 600 }}>So sánh doanh thu theo khu vực</span>}
            style={{ borderRadius: 8 }}
            hoverable
          >
            <Column 
              data={[
                { region: 'Miền Bắc', month: 'Tháng trước', value: compareData.north.lastMonth.revenue },
                { region: 'Miền Bắc', month: 'Tháng này', value: compareData.north.thisMonth.revenue },
                { region: 'Miền Nam', month: 'Tháng trước', value: compareData.south.lastMonth.revenue },
                { region: 'Miền Nam', month: 'Tháng này', value: compareData.south.thisMonth.revenue },
              ]}
              isGroup={true}
              xField='region'
              yField='value'
              seriesField='month'
              label={{
                position: 'top',
                layout: [
                  { type: 'interval-adjust-position' },
                  { type: 'interval-hide-overlap' },
                  { type: 'adjust-color' },
                ],
              }}
            />
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default StatisticsPage; 