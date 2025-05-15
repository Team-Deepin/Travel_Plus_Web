import api from "./api";

export async function getNotices() {
  try {
    return {
      notice1: {
        noticeId: 1,
        title: "서비스 점검 안내",
        date: "2025-05-10",
        isPosted: true,
        contents: "2025년 5월 11일 02:00부터 04:00까지 서버 점검이 진행됩니다."
      },
      notice2: {
        noticeId: 2,
        title: "신규 기능 출시 안내",
        date: "2025-05-09",
        isPosted: true,
        contents: "여행 코스 추천 기능이 추가되었습니다. 많은 이용 부탁드립니다."
      },
      notice3: {
        noticeId: 3,
        title: "이벤트 종료 공지",
        date: "2025-05-08",
        isPosted: false,
        contents: "봄맞이 이벤트가 5월 7일자로 종료되었습니다. 참여해주셔서 감사합니다."
      },
      notice4: {
        noticeId: 4,
        title: "약관 변경 안내",
        date: "2025-05-07",
        isPosted: true,
        contents: "개인정보 처리방침 및 이용약관이 일부 개정되었습니다. 변경사항을 확인해주세요."
      },
      notice5: {
        noticeId: 5,
        title: "고객센터 휴무일 공지",
        date: "2025-05-06",
        isPosted: false,
        contents: "5월 15일은 임시 휴무일로 고객센터 운영이 중단됩니다."
      },
      notice6: {
        noticeId: 6,
        title: "서비스 만족도 조사 참여 요청",
        date: "2025-05-05",
        isPosted: true,
        contents: "설문조사에 참여하고 추첨을 통해 소정의 상품을 받아보세요."
      },
      notice7: {
        noticeId: 7,
        title: "앱 업데이트 안내",
        date: "2025-05-04",
        isPosted: true,
        contents: "최신 버전으로 업데이트하여 더 빠르고 안정적인 서비스를 이용하세요."
      },
      notice8: {
        noticeId: 8,
        title: "계정 보안 점검 실시",
        date: "2025-05-03",
        isPosted: false,
        contents: "보안 강화를 위해 5월 중 1회 이상 비밀번호를 변경해주시기 바랍니다."
      },
      notice9: {
        noticeId: 9,
        title: "공지사항 예시 9번",
        date: "2025-05-02",
        isPosted: true,
        contents: "이 공지는 테스트용 더미 데이터입니다."
      },
      notice10: {
        noticeId: 10,
        title: "공지사항 예시 10번",
        date: "2025-05-01",
        isPosted: true,
        contents: "관리자가 입력한 더미 공지입니다. 실제 공지가 아닙니다."
      }
    };
  } catch (error) {
    console.error("공지사항을 받아오는 데 실패했습니다. :", error);
    return null;
  }
}
