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
        isAnswered: true,
      },
      question2: {
        inquireId: 2,
        title: "탈퇴 관련 문의",
        authorId: "chulsoo03@gmail.com",
        isAnswered: false,
      },
    };
  } catch (error) {
    console.error("todo를 받아 오는 데에 실패했습니다. :", error);
    return null;
  }
}
