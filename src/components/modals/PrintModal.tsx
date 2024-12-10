import { Modal, Descriptions, Button, Divider, message } from 'antd';
import { Order } from '@/types/Order';
import { PrinterOutlined } from '@ant-design/icons';
import { useRef, useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import JsBarcode from 'jsbarcode';
import React from 'react';
import QRCode from 'react-qr-code';
import dynamic from 'next/dynamic';

interface PrintModalProps {
  open: boolean;
  onCancel: () => void;
  orders: Order[];
  onPrint: (orders: Order[]) => void;
}

export default function PrintModal({ open, onCancel, orders, onPrint }: PrintModalProps) {
  const componentRef = useRef<HTMLDivElement>(null);
  const [isBarcodeReady, setIsBarcodeReady] = useState(false);

  // Generate unique IDs for barcodes
  const getBarcodeId = (orderId: string) => `barcode-${orderId}`;

  useEffect(() => {
    setIsBarcodeReady(false);

    const renderBarcodes = () => {
      let renderSuccess = true;

      orders.forEach(order => {
        const barcodeElement = document.getElementById(getBarcodeId(order.orderId));
        if (barcodeElement) {
          try {
            JsBarcode(barcodeElement, order.orderId, {
              format: "CODE128",
              lineColor: "#001429",
              width: 1.5,
              height: 30,
              fontSize: 12,
              margin: 5,
              displayValue: true,
            });
          } catch (error) {
            console.error('Error rendering barcode:', error);
            renderSuccess = false;
          }
        }
      });

      if (renderSuccess) {
        setIsBarcodeReady(true);
      } else {
        setTimeout(renderBarcodes, 1000);
      }
    };

    setTimeout(renderBarcodes, 500);
  }, [orders]);

// ... existing code ...

const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "AwesomeFileName",
    pageStyle: `
      @page {
        size: 148mm 210mm;  /* A5 portrait */
        margin: 0;
      }
      @media print {
        html, body {
          width: 148mm;
          height: 210mm;
        }
        .order-item {
          width: 148mm;
          height: 210mm;
          page-break-after: always;
          padding: 10mm;
          box-sizing: border-box;
        }
        .order-item:last-child {
          page-break-after: auto;
        }
        /* Sửa CSS cho QR code */
        svg {
          display: block !important;
          width: 70px !important;
          height: 70px !important;
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
        }
        /* Thêm CSS để đảm bảo container của QR code hiển thị */
        .qr-code-container {
          display: block !important;
          width: 70px !important;
          height: 70px !important;
          background-color: white !important;
        }
      }
    `,
  });

// ... existing code ...

  if (!orders || orders.length === 0) return null;

  const handlePrintClick = () => {
    printFn();
    onPrint(orders);
  };

  return (
    <Modal
      title={`Chi tiết đơn hàng ${
        orders.length > 1 ? `(${orders.length} đơn)` : orders[0].orderId
      }`}
      open={open}
      onCancel={onCancel}
      footer={[
        <Button
          key="print"
          type="primary"
          icon={<PrinterOutlined />}
          onClick={handlePrintClick}
          disabled={!isBarcodeReady}
        >
          In đơn hàng
        </Button>
      ]}
      width={800}
    >
      <div ref={componentRef}>
        {orders.map((order) => (
          <div key={order.orderId} className="order-item">
            <div className="border border-red-500/80 rounded-lg h-full relative p-4">
              {/* Header with Logo and Company Info */}
              <div className="flex justify-between border-b border-red-500/80 pb-4">
                <div className="w-1/2">
                  <h1 className="text-red-600 font-bold text-lg">VIHANMALL (KMG)</h1>
                  <p className="text-sm text-gray-500">www.vihanmall.com</p>
                </div>
                <div className="w-1/2 flex justify-end space-x-4" style={{ pageBreakInside: 'avoid' }}>
                  <canvas id={getBarcodeId(order.orderId)} />
                  <div className="qr-code-container">
                    <QRCode
                      value={`https://vihanmall.vercel.app/tracking/${order.orderId}`}
                      size={70}
                      style={{ height: "70px", width: "70px" }}
                    />
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="mt-4">
                <Descriptions bordered column={2} size="small">
                  <Descriptions.Item label="Mã đơn hàng" span={2}>{order.orderId}</Descriptions.Item>

                  <Descriptions.Item label="Người gửi" span={2}>
                    {order.senderName}
                  </Descriptions.Item>
                  <Descriptions.Item label="SĐT người gửi">{order.senderPhone}</Descriptions.Item>
                  <Descriptions.Item label="Địa chỉ người gửi">{order.senderAddress}</Descriptions.Item>

                  <Descriptions.Item label="Người nhận" span={2}>
                    {order.receiverName}
                  </Descriptions.Item>
                  <Descriptions.Item label="SĐT người nhận">{order.receiverPhone}</Descriptions.Item>
                  <Descriptions.Item label="Địa chỉ người nhận">{order.receiverAddress}</Descriptions.Item>

                  <Descriptions.Item label="Khu vực">{order.receiverRegion}</Descriptions.Item>
                  <Descriptions.Item label="Trạng thái thanh toán">
                    {order.paymentStatus}
                  </Descriptions.Item>

                  <Descriptions.Item label="Tổng tiền">{order.totalAmount}</Descriptions.Item>

                  <Descriptions.Item label="Ghi chú" span={2}>
                    {order.note || 'Không có ghi chú'}
                  </Descriptions.Item>
                </Descriptions>
              </div>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 border-t border-red-500/80 p-2 text-xs bg-red-50">
                <div className="flex justify-between px-4">
                  <p>📞 Hotline: 010-8634-4689</p>
                  <p>✉️ Email: 0789kmg@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
