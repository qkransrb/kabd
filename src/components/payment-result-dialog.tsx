"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface Props {
  q: string;
  url: string;
}

const PaymentResultDialog = ({ q, url }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const { refresh, push } = useRouter();

  useEffect(() => {
    if (q === "success" || q === "failed") {
      setOpen(true);
    }
  }, [q]);

  const onOpenChange = () => {
    return open ? setOpen(false) : setOpen(true);
  };

  const onRefresh = () => {
    refresh();
    push(url);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle
            className={cn("", q === "failed" ? "text-destructive" : "")}
          >
            {q === "success" && "결제 성공"}
            {q === "failed" && "결제 실패"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {q === "success" && "결제가 정상적으로 처리되었습니다."}
            {q === "failed" && "결제에 실패하였습니다."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onRefresh}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PaymentResultDialog;
