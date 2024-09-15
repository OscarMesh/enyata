import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCustomAdd } from "../hooks/use-custom-add";
import { CustomAddForm } from "./custom-add-form";

export const CustomAddSheet = () => {
  const { isOpen, onClose } = useCustomAdd();
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Add Transaction</SheetTitle>
          <SheetDescription>
            Manually add your recent transactions to your transactions summary
          </SheetDescription>
        </SheetHeader>

        <CustomAddForm />
      </SheetContent>
    </Sheet>
  );
};
