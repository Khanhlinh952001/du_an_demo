import { useState, useMemo } from 'react';
import type { ColumnsType } from 'antd/es/table';

export function useColumnVisibility<T>(
  columns: ColumnsType<T>,
  initialVisibility?: Record<string, boolean>
) {
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(() => {
    if (initialVisibility) return initialVisibility;
    
    // Default all columns to visible if no initial state provided
    return columns.reduce((acc, column) => {
      if (column.key) {
        acc[column.key.toString()] = true;
      }
      return acc;
    }, {} as Record<string, boolean>);
  });

  const handleColumnVisibilityChange = (columnKey: string) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }));
  };

  const filteredColumns = useMemo(() => {
    return columns.filter(column => {
      if (!column.key) return true;
      return visibleColumns[column.key.toString()];
    });
  }, [columns, visibleColumns]);

  return {
    visibleColumns,
    setVisibleColumns,
    handleColumnVisibilityChange,
    filteredColumns
  };
} 