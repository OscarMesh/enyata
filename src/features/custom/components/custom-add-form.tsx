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
import { useCustomAddTransaction } from "../api/use-custom-add-transaction";
import { useCustomAdd } from "../hooks/use-custom-add";
import { toast } from "sonner";

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

export function CustomAddForm() {
  const { mutateAsync: addTransaction, isPending } = useCustomAddTransaction();
  const { onClose } = useCustomAdd();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transaction: "",
      transaction_id: "",
      amount: 0,
      status: false,
      date: "",
      benefactor: "",
      category: "debit",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    addTransaction(data)
      .then(() => {
        toast.success("Transactions uploaded successfully");
        form.resetField;
        onClose();
      })
      .catch((error: any) => {
        toast.error(error.message || "An error occurred"); // Ensure error.message is used to display the error
      });
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
