import { getPaymentList, getProductList } from "@/actions/my-page-actions";
import MyPageSidebar from "@/components/my-page/my-page-sidebar";
import MyPayment from "@/components/my-page/my-payment";
import PageNavigation from "@/components/page-navigation";
import PaymentResultDialog from "@/components/payment-result-dialog";
import SubTitle from "@/components/sub-title";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: { page: number; q?: string };
}

const MyPage = async ({ searchParams: { page, q } }: Props) => {
  const productList = await getProductList();
  const paymentList = await getPaymentList(page);

  return (
    <div className="mt-9 lg:mt-[38px] max-w-screen-xl mx-auto px-5 lg:px-0">
      <PageNavigation first="Home" second="마이페이지" />

      <section className="lg:mb-[105px]">
        <SubTitle
          text="마이페이지"
          className="mt-[50px] lg:mt-[30px] mb-[30px] lg:mb-0"
        />
      </section>

      <section className="flex flex-col lg:flex-row mb-[100px] lg:mb-[200px]">
        <div className="lg:w-3/12 lg:pr-6">
          <MyPageSidebar />
        </div>

        <div className="lg:w-9/12 lg:pl-6 lg:border-l lg:border-[#D9D9D9]">
          <MyPayment productList={productList} paymentList={paymentList} />
        </div>
      </section>

      {q && <PaymentResultDialog q={q} url="/my-page/payment" />}
    </div>
  );
};

export default MyPage;
