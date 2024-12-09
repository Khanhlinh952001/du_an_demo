import ExcelJS from 'exceljs';
import * as XLSX from 'xlsx';
import { Order } from '@/types/Order';
import { orderExportConfig, createExportData } from '@/configs/exportConfig';

export const exportToExcel = async (orders: Order[], selectedFields: string[]) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Danh sách đơn hàng');

  const exportData = createExportData(orders, selectedFields, orderExportConfig);
  const headers = selectedFields.map(field => {
    const config = orderExportConfig.find(c => c.key === field);
    return config?.label || field;
  });

  worksheet.addRow(headers);

  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: 'FFFFFF' } };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '4B5563' }
  };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

  exportData.forEach((row, index) => {
    const excelRow = worksheet.addRow(Object.values(row));
    if (index % 2 === 0) {
      excelRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'F9FAFB' }
      };
    }
    excelRow.alignment = { vertical: 'middle' };
  });

  worksheet.columns.forEach(column => {
    column.width = 15;
    column.alignment = { wrapText: true };
  });

  worksheet.eachRow(row => {
    row.eachCell(cell => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'danh-sach-don-hang.xlsx';
  link.click();
  window.URL.revokeObjectURL(url);
};

export const importFromExcel = (file: File): Promise<Order[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<Order>(worksheet);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};
