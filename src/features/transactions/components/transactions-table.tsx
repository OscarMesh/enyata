"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { transactions_columns } from "./transactions-columns";
import { Transaction } from "@/types";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useDeleteTransactions } from "../api/use-delete-transactions";

export const TransactionsTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { isLoading, data, isError } = useGetTransactions();
  const { mutateAsync: deleteTransactions, isPending } =
    useDeleteTransactions();

  useEffect(() => {
    if (data && data?.length > 0) {
      setTransactions(data as Transaction[]);
    }
  }, [data]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>

        <CardContent>
          <DataTable
            loading={isLoading}
            data={transactions as Transaction[]}
            columns={transactions_columns}
            searchKey="transaction"
            isSearch={true}
            isSelect={true}
            disabled={isPending || isLoading}
            onDelete={(row) => {
              const ids = row.map((r) => r.original._id);
              deleteTransactions(ids as []);
            }}
          />
        </CardContent>
      </Card>
    </>
  );
};
