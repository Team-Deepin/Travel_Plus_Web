import api from "./api";

export async function getNotices() {
    try {
        // const { data } = await api.get(`/todos/${id}`)
        // return data
      return {
        notice1: {
          noticeId: 1,
          title: "서비스 점검 안내",
          date: "2025-05-10",
          isPosted: true,
        },
        notice2: {
          noticeId: 2,
          title: "신규 기능 출시 안내",
          date: "2025-05-09",
          isPosted: true,
        },
        notice3: {
          noticeId: 3,
          title: "이벤트 종료 공지",
          date: "2025-05-08",
          isPosted: false,
        },
        notice4: {
          noticeId: 4,
          title: "약관 변경 안내",
          date: "2025-05-07",
          isPosted: true,
        },
        notice5: {
          noticeId: 5,
          title: "고객센터 휴무일 공지",
          date: "2025-05-06",
          isPosted: false,
        },
      };
    } catch (error) {
      console.error("공지사항을 받아오는 데 실패했습니다. :", error);
      return null;
    }
  }
  