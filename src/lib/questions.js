// questions.js

import Answer from "../components/contents/Answer";
import api from "./api";

export async function getQuestions() {
  try {
    return {
      question1: {
        inquireId: 1,
        title: "여행 일정 변경 문의",
        authorId: "gildong101@naver.com",
        contents: "여행 일정을 바꾸고 싶은데, 어떻게 해야할까요?",
        answer: `안녕하세요, 고객님.

여행 일정을 변경하시려면 기존 일정을 삭제하신 후, 새로운 일정을 다시 생성해주시면 됩니다.

1. [내 여행] 메뉴에서 현재 예약된 일정을 선택하시고 "일정 삭제" 버튼을 클릭해 주세요.
2. 삭제가 완료되면, [여행 만들기] 메뉴로 이동하여 새로운 여행 계획을 등록하시면 됩니다.

※ 참고: 일정 삭제 시 복구가 불가능하므로, 삭제 전 꼭 확인 부탁드립니다.
※ 새로운 일정 등록 시 기존과 다른 날짜나 코스를 자유롭게 선택하실 수 있습니다.

추가 문의 사항이 있으시면 고객센터(☎️ 1234-5678)로 연락 주시기 바랍니다.

감사합니다.`,
        isAnswered: true,
      },
      question2: {
        inquireId: 2,
        title: "탈퇴 관련 문의",
        authorId: "chulsoo03@gmail.com",
        contents: "재가입을 위해 회원 탈퇴를 하고 싶어요. 탈퇴시켜주세요.",
        answer: null,
        isAnswered: false,
      },
      question3: {
        inquireId: 3,
        title: "예약 확인 방법",
        authorId: "sunny77@daum.net",
        contents: "예약 내역은 어디서 확인할 수 있나요?",
        answer: "안녕하세요. 마이페이지 > 예약 내역에서 확인하실 수 있습니다.",
        isAnswered: true,
      },
      question4: {
        inquireId: 4,
        title: "비밀번호 변경",
        authorId: "kimjh11@naver.com",
        contents: "비밀번호를 변경하고 싶습니다. 어떻게 해야 하나요?",
        answer: "설정 메뉴에서 '비밀번호 변경'을 선택하시면 됩니다.",
        isAnswered: true,
      },
      question5: {
        inquireId: 5,
        title: "결제 오류",
        authorId: "leeho@gmail.com",
        contents: "결제를 시도했는데 오류가 발생했어요.",
        answer: null,
        isAnswered: false,
      },
      question6: {
        inquireId: 6,
        title: "쿠폰 사용 방법",
        authorId: "yuna88@naver.com",
        contents: "쿠폰을 어떻게 사용하나요?",
        answer: "결제 페이지에서 '쿠폰 적용' 버튼을 눌러 선택해 주세요.",
        isAnswered: true,
      },
      question7: {
        inquireId: 7,
        title: "계정 잠김 문의",
        authorId: "minji09@kakao.com",
        contents: "로그인 시 계정이 잠겼다고 나옵니다.",
        answer: "고객센터로 연락 주시면 신속히 도와드리겠습니다.",
        isAnswered: true,
      },
      question8: {
        inquireId: 8,
        title: "여행 취소 관련",
        authorId: "honggildong@hanmail.net",
        contents: "여행 예약을 취소하고 싶어요.",
        answer: null,
        isAnswered: false,
      },
      question9: {
        inquireId: 9,
        title: "이벤트 참여 방법",
        authorId: "jihyun@naver.com",
        contents: "이벤트는 어디서 확인하고 참여할 수 있나요?",
        answer: "홈 화면 상단의 배너를 통해 참여하실 수 있습니다.",
        isAnswered: true,
      },
      question10: {
        inquireId: 10,
        title: "회원 등급 기준",
        authorId: "donghoon@outlook.com",
        contents: "회원 등급은 어떤 기준으로 정해지나요?",
        answer: "최근 3개월 이용 금액을 기준으로 등급이 정해집니다.",
        isAnswered: true,
      },
      question11: {
        inquireId: 11,
        title: "프로필 사진 변경",
        authorId: "ariel88@naver.com",
        contents: "프로필 사진을 바꾸고 싶은데 어떻게 하나요?",
        answer: "마이페이지 > 프로필 수정에서 사진 변경이 가능합니다.",
        isAnswered: true,
      },
    };
  } catch (error) {
    console.error("질문 목록을 받아오는 데 실패했습니다:", error);
    return null;
  }
}
