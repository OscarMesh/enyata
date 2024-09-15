import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

type props = {
  label: string;
  amount: string | number;
  icon: ReactNode;
};

export const TotalBalanceBox = ({ label, amount, icon }: props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex gap-x-4 items-center">
          {label}
          <span>{icon}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>{amount}</CardContent>
    </Card>
  );
};

TotalBalanceBox.Skeleton = function TotalBalanceBoxSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex gap-x-4 items-center">
          <Skeleton className="w-24 h-6 bg-neutral-200" />
          <Skeleton className="w-6 h-6 bg-neutral-200" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="w-24 h-8 bg-neutral-200" />
      </CardContent>
    </Card>
  );
};
