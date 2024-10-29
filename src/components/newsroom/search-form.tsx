"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  q: z.string(),
});

const SearchForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      q: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { q } = values;
    q ? router.push(`/newsroom?q=${q}`) : router.push(`/newsroom`);
  };

  return (
    <div className="mb-[200px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center justify-center gap-3"
        >
          <FormField
            control={form.control}
            name="q"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="min-w-[409px] h-[50px] bg-[#F5F5F5] text-base font-medium leading-[19.2px] custom-letter-spacing placeholder:text-[#828282] outline-none border-none"
                    placeholder="검색어를 입력해 주세요."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-[94px] h-[50px] flex items-center justify-center gap-x-1.5"
          >
            <span className="text-base text-white font-medium custom-letter-spacing leading-[19.09px]">
              검색
            </span>
            <Search size={18} className="mb-1" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SearchForm;
