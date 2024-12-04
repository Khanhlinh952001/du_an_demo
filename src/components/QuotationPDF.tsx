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
  order: {
    key: string;
    date: string;
    name: string;
    route: string;
    type: string;
    importExport: string;
    amount: number;
    orderDetails: {
      senderName: string;
      senderPhone: string;
      senderAddress: string;
      receiverName: string;
      receiverPhone: string;
      receiverAddress: string;
      itemType: string;
      weight: number;
      totalPackages: number;
      trackingNumber: string;
      note: string;
    };
  };
  exchangeRate: number;
}

// Add new interface for multiple orders
interface BatchQuotationProps {
  orders: QuotationPDFProps['order'][];
  exchangeRate: number;
}

const QuotationPDF = ({ order, exchangeRate }: QuotationPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Your existing QuotationPDF content */}
    </Page>
  </Document>
);

// Add new component for batch quotations
const BatchQuotationPDF = ({ orders, exchangeRate }: BatchQuotationProps) => (
  <Document>
    {orders.map((order, index) => (
      <Page key={order.key} size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>BÁO GIÁ DỊCH VỤ VẬN CHUYỂN ({index + 1}/{orders.length})</Text>
          <Text style={styles.subtitle}>Quotation for Shipping Service</Text>
        </View>

        {/* Compact layout for order info */}
        <View style={[styles.section, { marginVertical: 8 }]}>
          <Text style={[styles.sectionTitle, { marginBottom: 6 }]}>Thông tin đơn hàng</Text>
          <View style={[styles.row, { paddingVertical: 4 }]}>
            <Text style={styles.label}>Mã đơn hàng: {order.key}</Text>
            <Text style={styles.value}>Ngày gửi: {order.date}</Text>
          </View>
          <View style={[styles.row, { paddingVertical: 4 }]}>
            <Text style={styles.label}>Người gửi: {order.orderDetails.senderName}</Text>
            <Text style={styles.value}>SĐT: {order.orderDetails.senderPhone}</Text>
          </View>
          <View style={[styles.row, { paddingVertical: 4 }]}>
            <Text style={styles.value}>Địa chỉ gửi: {order.orderDetails.senderAddress}</Text>
          </View>
          <View style={[styles.row, { paddingVertical: 4 }]}>
            <Text style={styles.label}>Người nhận: {order.orderDetails.receiverName}</Text>
            <Text style={styles.value}>SĐT: {order.orderDetails.receiverPhone}</Text>
          </View>
          <View style={[styles.row, { paddingVertical: 4 }]}>
            <Text style={styles.value}>Địa chỉ nhận: {order.orderDetails.receiverAddress}</Text>
          </View>
        </View>

        {/* Compact layout for shipping details */}
        <View style={[styles.section, { marginVertical: 8 }]}>
          <Text style={[styles.sectionTitle, { marginBottom: 6 }]}>Chi tiết hàng hóa</Text>
          <View style={[styles.row, { paddingVertical: 4 }]}>
            <Text style={styles.label}>Loại hàng: {order.orderDetails.itemType}</Text>
            <Text style={styles.value}>Cân nặng: {order.orderDetails.weight} kg</Text>
          </View>
          <View style={[styles.row, { paddingVertical: 4 }]}>
            <Text style={styles.label}>Số kiện: {order.orderDetails.totalPackages}</Text>
            <Text style={styles.value}>Mã tracking: {order.orderDetails.trackingNumber}</Text>
          </View>
        </View>

        {/* Pricing section */}
        <View style={[styles.totalSection, { marginTop: 'auto', marginBottom: 30 }]}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tổng tiền (VND):</Text>
            <Text style={styles.totalValue}>{order.amount.toLocaleString()} VND</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tỷ giá Won-VND:</Text>
            <Text style={styles.totalValue}>{exchangeRate}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tổng tiền (Won):</Text>
            <Text style={styles.highlight}>{Math.round(order.amount / exchangeRate).toLocaleString()}</Text>
          </View>
        </View>

        <Text style={styles.footer}>* Giá trên đã bao gồm thuế VAT</Text>
      </Page>
    ))}
  </Document>
);

export { BatchQuotationPDF };
export default QuotationPDF; 