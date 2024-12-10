import { Button, Checkbox, Modal } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { ReactNode, useState } from 'react';

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
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={className}>
      <div className='flex justify-end'>

      <Button 
        onClick={() => setIsVisible(true)}
        className="hover:bg-gray-100 transition-colors"
        type="default"
        icon={<EyeOutlined />}
      />
      </div>

      <Modal
        title={title}
        open={isVisible}
        onCancel={() => setIsVisible(false)}
        footer={null}
        width={400}
      >
        <div className="flex flex-wrap gap-4">
          {columns.map(column => (
            <Checkbox
              key={column.key}
              checked={visibleColumns[column.key]}
              onChange={() => onChange(column.key)}
              className="hover:text-blue-600 transition-colors"
            >
              {column.label}
            </Checkbox>
          ))}
        </div>
      </Modal>
    </div>
  );
} 