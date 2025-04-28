// Questions.js

import React, { useEffect, useState } from "react";
import "../../styles/Web.css";
import axios from "axios";
import { getQuestions } from "../../lib/questions";

const Questions = ({ setActiveKey, setQuestionId }) => {
  const [questions, setQuestions] = useState([]);
  const [searchName, setSearchName] = useState("");

  // 문의사항 목록 불러오기
  const fetchQuestions = async () => {
    try {
      // const res = await axios.get('/admin/questions');
      // setQuestions(res.data);
      const data = await getQuestions();
      if (data) {
        const questionList = Object.values(data);
        setQuestions(questionList);
      } else {
        alert("문의사항 목록을 불러오는 데 실패했습니다.");
      }
    } catch (error) {
      alert("문의사항 목록을 불러오는 데 실패했습니다.");
    }
  };

  // 문의사항 검색
  const handleSearch = async () => {
    if (!searchName.trim()) {
      fetchQuestions();
      return;
    }

    try {
      // const res = await axios.get(`/admin/questions/search?name=${searchName}`);
      // if (!res.data || (Array.isArray(res.data) && res.data.length === 0)) {
      //   alert("해당하는 문의사항이 없습니다.");
      //   setQuestions([]);
      // } else {
      //   setQuestions([res.data]);
      // }
      const data = await getQuestions();
      if (data) {
        const questionList = Object.values(data);
        const filteredQuestions = questionList.filter((question) =>
          question.questionName.includes(searchName)
        );                      
        if (filteredQuestions.length === 0) {
          alert("해당하는 문의사항이 없습니다.");
          setQuestions([]);
        } else {
          setQuestions(filteredQuestions);
        }
      } else {
        alert("검색에 실패했습니다.");
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchQuestions();
  }, []);

  // 문의 클릭 시 답변창으로 이동
  const handleClick = (id) => {
    setQuestionId(id);
    setActiveKey("answer");
  };

  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          placeholder="문의사항 검색"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={handleSearch}>🔍</button>
      </div>
      <table className="Ques-table">
        <thead>
          <tr>
            <th>문의사항 번호</th>
            <th>제목</th>
            <th>작성자 ID</th>
            <th>답변 여부</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr
              key={q.questionId}
              onClick={() => handleClick(q.questionId)}
              style={{ cursor: "pointer" }}
            >
              <td>{q.questionId}</td>
              <td>{q.title}</td>
              <td>{q.writer}</td>
              <td>{q.answered ? "답변 완료" : "미완료"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Questions;

/*
// 테스트

// components/contents/Questions.js
import React, { useEffect, useState } from "react";
import "../../styles/Web.css";

const Questions = ({ setActiveKey, setQuestionId }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchMockQuestions = async () => {
      try {
        const res = await fetch("/mock-questions.json");
        const data = await res.json();
        setQuestions(data);
      } catch (error) {
        console.error("mock 문의사항 불러오기 실패:", error);
      }
    };

    fetchMockQuestions();
  }, []);

  const handleClick = (id) => {
    setQuestionId(id);
    setActiveKey("answer");
  };

  return (
    <div className="container">
      <h2>문의사항 목록 (Mock)</h2>
      <table className="Ques-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>답변 여부</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr
              key={q.questionId}
              onClick={() => handleClick(q.questionId)}
              style={{ cursor: "pointer" }}
            >
              <td>{q.questionId}</td>
              <td>{q.title}</td>
              <td>{q.writer}</td>
              <td>{q.answered ? "답변 완료" : "미완료"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Questions;

*/
