// types.ts
export interface Transaction {
  amount: number;
  benefactor: string;
  category: "debit" | "credit";
  created_at?: string;
  date: string;
  status: boolean;
  transaction: string;
  transaction_id: string;
  user_id?: string;
  _id?: string;
  id?: string;
}

export interface Summary {
  sum_total: number;
}

export interface DashboardData {
  total_debit: Summary;
  total_credit: Summary;
  total_successful: Summary;
  total_failed: Summary;
  recent_transactions: Transaction[];
}
