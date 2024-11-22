"use client";

import { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Postcode = (props: any) => {
  const [open, setOpen] = useState<boolean>(false);

  const onOpenChange = () => {
    if (open) setOpen(false);
  };

  const handleClose = () => setOpen(false);

  const handleComplete = (data: any) => {
    let zonecode = data.zonecode;
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    props.setAddress(fullAddress);
    props.setZipcode(zonecode);

    props.form.setValue("address", fullAddress);
    props.form.setValue("zipcode", zonecode);

    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="h-9 lg:h-10 rounded-[6px] lg:rounded-full w-auto lg:min-w-[116px] text-xs lg:text-sm font-medium custom-letter-spacing bg-black disabled:bg-[#828282] text-white leading-[16.8px] !m-0 text-nowrap px-1 lg:px-0"
        >
          우편번호 찾기
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px] px-0 lg:px-6">
        <DialogHeader>
          <DialogTitle className="font-bold">우편번호 찾기</DialogTitle>
        </DialogHeader>
        <DaumPostcodeEmbed onComplete={handleComplete} {...props} />
      </DialogContent>
    </Dialog>
  );
};

export default Postcode;
