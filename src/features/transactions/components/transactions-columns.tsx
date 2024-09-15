"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import { cn, formatAmount } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

import { Transaction } from "@/types";
import {
  ArrowUpDown,
  Ban,
  CheckCircle,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { TransactionsActions } from "./transactions-actions";

export const transactions_columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "transaction",
    header: () => <div className=" truncate  text-[#A3AED0]">Transaction</div>,
    cell: ({ row }) => {
      return (
        <p className=" truncate capitalize ">{row?.original?.transaction}</p>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className=" truncate  text-[#A3AED0]">Amount</div>,
    cell: ({ row }) => {
      return (
        <p className=" truncate capitalize ">
          {formatAmount(row?.original?.amount)}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className=" truncate text-[#A3AED0]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className=" truncate ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status: boolean = row?.original.status;
      return (
        <Badge
          variant="secondary"
          className={cn(
            "capitalize py-1 px-2 rounded-sm",
            // status === "pending" && "bg-[#FFF6E9] text-[#B5850B]",
            status === false && "bg-[#FFEAEA] text-[#B83131]",
            status === true && "bg-[#EDFFEA] text-[#165E3D]"
          )}
        >
          {/* {status === "pending" && <Clock className=" truncate mr-2" />} */}

          {status === true && (
            <CheckCircle className=" truncate mr-2 text-sm" />
          )}
          {status === false && <Ban className=" truncate mr-2" />}
          {status ? "Successful" : "Failed"}
        </Badge>
      );
    },
  },

  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="truncate text-[#A3AED0]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className=" truncate ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <p className=" truncate capitalize  flex ">
          {format(new Date(row?.original?.date || ""), "eeee, p")}
        </p>
      );
    },
  },

  {
    accessorKey: "benefactor",
    header: () => <div className=" truncate  text-[#A3AED0]">Benefactor</div>,
    cell: ({ row }) => {
      return (
        <p className=" truncate capitalize ">{row?.original?.benefactor}</p>
      );
    },
  },

  {
    accessorKey: "category",
    header: () => <div className=" truncate  text-[#A3AED0]">Category</div>,
    cell: ({ row }) => {
      const category: string = row?.original.category;
      return (
        <Badge
          variant="secondary"
          className={cn(
            "capitalize py-1 px-2 rounded-sm",

            category === "debit" && "bg-[#FFEAEA] text-[#B83131]",
            category === "credit" && "bg-[#EDFFEA] text-[#165E3D]"
          )}
        >
          {category === "credit" && (
            <TrendingUp className=" truncate mr-2 text-sm" />
          )}
          {category === "debit" && <TrendingDown className=" truncate mr-2" />}
          {category}
        </Badge>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;

      return <TransactionsActions transaction={transaction} />;
    },
  },
];
