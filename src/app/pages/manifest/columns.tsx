import { ManifestItem } from "@/types/Manifest";
import { TableProps } from "antd";

export const columns: TableProps<ManifestItem>['columns'] = [
    {
      title: 'HAWB NO',
      dataIndex: 'hawbNo',
      key: 'hawbNo',
      width: 120,
      fixed: 'left',
      className: 'bg-gray-50',
      render: (text) => <span className="font-medium text-blue-600">{text}</span>,
    },
    {
      title: 'PCS',
      dataIndex: 'pcs',
      key: 'pcs',
      width: 80,
      align: 'right',
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      title: "W'T",
      dataIndex: 'weight',
      key: 'weight',
      width: 100,
      align: 'right',
      render: (value) => <span className="font-medium">{value.toFixed(1)}</span>,
    },
    {
      title: 'CUR',
      dataIndex: 'currency',
      key: 'currency',
      width: 80,
      align: 'center',
    },
    {
      title: 'VALUE',
      dataIndex: 'value',
      key: 'value',
      width: 120,
      align: 'right',
      render: (value) => <span className="font-medium">{value.toLocaleString()}</span>,
    },
    {
      title: 'DESCRIPTION',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'SHIPPER',
      dataIndex: 'shipper',
      key: 'shipper',
      width: 150,
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'S/ADDRESS',
      dataIndex: 'shipperAddress',
      key: 'shipperAddress',
      width: 200,
    },
    {
      title: '<AMS> S/NATIONALITY',
      dataIndex: 'shipperNationality',
      key: 'shipperNationality',
      width: 150,
    },
    {
      title: '<AMS> S/PLACE',
      dataIndex: 'shipperPlace',
      key: 'shipperPlace',
      width: 150,
    },
    {
      title: '<AMS> S/STREET',
      dataIndex: 'shipperStreet',
      key: 'shipperStreet',
      width: 150,
    },
    {
      title: '<AMS> S/ZIPCode',
      dataIndex: 'shipperZipCode',
      key: 'shipperZipCode',
      width: 120,
    },
    {
      title: 'CONSIGNEE',
      dataIndex: 'consignee',
      key: 'consignee',
      width: 150,
    },
    {
      title: 'C/ADDRESS',
      dataIndex: 'consigneeAddress',
      key: 'consigneeAddress',
      width: 200,
    },
    {
      title: 'N/NAME',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'LICENSE SEQ',
      dataIndex: 'licenseSeq',
      key: 'licenseSeq',
      width: 120,
    },
    {
      title: 'LICENSE NUMBER',
      dataIndex: 'licenseNumber',
      key: 'licenseNumber',
      width: 150,
    },
    {
      title: 'LICENSE PCS',
      dataIndex: 'licensePcs',
      key: 'licensePcs',
      width: 120,
    },
    {
      title: 'LICENSE W/T',
      dataIndex: 'licenseWeight',
      key: 'licenseWeight',
      width: 120,
    },
    {
      title: 'TRẠNG THÁI',
      dataIndex: 'status',
      width: 150,
      render: (status: string) => (
        <span className={`${status === 'Đang gửi về VN' ? 'text-green-500' : 'text-blue-500'}`}>
          {status || 'Đang xử lý tại kho HQ'}
        </span>
      )
    }
];
