"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Share, Trash } from "lucide-react";

import { Transaction } from "@/types";
import { Button } from "@/components/ui/button";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { toast } from "sonner";
import { useEditTransaction } from "@/features/edit-transaction/hooks/use-edit-transaction";

type TransactionsTableActionsProps = {
  transaction: Transaction;
};

export const TransactionsActions = ({
  transaction,
}: TransactionsTableActionsProps) => {
  const { mutateAsync: deleteTransaction } = useDeleteTransaction();
  const { onOpen } = useEditTransaction();

  const handleDeleteTransaction = () => {
    toast.loading("Deleting Transaction");
    deleteTransaction(transaction._id as string)
      .then(() => {
        toast.success("Transaction Deleted Successfully");
      })
      .catch((error) => {
        toast.error(error.message || "Failed to delete transaction");
      })
      .finally(() => {
        toast.dismiss();
      });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          disabled={false}
          className="cursor-pointer flex items-center justify-between"
          onClick={() =>
            navigator.clipboard.writeText(transaction.transaction_id)
          }
        >
          Copy Transaction Id
          <Copy className="ml-2 w-4 h-4" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={false}
          className="cursor-pointer flex items-center justify-between"
          onClick={() => onOpen(transaction._id as string)}
        >
          Edit Transaction
          <Edit className="ml-2 w-4 h-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDeleteTransaction}
          disabled={false}
          className="cursor-pointer flex items-center justify-between"
        >
          Delete Transaction
          <Trash className="ml-2 w-4 h-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer flex items-center justify-between"
          disabled={false}
        >
          Share Invoice
          <Share className="ml-2 w-4 h-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
