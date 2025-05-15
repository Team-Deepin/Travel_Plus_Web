// Answer.js

import React, { useEffect, useState, useRef } from "react";
import "../../styles/Web.css";
import axios from "axios";
import { getQuestions } from "../../lib/questions";

const Answer = ({ questionId, setActiveKey }) => {
  const [question, setQuestion] = useState(null);
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        // const res = await axios.get(`/admin/questions/${questionId}`);
        // setQuestion(res.data);
        const data = await getQuestions();
        if (data) {
          const questionList = Object.values(data);

          const foundQuestion = questionList.find(
            (q) => q.inquireId === questionId
          );

          if (foundQuestion) {
            setQuestion(foundQuestion);
            setTitle(foundQuestion.title);
            setAnswer(foundQuestion.answer || "");
          } else {
            alert("해당 문의를 찾을 수 없습니다.");
          }
        } else {
          alert("답변 창을 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        alert("답변 창을 불러오는 데 오류가 발생했습니다.");
      }
    };

    if (questionId) fetchQuestion();
  }, [questionId]);

  const handleSubmit = async () => {
    try {
      // await axios.post(`/admin/questions/${questionId}/answer`, { answer });

      alert("답변이 등록되었습니다.");
      setActiveKey("questions");
    } catch (error) {
      alert("답변 등록에 실패했습니다.");
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
        <strong>내용:</strong> {question.contents}
      </p>
      <textarea
        className="ans-text-box"
        placeholder="답변을 입력하세요"
        ref={textareaRef}
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

/*

// components/contents/Answer.js
import React, { useEffect, useState, useRef } from "react";
import "../../styles/Web.css";

const Answer = ({ questionId }) => {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const fetchMockQuestion = async () => {
      try {
        const res = await fetch("/mock-question.json");
        const data = await res.json();
        setQuestion(data);
      } catch (error) {
        console.error("mock 문의사항 불러오기 실패:", error);
      }
    };

    fetchMockQuestion();
  }, [questionId]);

  const handleInput = (e) => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // 높이 초기화
    textarea.style.height = `${textarea.scrollHeight}px`; // 글자에 맞게 높이 조정
    setAnswer(e.target.value);
  };

  if (!question) return <div>불러오는 중...</div>;

  return (
    <div className="container">
      <div className="ans-text">
        <p>문의 번호: {question.questionId}</p>
        <p>제목: {question.title}</p>
        <p>문의자: {question.writer}</p>
        <p>내용: {question.content}</p>
      </div>

      <textarea
        className="ans-text-box"
        ref={textareaRef}
        value={answer}
        onChange={handleInput}
        placeholder="답변을 입력하세요"
      />
      <br />
      <button className="login-button">답변 등록</button>
    </div>
  );
};

export default Answer;

*/
