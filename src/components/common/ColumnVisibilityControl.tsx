import { Checkbox } from 'antd';
import { ReactNode } from 'react';

export interface ColumnConfig {
  key: string;
  label: string;
}

interface ColumnVisibilityControlProps {
  columns: ColumnConfig[];
  visibleColumns: Record<string, boolean>;
  onChange: (columnKey: string) => void;
  title?: ReactNode;
  className?: string;
}

export default function ColumnVisibilityControl({
  columns,
  visibleColumns,
  onChange,
  title = 'Hiển thị cột:',
  className = ''
}: ColumnVisibilityControlProps) {
  return (
    <div className={`p-4 bg-white rounded-lg shadow-sm ${className}`}>
      <div className="font-medium mb-2">{title}</div>
      <div className="flex flex-wrap gap-4">
        {columns.map(column => (
          <Checkbox
            key={column.key}
            checked={visibleColumns[column.key]}
            onChange={() => onChange(column.key)}
          >
            {column.label}
          </Checkbox>
        ))}
      </div>
    </div>
  );
} 