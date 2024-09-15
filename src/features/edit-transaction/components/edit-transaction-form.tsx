"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import { toast } from "sonner";

import { useGetSingleTransaction } from "@/features/transaction/api/use-get-single-transaction";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useEditTransaction } from "../api/use-edit-transaction";

const formSchema = z.object({
  transaction: z.string().min(2, {
    message: "Transaction name is required",
  }),
  transaction_id: z.string().min(2, {
    message: "Transaction ID is required",
  }),
  amount: z.number().min(2, {
    message: "Amount is required and must be greater than 0",
  }),
  status: z.boolean(),
  date: z.string().min(1, {
    message: "Date cannot be in the future",
  }),
  benefactor: z.string().min(2, {
    message: "Benefactor name is required",
  }),
  category: z.enum(["debit", "credit"], {
    message: "Category must be either debit or credit",
  }),
});
type Props = {
  id: string;
  onClose: () => void;
};
export function EditTransactionForm({ id, onClose }: Props) {
  const { mutateAsync: editTransaction, isPending } = useEditTransaction();

  const { isLoading, data, isError } = useGetSingleTransaction(id);
  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
        //Todo: formart date back to string
      });
    }
  }, [data]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...data,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    editTransaction({
      id,
      ...data,
    })
      .then(() => {
        toast.success("Transactions edited successfully");
        form.resetField;
        onClose();
      })
      .catch((error: any) => {
        toast.error(error.message || "An error occurred"); // Ensure error.message is used to display the error
      });
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full">
        <Loader2 className="animate-spin text-muted-foreground" />
      </div>
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="transaction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction</FormLabel>
              <FormControl>
                <Input placeholder="Transaction name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="transaction_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction ID</FormLabel>
              <FormControl>
                <Input placeholder="Transaction ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Amount"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Is this a successful transaction?</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Input type="date" placeholder="e.g. '2015-09-01'" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="benefactor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Benefactor</FormLabel>
              <FormControl>
                <Input placeholder="Benefactor name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transaction category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="debit">Debit</SelectItem>
                  <SelectItem value="credit">Credit</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
