import ExcelJS from 'exceljs';
import { ManifestItem } from '@/types/Manifest';

interface HeaderInfo {
  date: string;
  flightNo: string;
  port: string;
  mawbNo: string;
}

export const exportManifestToExcel = async (manifestData: ManifestItem[], headerInfo: HeaderInfo) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Manifest');

  // Add header data
  const headers = [
    ['DATE', headerInfo.date],
    ['FLT NO.', '*2014.09.04 셀추가 1.거래코드(A,B,C). 세번부호(HSK 10단위), 사업자번호'],
    ['PORT', headerInfo.port, '*2018.05.23 중국행 화물 서식변경에 따른 항목 추가 ( 2018.06.01 시행 )'],
    ['MAWB NO', headerInfo.mawbNo, '2018.05.23추가', '2018.05.23추가', '2018.05.23추가', '2018.05.23추가', '2018.05.23추가', '2018.05.23추가'],
    [''],
  ];

  // Add headers
  headers.forEach(row => worksheet.addRow(row));

  // Add column headers
  const columnHeaders = [
    'HAWB NO', 'PCS', 'W\'T', 'CUR', 'VALUE', 'DESCRITPION', 'SHIPPER',
    'S/ADDRESS', '<AMS> S/NATIONALITY', '<AMS> S/PLACE', '<AMS> S/STREET',
    '<AMS> S/ZIPCode', 'CONSIGNEE', 'C/ADDRESS', 'N/ NAME', 'N/ADDRESS',
    '<AMS> C/NATIONALITY', '<AMS> C/STATES', '<AMS> C/PLACE', '<AMS> C/STREET',
    '<AMS> DESTINATION PORT', '<AMS> COMMODITY', '거래유형(A:전자,B:기업견품,C:기타)',
    '세번부호(HSH 10자리)', 'S/사업자번호', 'S/전화번호', 'C/사업자번호', 'C/전화번호',
    'C/실담당자명', 'C/실담당자 전화번호'
  ];

  const headerRow = worksheet.addRow(columnHeaders);

  // Style header rows (yellow background)
  for (let i = 1; i <= 4; i++) {
    const row = worksheet.getRow(i);
    row.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' }
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      cell.font = { bold: true };
      cell.alignment = { vertical: 'middle' };
    });
  }

  // Style column headers (green background)
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF92D050' }
    };
    cell.font = {
      bold: true,
      color: { argb: 'FFFFFFFF' }
    };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    cell.alignment = { 
      vertical: 'middle', 
      horizontal: 'center',
      wrapText: true
    };
  });

  // Add manifest data
  manifestData.forEach(item => {
    const row = worksheet.addRow([
      item.hawbNo,
      item.pcs,
      item.weight,
      item.currency,
      item.value,
      item.description,
      item.shipper,
      item.shipperAddress,
      item.shipperNationality,
      item.shipperPlace,
      item.shipperStreet,
      item.shipperZipCode,
      item.consignee,
      item.consigneeAddress,
      item.name,
      '', // N/ADDRESS
      '', // <AMS> C/NATIONALITY
      '', // <AMS> C/STATES
      '', // <AMS> C/PLACE
      '', // <AMS> C/STREET
      '', // <AMS> DESTINATION PORT
      '', // <AMS> COMMODITY
      '', // 거래유형
      '', // 세번부호
      '', // S/사업자번호
      '', // S/전화번호
      '', // C/사업자번호
      '', // C/전화번호
      '', // C/실담당자명
      ''  // C/실담당자 전화번호
    ]);

    // Style data cells
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      cell.alignment = { vertical: 'middle' };
    });
  });

  // Set column widths
  worksheet.columns.forEach((col, index) => {
    col.width = 15;
    if (index === 5) col.width = 30; // DESCRIPTION
    if (index === 7) col.width = 30; // S/ADDRESS
    if (index === 13) col.width = 30; // C/ADDRESS
  });

  return workbook;
};
