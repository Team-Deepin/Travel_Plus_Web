import Answer from "../components/contents/Answer";
import api from "./api";

export async function getQuestions() {
  try {
    // const { data } = await api.get(`/todos/${id}`)
    // return data
    return {
      question1: {
        inquireId: 1,
        title: "여행 일정 변경 문의",
        authorId: "gildong101@naver.com",
        contents: "여행 일정을 바꾸고 싶은데, 어떻게 해야할까요 ?",
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
        contents: "재 가입을 위해 회원 탈퇴를 하고싶어요. 탈퇴시켜주세요.",
        answer: null,
        isAnswered: false,
      },
    };
  } catch (error) {
    console.error("todo를 받아 오는 데에 실패했습니다. :", error);
    return null;
  }
}
