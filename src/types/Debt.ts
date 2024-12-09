export interface DebtItem {
    key: string;
    customerCode: string;
    customerName: string;
    phone: string;
    totalDebt: number;
    paidAmount: number;
    remainingDebt: number;
    status: 'PAID' | 'PARTIAL' | 'UNPAID';
  }
