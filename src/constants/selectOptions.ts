import { ROLES } from './constants';
import type { SelectProps } from 'antd';

export const ROLE_SELECT_OPTIONS: SelectProps['options'] = [
  { value: ROLES.ACCOUNTANT, label: 'Kế toán' },
  { value: ROLES.WAREHOUSE_VN, label: 'Nhân viên kho Việt Nam' },
  { value: ROLES.WAREHOUSE_KR, label: 'Nhân viên kho Hàn Quốc' },
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