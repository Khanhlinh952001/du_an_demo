import { Modal, Form, Input, DatePicker, Select, Row, Col, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;
import { formatDate } from '@/utils/format';

interface SearchModalProps {
    open: boolean;
    onCancel: () => void;
    onSearch: (values: any) => void;
    onReset: () => void;
}

const SearchModal = ({ open, onCancel, onSearch, onReset }: SearchModalProps) => {
    const [form] = Form.useForm();

    return (
        <Modal
            title="Tham số tra cứu"
            open={open}
            onCancel={onCancel}
            width={1200}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={onSearch}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item label="Ngày gửi" name="createdAt">
                            <RangePicker style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item label="Dịch vụ vận chuyển" name="shippingService">
                            <Select placeholder="Chọn dịch vụ">
                                <Select.Option value="air">Đường bay</Select.Option>
                                <Select.Option value="sea">Đường biển</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Hình thức vận chuyển" name="shippingMethod">
                            <Select placeholder="Chọn hình thức">
                                <Select.Option value="import">Nhập khẩu</Select.Option>
                                <Select.Option value="export">Xuất khẩu</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Khu vực" name="receiverRegion">
                            <Select placeholder="Chọn khu vực">
                                <Select.Option value="SGN">SGN</Select.Option>
                                <Select.Option value="HAN">HAN</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item label="Trạng thái vận chuyển" name="shippingStatus">
                            <Select placeholder="Chọn trạng thái">
                                <Select.Option value="pending">Chờ xử lý</Select.Option>
                                <Select.Option value="processing">Đang xử lý</Select.Option>
                                <Select.Option value="shipping">Đang vận chuyển</Select.Option>
                                <Select.Option value="delivered">Đã giao hàng</Select.Option>
                                <Select.Option value="cancelled">Đã hủy</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Trạng thái thanh toán" name="paymentStatus">
                            <Select placeholder="Chọn trạng thái">
                                <Select.Option value="unpaid">Chưa thanh toán</Select.Option>
                                <Select.Option value="partial">Thanh toán một phần</Select.Option>
                                <Select.Option value="paid">Đã thanh toán</Select.Option>
                                <Select.Option value="refunded">Đã hoàn tiền</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item label="Mã khách hàng" name="customerCode">
                            <Input placeholder="Nhập mã khách hàng" />
                        </Form.Item>
                        <Form.Item label="Người gửi" name="sender">
                            <Input placeholder="Nhập tên người gửi" />
                        </Form.Item>
                        <Form.Item label="Số điện thoại" name="senderPhone">
                            <Input placeholder="Nhập số điện thoại" />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item label="Mã Người nhận" name="receiverCode">
                            <Input placeholder="Nhập mã khách hàng" />
                        </Form.Item>
                        <Form.Item label="Người nhận" name="receiver">
                            <Input placeholder="Nhập tên người nhận" />
                        </Form.Item>
                        <Form.Item label="Số điện thoại" name="receiverPhone">
                            <Input placeholder="Nhập số điện thoại" />
                        </Form.Item>
                    </Col>
                </Row>

                <div style={{ textAlign: 'right', marginTop: 24 }}>
                    <Space>
                        <Button onClick={() => {
                            form.resetFields();
                            onReset();
                        }}>
                            Làm mới
                        </Button>
                        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                            Tìm kiếm
                        </Button>
                    </Space>
                </div>
            </Form>
        </Modal>
    );
};

export default SearchModal; 