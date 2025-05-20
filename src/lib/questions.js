// questions.js

import api from "./api";

export async function getQuestions() {
  try {
    const { data } = await api.get(`/admin/inquires`)
    return data
  } catch (error) {
    console.error("질문 목록을 받아오는 데 실패했습니다:", error);
    return null;
  }
}

export async function getQuestion(inquireId) {
  try {
    const { data } = await api.get(`/admin/inquires/${inquireId}`)
    return data
  } catch (error) {
    console.error("질문을 받아오는 데 실패했습니다:", error);
    return null;
  }
}

export async function postAnswer(inquireId, answer) {
  try {
    const { resultCode } = await api.post(`/admin/inquires/${inquireId}`,
      {
        inquireId: inquireId,
        answer: answer,
        answerDate: new Date().toISOString(),
      }
    )
    if (resultCode === 200) return 1;
    else return null;
  } catch (error) {
    console.error("답변을 작성하는 데 실패했습니다:", error);
    return null;
  }
}

export async function queryQuestion(query) {
  try {
    const { data } = await api.post(`/admin/inquires/findInquire`,
      {
        userName: query,
        title: query,
      }
    )
    return data;
  } catch (error) {
    console.error("질문 목록을 받아오는 데 실패했습니다:", error);
    return null;
  }
}