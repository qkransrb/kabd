"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const now = new Date().getTime();
    const expires = window.localStorage.getItem("popup_expires");

    if (expires) {
      if (now > Number(expires)) {
        setOpen(true);
      }
    } else {
      setOpen(true);
    }
  }, []);

  const onOpenChange = () => {
    if (open) {
      setOpen(false);
    }
  };

  const closeToday = () => {
    const expires = new Date();
    expires.setHours(expires.getHours() + 24);
    window.localStorage.setItem("popup_expires", String(expires.getTime()));
    setOpen(false);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="relative">
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle hidden />
            <AlertDialogDescription>
              <Image
                src={popupImage}
                alt="Announcement"
                height={1080}
                width={1080}
                priority
                className="w-[1080px] h-auto"
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={closeToday}
              className="w-full font-semibold"
            >
              오늘하루 열지않기
            </AlertDialogAction>
            <AlertDialogAction
              onClick={onClose}
              className="w-full font-semibold"
            >
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MainPopup;