import { Order } from '@/types/Order';
import { formatDate } from '@/utils/format';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Đăng ký font
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
      fontWeight: 'normal',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
      fontWeight: 'bold',
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Roboto',
    fontSize: 12,
  },
  header: {
    backgroundColor: '#1890ff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
  },
  section: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1890ff',
    borderBottom: 1,
    borderBottomColor: '#1890ff',
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    borderBottomStyle: 'solid',
    paddingVertical: 8,
  },
  label: {
    width: 150,
    fontWeight: 'bold',
    color: '#262626',
  },
  value: {
    flex: 1,
    color: '#595959',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#8c8c8c',
    fontSize: 10,
    borderTop: 1,
    borderTopColor: '#e8e8e8',
    paddingTop: 10,
  },
  totalSection: {
    backgroundColor: '#f6ffed',
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#b7eb8f',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  totalLabel: {
    fontWeight: 'bold',
    color: '#389e0d',
  },
  totalValue: {
    fontWeight: 'bold',
    color: '#389e0d',
  },
  highlight: {
    fontSize: 16,
    color: '#f5222d',
    fontWeight: 'bold',
  },
});

interface QuotationPDFProps {
  order: Order;
  exchangeRate: number;
}

const QuotationPDF = ({ order, exchangeRate }: QuotationPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>BÁO GIÁ DỊCH VỤ VẬN CHUYỂN</Text>
        <Text style={styles.subtitle}>Quotation for Shipping Service</Text>
      </View>

      {/* Thông tin đơn hàng */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin đơn hàng</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Mã đơn hàng:</Text>
          <Text style={styles.value}>{order.orderId}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Ngày tạo:</Text>
          <Text style={styles.value}>{formatDate(order.createdAt) }</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Ngày giao dự kiến:</Text>
          <Text style={styles.value}>{formatDate(order.deliveryDate || new Date())}</Text>
        </View>
      </View>

      {/* Thông tin người gửi */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin người gửi</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Người gửi:</Text>
          <Text style={styles.value}>{order.senderName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Số điện thoại:</Text>
          <Text style={styles.value}>{order.senderPhone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Địa chỉ:</Text>
          <Text style={styles.value}>{order.senderAddress}</Text>
        </View>
      </View>

      {/* Thông tin người nhận */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin người nhận</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Người nhận:</Text>
          <Text style={styles.value}>{order.receiverName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Số điện thoại:</Text>
          <Text style={styles.value}>{order.receiverPhone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Địa chỉ:</Text>
          <Text style={styles.value}>{order.receiverAddress}</Text>
        </View>
      </View>

      {/* Chi tiết hàng hóa */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chi tiết hàng hóa</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Loại hàng:</Text>
          <Text style={styles.value}>{order.itemType}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Cân nặng:</Text>
          <Text style={styles.value}>{order.weight} kg</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Số kiện:</Text>
          <Text style={styles.value}>{order.totalPackages}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Mã tracking:</Text>
          <Text style={styles.value}>{order.trackingNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phương thức:</Text>
          <Text style={styles.value}>{order.serviceType === 'sea' ? 'Đường biển' : 'Đường hàng không'}</Text>
        </View>
        {order.note && (
          <View style={styles.row}>
            <Text style={styles.label}>Ghi chú:</Text>
            <Text style={styles.value}>{order.note}</Text>
          </View>
        )}
      </View>

      {/* Thông tin thanh toán */}
      <View style={styles.totalSection}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Tổng tiền (VND):</Text>
          <Text style={styles.totalValue}>{order.totalAmount.toLocaleString('vi-VN')} VND</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Tỷ giá Won-VND:</Text>
          <Text style={styles.totalValue}>{exchangeRate}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Tổng tiền (Won):</Text>
          <Text style={styles.highlight}>
            {Math.round(order.totalAmount / exchangeRate).toLocaleString()} ₩
          </Text>
        </View>
      </View>

      <Text style={styles.footer}>
        * Giá trên đã bao gồm thuế VAT
      </Text>
    </Page>
  </Document>
);

export default QuotationPDF; 
