import { getNoticeList } from "@/actions/notice-actions";
import NoticeTable from "@/components/notice/notice-table";
import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";

interface Props {
  searchParams: {
    q: string;
    page: number;
  };
}

const Notice = async ({ searchParams: { q, page } }: Props) => {
  const noticeList = await getNoticeList(q, page);

  return (
    <div className="mt-[38px] max-w-screen-xl mx-auto">
      <PageNavigation first="Home" second="학회소식" third="공지사항" />

      <section className="mb-[105px]">
        <SubTitle text="공지사항" className="mt-[30px] mb-[58px]" />
      </section>

      <NoticeTable noticeList={noticeList} />
    </div>
  );
};

export default Notice;
