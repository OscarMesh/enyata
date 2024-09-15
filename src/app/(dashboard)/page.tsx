"use client";
import { Banner } from "@/components/banner";
import { GreetingsBox } from "@/components/greetings-box";
import { TotalBalanceBox } from "@/components/total-balanceBox";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import {
  Ban,
  CheckCircle,
  Plus,
  TrendingDown,
  TrendingUp,
  Upload,
} from "lucide-react";

import { TransactionsTable } from "./_components/transactions-table";
import { Badge } from "@/components/ui/badge";
import { useUploadImage } from "@/features/upload-image/hooks/use-upload-image";
import { useCustomAdd } from "@/features/custom/hooks/use-custom-add";
import { useGetDashboardData } from "@/features/dashboard/api/use-get-dashboard-data";
import { DashboardData } from "@/types";
import { formatAmount } from "@/lib/utils";

export default function Home() {
  const { onOpen } = useUploadImage();
  const { onOpen: onCustomOpen } = useCustomAdd();

  const { user } = useUser();

  const { data, isLoading, isError } = useGetDashboardData();

  const dashboardData = data as DashboardData;

  return (
    <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
        <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-y-4">
          <GreetingsBox
            type="greeting"
            title="Welcome"
            user={user?.firstName || "Guest"}
            subtext="Access and manage your financial transactions efficiently."
          />

          <div className="flex flex-col md:flex-row gap-y-2 gap-x-3">
            <Button variant="outline" size="sm" disabled>
              <Upload className="mr-2 " />
              Upload(pdf, csv)
              <Badge
                variant="secondary"
                className="italic text-xs text-cyan-600"
              >
                beta
              </Badge>
            </Button>
            <Button variant="outline" size="sm" onClick={onOpen}>
              <Upload className="mr-2" />
              Upload(png, jpeg)
            </Button>
            <Button variant="outline" size="sm" onClick={onCustomOpen}>
              <Plus className="mr-2" />
              Custom
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-between gap-4">
          {isLoading ? (
            <TotalBalanceBox.Skeleton />
          ) : (
            <TotalBalanceBox
              label="Total Debits"
              amount={formatAmount(dashboardData?.total_debit.sum_total)}
              icon={<TrendingDown className="text-red-500" />}
            />
          )}

          {isLoading ? (
            <TotalBalanceBox.Skeleton />
          ) : (
            <TotalBalanceBox
              label="Total Credits"
              amount={formatAmount(dashboardData?.total_credit.sum_total)}
              icon={<TrendingUp className="text-green-500" />}
            />
          )}

          {isLoading ? (
            <TotalBalanceBox.Skeleton />
          ) : (
            <TotalBalanceBox
              label="Failed Transactions"
              amount={formatAmount(dashboardData?.total_failed.sum_total)}
              icon={<Ban className="text-red-500" />}
            />
          )}

          {isLoading ? (
            <TotalBalanceBox.Skeleton />
          ) : (
            <TotalBalanceBox
              label="Successful Transactions"
              amount={formatAmount(dashboardData?.total_successful.sum_total)}
              icon={<CheckCircle className="text-green-500" />}
            />
          )}
        </div>

        <TransactionsTable
          transactions={dashboardData?.recent_transactions ?? []}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}
