// Answer.js


import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../../styles/Web.css';

const Answer = ({ questionId }) => {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`/admin/questions/${questionId}`);
        setQuestion(res.data);
      } catch (error) {
        console.error('문의사항 불러오기 실패:', error);
      }
    };

    if (questionId) fetchQuestion();
  }, [questionId]);

  const handleInput = (e) => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    setAnswer(e.target.value);
  };

  if (!question) return <div>불러오는 중...</div>;

  return (
    <div className="container">
      <h2>문의사항 답변</h2>
      <p><strong>문의 ID:</strong> {question.questionId}</p>
      <p><strong>제목:</strong> {question.title}</p>
      <p><strong>내용:</strong> {question.content}</p>
      <p><strong>작성자:</strong> {question.writer}</p>

      <textarea
        className="ans-text-box"
        placeholder="답변을 입력하세요"
        ref={textareaRef}
        value={answer}
        onChange={handleInput}
        rows={1}
        style={{ overflow: 'hidden' }}
      />
      <br />
      <button className="login-button">답변 등록</button>
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