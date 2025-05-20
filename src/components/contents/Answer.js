// Answer.js

import React, { useEffect, useState } from "react";
import "../../styles/Web.css";
import { getQuestion, postAnswer } from "../../lib/questions";

const Answer = ({ questionId, setActiveKey, showModal }) => {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const data = await getQuestion(questionId);
        setQuestion(data);
        setAnswer(data.answer || "");
      } catch (error) {
        showModal("답변 창을 불러오는 데 오류가 발생했습니다.");
      }
    };

    if (questionId) fetchQuestion();
  }, [questionId]);

  const handleSubmit = async () => {
    if (!answer.trim()) {
      showModal("답변을 입력해주세요.");
      return;
    }
    
    try {
      await postAnswer(questionId, answer.trim())
      setActiveKey("questions");
    } catch (error) {
      showModal("답변 등록에 실패했습니다.");
    }
  };

  if (!question) return <div>불러오는 중...</div>;

  return (
    <div className="container">
      <h2>문의사항 답변</h2>
      <p>
        <strong>문의 ID:</strong> {String(question.inquireId).padStart(8, "0")}
      </p>
      <p>
        <strong>제목:</strong> {question.title}
      </p>
      <p>
        <strong>내용:</strong> {question.content}
      </p>
      <textarea
        className="ans-text-box"
        placeholder="답변을 입력하세요"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <br />
      <button className="login-button" onClick={handleSubmit}>
        답변 등록
      </button>
    </div>
  );
};

export default Answer;
