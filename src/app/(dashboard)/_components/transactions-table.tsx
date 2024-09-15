import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";

import { transactions_columns } from "./transactions-columns";
import { Transaction } from "@/types";
import Link from "next/link";

type TransactionsTableProps = {
  transactions: Transaction[];
  isLoading: boolean;
};

export const TransactionsTable = ({
  transactions,
  isLoading,
}: TransactionsTableProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3>Recent Transactions</h3>
          <Button asChild variant="outline" size="sm">
            <Link href="/transactions">View All</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <DataTable
          data={transactions as Transaction[]}
          columns={transactions_columns}
          searchKey="transaction_name"
          loading={isLoading}
          onDelete={() => {}}
        />
      </CardContent>
    </Card>
  );
};
