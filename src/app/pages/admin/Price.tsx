import { Card } from "antd";
import { Form, InputNumber } from "antd";
import { DollarOutlined, PercentageOutlined } from '@ant-design/icons';

function Price() {
    return ( 
        <Card title="Thiết lập đơn giá" style={{ margin: '20px', backgroundColor: '#f0f2f5', border: '1px solid #' }}>
            <Form layout="vertical">
                <Card title="Order Hàng" style={{ marginBottom: '20px', border: '1px solid #1890ff' }}>
                    <Form.Item label={<span><DollarOutlined style={{ color: 'green' }} /> Tỷ giá Won-VNĐ</span>} name="exchangeRate">
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label={<span><PercentageOutlined style={{ color: 'blue' }} /> Công mua(%)</span>} name="serviceFee">
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Card>
                <Card title="Dịch vụ bay Hàn Việt" style={{ marginBottom: '20px', border: '1px solid #52c41a' }}>
                    <Form.Item label={<span><DollarOutlined style={{ color: 'green' }} /> Đơn giá Hà Nội</span>} name="hanPrice">
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label={<span><DollarOutlined style={{ color: 'green' }} /> Đơn giá HCM</span>} name="sgnPrice">
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Card>
                <Card title="Dịch vụ biển Hàn Việt" style={{ marginBottom: '20px', border: '1px solid #faad14' }}>
                    <Form.Item label={<span><DollarOutlined style={{ color: 'green' }} /> Đơn giá</span>} name="seaPrice">
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Card>
                <Card title="Dịch vụ bay Việt Hàn" style={{ marginBottom: '20px', border: '1px solid #d9d9d9' }}>
                    <Form.Item label={<span><DollarOutlined style={{ color: 'green' }} /> Đơn giá Won</span>} name="vnToKrPriceInKRW">
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label={<span><DollarOutlined style={{ color: 'green' }} /> Đơn giá VND</span>} name="vnToKrPriceInVND">
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Card>
            </Form>
        </Card>
    );
}

export default Price;
