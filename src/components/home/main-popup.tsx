"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import popupImage from "@/assets/images/main-popup.jpeg";

const MainPopup = () => {
  const [open, setOpen] = useState<boolean>(true);

  const onOpenChange = () => {
    if (open) {
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle hidden />
            <AlertDialogDescription>
              <Image src={popupImage} alt="" height={1080} width={1080} />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="absolute top-2 right-4 bg-transparent hover:bg-transparent p-0">
              <X color="#000" className="!size-6" />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MainPopup;
