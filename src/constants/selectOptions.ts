import { ROLES } from './roles';
import { REGION } from './locations';
import { ORDER_TYPE } from './orders';
import type { SelectProps } from 'antd';

export const ROLE_SELECT_OPTIONS: SelectProps['options'] = [
  { value: ROLES.ACCOUNTANT, label: 'Kế toán' },
  { value: ROLES.WAREHOUSE_VN, label: 'Nhân viên kho Việt Nam' },
  { value: ROLES.WAREHOUSE_KR, label: 'Nhân viên kho Hàn Quốc' },
];

export const ORDER_TYPE_SELECT_OPTIONS: SelectProps['options'] = [
  { value: ORDER_TYPE.EXPORT, label: 'Xuất khẩu' },
  { value: ORDER_TYPE.IMPORT, label: 'Nhập khẩu' },
];

// Options cho phòng ban
export const DEPARTMENT_SELECT_OPTIONS = [
  { value: 'IT', label: 'IT' },
  { value: 'HR', label: 'Nhân sự' },
  { value: 'Finance', label: 'Tài chính' },
  { value: 'Sales', label: 'Kinh doanh' },
] ;

// Options cho ngôn ngữ
export const LANGUAGE_SELECT_OPTIONS = [
  { value: 'vi', label: 'Tiếng Việt' },
  { value: 'en', label: 'English' },
  { value: 'ko', label: 'Korean' },
]; 
