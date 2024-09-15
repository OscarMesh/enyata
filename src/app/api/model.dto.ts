import { Document } from "mongodb";

export interface Scanned_docs extends Document {
  user_id: string;
  transaction: string;
  transaction_id: string;
  amount: number;
  status: boolean;
  date: Date;
  benefactor: string;
  category: "debit" | "credit";
  created_at: Date;
}
