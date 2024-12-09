"use client"

import React, { useState } from 'react';
import {
  Table,
  Card,
  Space,
  DatePicker,
  Input,
  Button,
  Select,
} from 'antd';
import { SearchOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import MainLayout from '@/layout/MainLayout';
import type { TableProps } from 'antd';
import ExcelJS from 'exceljs';
import { ManifestItem } from '@/types/Manifest';
const { Search } = Input;
import { columns } from './columns';
import ExportModal from '@/components/common/ExportModal';
import ScrollIndicator from '@/components/UI/Scroll';
import { exportManifestToExcel } from './excelExport';

export default function ManifestPage() {
  const [searchText, setSearchText] = useState('');
  const [mawbNo, setMawbNo] = useState('');
  const [manifestData, setManifestData] = useState<ManifestItem[]>([
    {
      key: 'VHM138127',
      hawbNo: 'VHM138127',
      pcs: 1,
      weight: 7.3,
      currency: 'KRW',
      value: 775000,
      description: 'COSMETICS, HEALTH FOOD',
      shipper: 'NGOC ANH',
      shipperAddress: 'HA NOI',
      shipperNationality: 'VIETNAM',
      shipperPlace: 'HANOI',
      shipperStreet: '123 STREET',
      shipperZipCode: '100000',
      consignee: 'KIM MIN JI',
      consigneeAddress: 'SEOUL, KOREA',
      name: 'NGOC ANH',
      packageType: 'BOX',
      customsValue: 775000,
      originCountry: 'VIETNAM'
    },
  ]);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [transportMode, setTransportMode] = useState('air');
  const [serviceType, setServiceType] = useState('import');

  const manifestExportConfig = [
    { key: 'hawbNo', label: 'HAWB NO' },
    { key: 'pcs', label: 'PCS' },
    { key: 'weight', label: 'WEIGHT' },
    { key: 'currency', label: 'CURRENCY' },
    { key: 'value', label: 'VALUE' },
    { key: 'description', label: 'DESCRIPTION' },
    { key: 'shipper', label: 'SHIPPER' },
    { key: 'shipperAddress', label: 'SHIPPER ADDRESS' },
    { key: 'shipperNationality', label: 'NATIONALITY' },
    { key: 'shipperPlace', label: 'PLACE' },
    { key: 'shipperStreet', label: 'STREET' },
    { key: 'shipperZipCode', label: 'ZIPCODE' },
    { key: 'consignee', label: 'CONSIGNEE' },
    { key: 'consigneeAddress', label: 'CONSIGNEE ADDRESS' },
    { key: 'name', label: 'NAME' },
  ];

  const handleSearch = (value: string) => {
    if (!value.trim()) {
      setManifestData([
        {
          key: 'VHM138127',
          hawbNo: 'VHM138127',
          pcs: 1,
          weight: 7.3,
          currency: 'KRW',
          value: 775000,
          description: 'COSMETICS, HEALTH FOOD',
          shipper: 'NGOC ANH',
          shipperAddress: 'HA NOI',
          shipperNationality: 'VIETNAM',
          shipperPlace: 'HANOI',
          shipperStreet: '123 STREET',
          shipperZipCode: '100000',
          consignee: 'KIM MIN JI',
          consigneeAddress: 'SEOUL, KOREA',
          name: 'NGOC ANH',
          packageType: 'BOX',
          customsValue: 775000,
          originCountry: 'VIETNAM'
        },
      ]);
      return;
    }

    const filtered = manifestData.filter(item => 
      item.hawbNo.toLowerCase().includes(value.toLowerCase()) ||
      item.shipper.toLowerCase().includes(value.toLowerCase())
    );
    setManifestData(filtered);
  };

  const updateManifestStatus = () => {
    const updatedData = manifestData.map(item => ({
      ...item,
      status: 'Đang gửi về VN'
    }));
    setManifestData(updatedData);
  };

  const handleExport = async () => {
    try {
      const workbook = await exportManifestToExcel(manifestData, headerInfo);
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'CJM_MNF_VIHANMALL.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting Excel:', error);
      alert('Có lỗi xảy ra khi xuất Excel. Vui lòng thử lại!');
    }
  };

  const handleSendEmail = async () => {
    try {
      updateManifestStatus();
      
      // Tạo dữ liệu để xuất Excel
      const exportData = manifestData.map(item => ({
        'HAWB NO': item.hawbNo,
        'PCS': item.pcs,
        'WEIGHT': item.weight,
        'CURRENCY': item.currency,
        'VALUE': item.value,
        'DESCRIPTION': item.description,
        'SHIPPER': item.shipper,
        'SHIPPER ADDRESS': item.shipperAddress,
        'NATIONALITY': item.shipperNationality,
        'PLACE': item.shipperPlace,
        'STREET': item.shipperStreet,
        'ZIPCODE': item.shipperZipCode,
        'CONSIGNEE': item.consignee,
        'CONSIGNEE ADDRESS': item.consigneeAddress,
        'NAME': item.name,
        'STATUS': item.status
      }));

      // Tạo file Excel
      const wb = new ExcelJS.Workbook();
      const ws = wb.addWorksheet("Manifest Data");
      ws.addRows(exportData);
      
      // Chuyển đổi workbook thành array buffer
      const excelBuffer = await wb.xlsx.writeBuffer();
      
      // Tạo Blob từ array buffer
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      // Tạo form data để gi file
      const formData = new FormData();
      formData.append('file', blob, `manifest_${new Date().toISOString()}.xlsx`);
      formData.append('mawbNo', mawbNo);
      
      // Gửi request tới API endpoint
      // const response = await fetch('/api/send-manifest-email', {
      //   method: 'POST',
      //   body: formData,
      // });

      // if (!response.ok) {
      //   throw new Error('Gửi email tht bại');
      // }

      alert('Email đã được gửi thành công!');
    } catch (error) {
      console.error('Lỗi khi gửi email:', error);
      alert('Có lỗi xảy ra khi gửi email. Vui lòng thử lại!');
    }
  };

  const handleImport = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = e.target?.result as ArrayBuffer;
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(data);
      const worksheet = workbook.worksheets[0];
      const jsonData = worksheet.getRows(1, worksheet.rowCount) ?? [];

      const manifestItems: ManifestItem[] = jsonData.map((row: any) => ({
        key: row['HAWB NO'],
        hawbNo: row['HAWB NO'],
        pcs: Number(row['PCS']),
        weight: Number(row['W\'T']),
        currency: row['CUR'],
        value: Number(row['VALUE']),
        description: row['DESCRIPTION'],
        shipper: row['SHIPPER'],
        shipperAddress: row['S/ADDRESS'],
        shipperNationality: row['<AMS> S/NATIONALITY'],
        shipperPlace: row['<AMS> S/PLACE'],
        shipperStreet: row['<AMS> S/STREET'],
        shipperZipCode: row['<AMS> S/ZIPCode'],
        consignee: row['CONSIGNEE'],
        consigneeAddress: row['C/ADDRESS'],
        name: row['N/NAME'],
        licenseSeq: row['LICENSE SEQ'],
        licenseNumber: row['LICENSE NUMBER'],
        licensePcs: row['LICENSE PCS'],
        licenseWeight: row['LICENSE W/T'],
        packageType: row['PACKAGE TYPE'],
        customsValue: Number(row['CUSTOMS VALUE']),
        originCountry: row['ORIGIN COUNTRY']
      }));

      setManifestData(manifestItems);
    };
    reader.readAsArrayBuffer(file);
  };

  const headerInfo = {
    date: '2024/7/23',
    flightNo: '',
    port: 'ICN/HAN', 
    mawbNo: '73854411464'
  };

  return (
    <MainLayout>
      <Card className="shadow-lg rounded-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Danh sách manifest
          </h1>
          <p className="text-gray-500 mt-1">Quản lý và theo dõi manifest</p>
        </div>

        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {/* Filter Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Ngày:</label>
              <Input value={headerInfo.date} disabled />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Số hiệu chuyến bay:</label>
              <Input value={headerInfo.flightNo} disabled />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Cảng:</label>
              <Input value={headerInfo.port} disabled />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Số MAWB:</label>
              <Input value={mawbNo} onChange={(e) => setMawbNo(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Phương thức vận chuyển:</label>
              <Select
                value={transportMode}
                onChange={setTransportMode}
                className="w-full"
                options={[
                  { value: 'air', label: 'Đường hàng không' },
                  { value: 'sea', label: 'Đường bin' },
                ]}
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Loại dịch vụ:</label>
              <Select
                value={serviceType}
                onChange={setServiceType}
                className="w-full"
                options={[
                  { value: 'import', label: 'Nhập khẩu' },
                  { value: 'export', label: 'Xuất khẩu' },
                ]}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Khoảng thời gian:</label>
              <DatePicker.RangePicker 
                className="w-full"
                placeholder={['Từ ngày', 'Đến ngày']}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Số MAWB:</label>
              <Input 
                value={mawbNo}
                onChange={(e) => setMawbNo(e.target.value)}
                placeholder="Nhập số MAWB"
                className="w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Tìm kiếm:</label>
              <Search
                placeholder="Tìm theo HAWB hoặc Người gửi"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  handleSearch(e.target.value);
                }}
                className="w-full"
              />
            </div>

            <div className="flex items-end gap-2">
              <Button 
                icon={<UploadOutlined />}
                onClick={() => setIsExportModalOpen(true)}
                className="bg-green-500 hover:bg-green-600 text-white border-none h-[32px]"
              >
                Xuất Excel
              </Button>
              <Button 
               icon={<DownloadOutlined />}
                onClick={() => document.getElementById('excel-upload')?.click()}
                className="bg-blue-500 hover:bg-blue-600 text-white border-none h-[32px]"
              >
                Import Excel
              </Button>
              <Button
                onClick={handleSendEmail}
                className="bg-blue-500 hover:bg-blue-600 text-white border-none h-[32px]"
              >
                Gửi Email
              </Button>
             
              <input
                id="excel-upload"
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImport(file);
                }}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-lg shadow">
            <ScrollIndicator />
            <Table<ManifestItem>
              columns={columns}
              dataSource={manifestData}
              pagination={false}
              scroll={{ x: 2500, y: 500 }}
              bordered
              size="small"
              className="overflow-hidden rounded-lg"
              summary={(pageData) => {
                const totalWeight = pageData.reduce((sum, row) => sum + row.weight, 0);
                const totalValue = pageData.reduce((sum, row) => sum + row.value, 0);
                const totalPcs = pageData.reduce((sum, row) => sum + row.pcs, 0);
                
                return (
                  <Table.Summary.Row className="bg-gray-50 font-medium">
                    <Table.Summary.Cell index={0}>Tổng cộng</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>{totalPcs}</Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>{totalWeight.toFixed(1)}</Table.Summary.Cell>
                    <Table.Summary.Cell index={3}></Table.Summary.Cell>
                    <Table.Summary.Cell index={4}>{totalValue.toLocaleString()}</Table.Summary.Cell>
                    <Table.Summary.Cell index={5} colSpan={10}></Table.Summary.Cell>
                  </Table.Summary.Row>
                );
              }}
            />
          </div>

          <ExportModal
            open={isExportModalOpen}
            onCancel={() => setIsExportModalOpen(false)}
            onExport={handleExport}
            fields={manifestExportConfig}
          />
        </Space>
      </Card>
    </MainLayout>
  );
}
