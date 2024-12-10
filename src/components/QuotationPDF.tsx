import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Order } from '@/types/Order';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  table: {
    display: 'flex',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableCell: {
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
  }
});

interface QuotationPDFProps {
  orders: Order[];
}

const QuotationPDF: React.FC<QuotationPDFProps> = ({ orders }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Báo giá</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>Mã đơn hàng</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Khách hàng</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Tổng tiền</Text>
            </View>
          </View>

          {/* {orders.map((order: Order) => (
            <View key={order.orderId} style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text>{order.orderId}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{order.senderName}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{order.totalAmount.toLocaleString('vi-VN')} đ</Text>
              </View>
            </View>
          ))} */}
        </View>

        <View style={styles.footer}>
          <Text>Ngày xuất: {new Date().toLocaleDateString('vi-VN')}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default QuotationPDF;
