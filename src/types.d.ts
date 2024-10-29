type AuthUser = {
  code: string;
  m_id: string;
  m_name: string;
  m_en_name: string;
  m_mobile: string;
  m_email: string;
  m_regular: string;
  m_type: string;
  msg: string;
  jwt: string;
};

type LocalStorageUser = {
  email: string;
  grade: string;
  mobile: string;
  name: string;
  userId: string;
  type: string;
};

type UserProfile = {
  mem_info: {
    m_id: string;
    m_name: string;
    m_en_name: string;
    m_jumin: string;
    m_sex: string;
    m_mobile: string;
    m_email: string;
    m_license_number: string;
    m_school: string;
    m_major: string;
    m_notices_method: string;
    m_zipcode: string;
    m_addr1: string;
    m_addr2: string;
    m_type: string;
    m_address_select: string;
    m_position: string;
    m_position_phone: string;
  };
  code: string;
  msg: string;
  m_id: string;
  m_date: string;
};

type Notice = {
  rnum: string;
  b_seq: string;
  b_title: string;
  b_count: string;
  b_regdate: string;
};

type NoticeList = {
  list: Notice[];
  currentPage: string;
  page_cnt: number;
  code: string;
  msg: string;
  total: string;
};

type News = {
  rnum: string;
  b_seq: string;
  b_title: string;
  b_count: string;
  b_regdate: string;
};

type NewsList = {
  list: News[];
  currentPage: string;
  page_cnt: number;
  code: string;
  msg: string;
  total: string;
};

type Newsroom = {
  rnum: string;
  b_seq: string;
  b_title: string;
  b_count: string;
  b_regdate: string;
};

type NewsroomList = {
  list: News[];
  currentPage: string;
  page_cnt: number;
  code: string;
  msg: string;
  total: string;
};

type Gallery = {
  rnum: string;
  b_seq: string;
  b_title: string;
  b_location: string;
  b_date_string: string;
  b_count: string;
  b_regdate: string;
  thumbnail: string;
};

type GalleryList = {
  list: Gallery[];
  currentPage: string;
  page_cnt: number;
  code: string;
  msg: string;
  total: string;
};

type ReferenceCase = {
  rnum: string;
  b_seq: string;
  b_title: string;
  b_count: string;
  thumbnail: string;
  b_contents: string;
  b_regdate: string;
};

type ReferenceCaseList = {
  list: ReferenceCase[];
  currentPage: string;
  page_cnt: number;
  code: string;
  msg: string;
  total: string;
};

type NoticeDetails = {
  data: {
    b_seq: string;
    bm_seq: string | null;
    b_class: string | null;
    b_title: string;
    b_contents: string;
    b_contents_type: string;
    b_link_url: string;
    b_count: string;
    b_date: string;
    b_display_yn: string;
    b_status: string;
    b_user_id: string;
    b_user_name: string;
    b_user_pwd: string;
    b_user_email: string;
    b_user_ip: string;
    b_reply_group: string;
    b_reply_sort: string;
    b_reply_level: string;
    b_file1: string;
    b_file2: string;
    b_file3: string;
    b_file1_real: string;
    b_file2_real: string;
    b_file3_real: string;
    b_category: string;
    sDate: string;
    eDate: string;
    b_cate: string;
    b_date2: string;
    b_location: string | null;
    b_date_string: string | null;
  };
  code: string;
  msg: string;
};

type NewsDetails = {
  data: {
    b_seq: string;
    bm_seq: string | null;
    b_class: string | null;
    b_title: string;
    b_contents: string;
    b_contents_type: string;
    b_link_url: string;
    b_count: string;
    b_date: string;
    b_display_yn: string;
    b_status: string;
    b_user_id: string;
    b_user_name: string;
    b_user_pwd: string;
    b_user_email: string;
    b_user_ip: string;
    b_reply_group: string;
    b_reply_sort: string;
    b_reply_level: string;
    b_file1: string;
    b_file2: string;
    b_file3: string;
    b_file1_real: string;
    b_file2_real: string;
    b_file3_real: string;
    b_category: string;
    sDate: string;
    eDate: string;
    b_cate: string;
    b_date2: string;
    b_location: string | null;
    b_date_string: string | null;
  };
  code: string;
  msg: string;
};

type NewsroomDetails = {
  data: {
    b_seq: string;
    bm_seq: string | null;
    b_class: string | null;
    b_title: string;
    b_contents: string;
    b_contents_type: string;
    b_link_url: string;
    b_count: string;
    b_date: string;
    b_display_yn: string;
    b_status: string;
    b_user_id: string;
    b_user_name: string;
    b_user_pwd: string;
    b_user_email: string;
    b_user_ip: string;
    b_reply_group: string;
    b_reply_sort: string;
    b_reply_level: string;
    b_file1: string;
    b_file2: string;
    b_file3: string;
    b_file1_real: string;
    b_file2_real: string;
    b_file3_real: string;
    b_category: string;
    sDate: string;
    eDate: string;
    b_cate: string;
    b_date2: string;
    b_location: string | null;
    b_date_string: string | null;
  };
  code: string;
  msg: string;
};

type GalleryDetailsPhoto = {
  rnum: string;
  bf_seq: string;
  bf_real_name: string;
  bf_link: string;
  bf_file_size: string;
  bf_file_ext: string;
};

type GalleryDetails = {
  list: GalleryDetailsPhoto[] | [];
  data: {
    b_seq: string;
    bm_seq: string | null;
    b_class: string | null;
    b_title: string;
    b_contents: string;
    b_contents_type: string;
    b_link_url: string;
    b_count: string;
    b_date: string;
    b_display_yn: string;
    b_status: string;
    b_user_id: string;
    b_user_name: string;
    b_user_pwd: string;
    b_user_email: string;
    b_user_ip: string;
    b_reply_group: string;
    b_reply_sort: string;
    b_reply_level: string;
    b_file1: string;
    b_file2: string;
    b_file3: string;
    b_file1_real: string;
    b_file2_real: string;
    b_file3_real: string;
    b_category: string;
    sDate: string;
    eDate: string;
    b_cate: string;
    b_date2: string;
    b_location: string | null;
    b_date_string: string | null;
  };
  code: string;
  msg: string;
};

type ReferenceCaseDetails = {
  data: {
    b_seq: string;
    bm_seq: string | null;
    b_class: string | null;
    b_title: string;
    b_contents: string;
    b_contents_type: string;
    b_link_url: string;
    b_count: string;
    b_date: string;
    b_display_yn: string;
    b_status: string;
    b_user_id: string;
    b_user_name: string;
    b_user_pwd: string;
    b_user_email: string;
    b_user_ip: string;
    b_reply_group: string;
    b_reply_sort: string;
    b_reply_level: string;
    b_file1: string;
    b_file2: string;
    b_file3: string;
    b_file1_real: string;
    b_file2_real: string;
    b_file3_real: string;
    b_category: string;
    sDate: string;
    eDate: string;
    b_cate: string;
    b_date2: string;
    b_location: string | null;
    b_date_string: string | null;
  };
  code: string;
  msg: string;
};

type Abstract = {
  rnum: string;
  b_seq: string;
  b_title: string;
  b_file1: string;
  b_count: string;
  b_regdate: string;
};

type AbstractList = {
  list: Abstract[];
  total: string;
  currentPage: string;
  page_cnt: number;
  code: string;
  msg: string;
};

type AbstractDetails = {
  list: {
    rnum: string;
    bf_seq: string;
    bf_real_name: string;
    bf_file_size: string;
    bf_file_ext: string;
    bf_link: string;
  }[];
  data: {
    b_seq: "315";
    bm_seq: string | null;
    b_class: string | null;
    b_title: string;
    b_contents: string;
    b_contents_type: string;
    b_link_url: string;
    b_count: string;
    b_date: string;
    b_display_yn: string;
    b_status: string;
    b_user_id: string;
    b_user_name: string;
    b_user_pwd: string;
    b_user_email: string;
    b_user_ip: string;
    b_reply_group: string;
    b_reply_sort: string;
    b_reply_level: string;
    b_file1: string;
    b_file2: string;
    b_file3: string;
    b_file1_real: string;
    b_file2_real: string;
    b_file3_real: string;
    b_category: string;
    sDate: string;
    eDate: string;
    b_cate: string;
    b_date2: string;
    b_location: string;
    b_date_string: string;
  };
  code: string;
  msg: string;
};

type Video = {
  rnum: string;
  b_seq: string;
  b_title: string;
  b_location: string;
  b_date_string: string;
  b_file2_real: string;
  b_count: string;
  b_regdate: string;
};

type VideoList = {
  list: Video[];
  total: string;
  currentPage: number;
  page_cnt: number;
  code: string;
  msg: string;
};

type Conference = {
  rnum: string;
  ac_seq: string;
  ac_title: string;
  ac_date_string: string;
  ac_location: string;
  ac_file1: string;
  ac_file1_real: string;
};

type ConferenceList = {
  ingList: Conference[] | [];
  endList: Conference[] | [];
  currentPage: string;
  total: string;
  page_cnt: number;
  code: string;
  msg: string;
};

type Schedule = {
  ac_seq: string;
  ac_title: string;
  ac_location: string;
  ac_date_string: string;
  sDate: string;
  eDate: string;
};

type ScheduleListForMonth = {
  month: string; //"2024-11"
  list: Schedule[];
  code: string;
  msg: string;
};

type HomeNoticeList = {
  rnum: string;
  b_seq: string;
  b_title: string;
  b_contents: string;
  b_count: string;
  b_regdate: string;
}[];

type HomePressList = {
  rnum: string;
  b_seq: string;
  b_title: string;
  b_file1: string;
  b_count: string;
  b_regdate: string;
}[];

type HomeConferenceList = {
  rnum: string;
  ac_seq: string;
  ac_title: string;
  ac_date_string: string;
  ac_file1: string;
  ac_file1_real: string;
}[];

type HomeResources = {
  notice: HomeNoticeList;
  press: HomePressList;
  conference: HomeConferenceList;
  code: string;
  msg: string;
};

type UpdateDentistProfile = {
  address: string;
  addressDetail: string;
  addressName: string;
  addressTel: string;
  addressType: string;
  birth: string;
  confirmNumber: string;
  confirmPassword: string;
  email: string;
  englishName: string;
  gender: string;
  koreanName: string;
  license: string;
  major: string[];
  password: string;
  phone: string;
  phoneConfirm: boolean;
  type: string;
  university: string;
  userId: string;
  zipcode: string;
};

type UpdateGeneralProfile = {
  address: string;
  addressDetail: string;
  addressName: string;
  addressTel: string;
  addressType: string;
  birth: string;
  confirmNumber: string;
  confirmPassword: string;
  email: string;
  englishName: string;
  gender: string;
  koreanName: string;
  password: string;
  phone: string;
  phoneConfirm: boolean;
  type: string;
  userId: string;
  zipcode: string;
};
