import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { transactions } from "@/constans/constants";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  Rectangle,
  BarChart,
} from "recharts";

const data = [
  { name: "Total Success", amount: 0 },
  { name: "Total Failed", amount: 0 },
  { name: "Total Pending", amount: 0 },
];

transactions.forEach((transaction) => {
  if (transaction.status === "successful") {
    data[0].amount += transaction.amount;
  }
  if (transaction.status === "failed") {
    data[1].amount += transaction.amount;
  }
  if (transaction.status === "pending") {
    data[2].amount += transaction.amount;
  }
});

export const TransactionsChart = () => {
  return (
    <Card className="flex flex-col gap-y-4">
      <CardHeader className="flex flex-row justify-between items-center">
        <h3 className="text-bold text-xl">Transactions Trend</h3>
      </CardHeader>
      <ResponsiveContainer width="100%" height={300} className="p-2 text-sm">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#82ca9d" name="Total Success" />
          <Bar dataKey="amount" fill="#ff6347" name="Total Failed" />
          <Bar dataKey="amount" fill="#ffc658" name="Total Pending" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
