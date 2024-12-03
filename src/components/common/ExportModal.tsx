import { Modal, Checkbox } from 'antd';
import { useState } from 'react';
import type { ExportFieldConfig } from '@/configs/exportConfig';

interface ExportModalProps {
  open: boolean;
  onCancel: () => void;
  onExport: (selectedFields: string[]) => void;
  fields: ExportFieldConfig[];
  title?: string;
}

export default function ExportModal({
  open,
  onCancel,
  onExport,
  fields,
  title = "Chọn thông tin xuất Excel"
}: ExportModalProps) {
  const [selectedFields, setSelectedFields] = useState<string[]>(
    fields.map(f => f.key)
  );

  const handleFieldChange = (field: string) => {
    setSelectedFields(prev => {
      if (prev.includes(field)) {
        return prev.filter(f => f !== field);
      }
      return [...prev, field];
    });
  };

  return (
    <Modal
      title={title}
      open={open}
      onOk={() => onExport(selectedFields)}
      onCancel={onCancel}
      okText="Xuất Excel"
      cancelText="Hủy"
    >
      <div className="space-y-2">
        <div className="mb-4">
          <Checkbox
            checked={selectedFields.length === fields.length}
            indeterminate={selectedFields.length > 0 && selectedFields.length < fields.length}
            onChange={(e) => {
              setSelectedFields(e.target.checked ? fields.map(f => f.key) : []);
            }}
          >
            Chọn tất cả
          </Checkbox>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {fields.map(field => (
            <Checkbox
              key={field.key}
              checked={selectedFields.includes(field.key)}
              onChange={() => handleFieldChange(field.key)}
            >
              {field.label}
            </Checkbox>
          ))}
        </div>
      </div>
    </Modal>
  );
} 
