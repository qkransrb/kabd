"use client";

import { ChevronRight, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { registConference } from "@/actions/conference-actions";
import { isAuthenticated } from "@/actions/auth-actions";

interface Props {
  id: string;
  conference: {
    ac_file1: string;
    ac_date: string;
    ac_title: string;
    ac_seq: string;
    amount: string;
    r_amount: string;
    code: string;
    msg: string;
  };
}

const ConferencePaymentButton = ({ id, conference }: Props) => {
  const [user, setUser] = useState<LocalStorageUser | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(window.localStorage.getItem("kabd_user")!));
    }
  }, [user]);

  const payment = async () => {
    setIsPending(true);
    const authenticated = await isAuthenticated();

    if (!authenticated || !user) {
      setIsPending(false);
      return;
    }

    const amount =
      authenticated && user && user.grade !== "N"
        ? conference.r_amount
        : conference.amount;

    const result = await registConference(id, amount);
    if (result.code === "000" && result.msg === "success") {
      setIsPending(false);
      window.alert("신청이 완료되었습니다.");
    } else {
      setIsPending(false);
      window.alert(result.msg);
    }
  };

  return (
    <div>
      {user && user.grade !== "N" ? (
        <Button
          type="button"
          onClick={payment}
          disabled={isPending}
          className="w-[269px] h-[56px] flex items-center justify-center rounded-[10px] mb-[100px]"
        >
          {isPending ? (
            <Loader className="animate-spin !size-5" />
          ) : (
            <>
              <span className="text-lg text-white font-semibold leading-[21.48px] pl-2">
                결제하기
              </span>
              <ChevronRight size={20} className="mb-0.5" />
            </>
          )}
        </Button>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              onClick={payment}
              disabled={isPending}
              className="w-[269px] h-[56px] flex items-center justify-center rounded-[10px] mb-[100px]"
            >
              {isPending ? (
                <Loader className="animate-spin !size-5" />
              ) : (
                <>
                  <span className="text-lg text-white font-semibold leading-[21.48px] pl-2">
                    결제하기
                  </span>
                  <ChevronRight size={20} className="mb-0.5" />
                </>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="center"
            className="p-9 w-[674px] rounded-[20px]"
          >
            <strong className="text-[20px] font-bold custom-letter-spacing mb-6 block">
              결제 안내
            </strong>
            <div className="custom-letter-spacing space-y-1.5 mb-4">
              <p>현재 카드결제 시스템 도입중으로, 계좌이체만 가능합니다.</p>
              <p className="font-bold underline underline-offset-2">
                신한은행 140-014-665217 ( 예금주:(사)한국생체모방치의학회 )
              </p>
              <p>
                치과의사의 경우 입금 시 면허번호+성함으로 입금 부탁드립니다.
                (ex:99999홍길동)
              </p>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default ConferencePaymentButton;
