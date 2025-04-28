import api from "./api";

export async function getUsers() {
  try {
    // const { data } = await api.get(`/todos/${id}`)
    // return data
    return {
      user1: {
        userName: "홍길동",
        createDate: "2024-01-15T10:30:00Z",
        userId: "gildong101@naver.com",
        isSuspended: false,
      },
      user2: {
        userName: "홍길동",
        createDate: "2023-11-20T14:45:00Z",
        userId: "hgd002",
        isSuspended: true,
      },
      user3: {
        userName: "김철수",
        createDate: "2023-12-05T09:20:00Z",
        userId: "chulsoo03@gmail.com",
        isSuspended: false,
      },
      user4: {
        userName: "이영희",
        createDate: "2024-02-10T13:15:00Z",
        userId: "younghee_l@naver.com",
        isSuspended: false,
      },
      user5: {
        userName: "박민수",
        createDate: "2023-09-25T11:10:00Z",
        userId: "minsu92@daum.net",
        isSuspended: true,
      },
      user6: {
        userName: "최지은",
        createDate: "2024-03-01T08:00:00Z",
        userId: "jieun_cj@gmail.com",
        isSuspended: false,
      },
      user7: {
        userName: "한서준",
        createDate: "2024-01-30T17:30:00Z",
        userId: "seojunhan@hotmail.com",
        isSuspended: false,
      },
      user8: {
        userName: "정다은",
        createDate: "2023-10-12T15:05:00Z",
        userId: "daeun93@naver.com",
        isSuspended: true,
      },
      user9: {
        userName: "오수빈",
        createDate: "2024-02-20T07:45:00Z",
        userId: "soobin_o@daum.net",
        isSuspended: false,
      },
      user10: {
        userName: "배준호",
        createDate: "2024-03-15T12:30:00Z",
        userId: "junho.bae@gmail.com",
        isSuspended: false,
      },
      user11: {
        userName: "강하늘",
        createDate: "2023-11-05T19:50:00Z",
        userId: "sky_kang@naver.com",
        isSuspended: true,
      },
      user12: {
        userName: "조은비",
        createDate: "2024-04-01T10:10:00Z",
        userId: "eunbee_cho@daum.net",
        isSuspended: false,
      },
    };
  } catch (error) {
    console.error("todo를 받아 오는 데에 실패했습니다. :", error);
    return null;
  }
}
