// Questions.js

import React, { useEffect, useState } from "react";
import "../../styles/Web.css";
import { getQuestions, queryQuestion } from "../../lib/questions";

const Questions = ({ setActiveKey, setQuestionId, showModal }) => {
  const [questions, setQuestions] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

  // 문의사항 목록 불러오기
  const fetchQuestions = async () => {
    try {
      const data = await getQuestions();
      if (!Array.isArray(data)) throw new Error();
      
      if (data.length > 0) setQuestions(data);
      else setQuestions([]);
    } catch (error) {
      showModal("문의사항 목록 조회에 실패했습니다.");
    }
  };

  // 문의사항 검색
  const handleSearch = async () => {
    if (!searchName.trim()) {
      fetchQuestions();
      return;
    }

    try {
      const data = await queryQuestion(searchName.trim());
      if (!Array.isArray(data)) throw new Error();

      if (data.length > 0) setQuestions(data);
      else setQuestions([]);
    } catch (error) {
      showModal("문의사항 검색에 실패했습니다.");
      fetchQuestions();
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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
          placeholder="작성자 ID 검색"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          onKeyDown={handleKeyPress}
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
          {questions.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                표시할 문의사항이 없습니다.
              </td>
            </tr>
          ) : (
            questions
              .slice(
                (currentPage - 1) * questionsPerPage,
                currentPage * questionsPerPage
              )

              .map((question) => (
                <tr
                  key={question.id}
                  onClick={() => handleClick(question.id)}
                >
                  <td>{String(question.id).padStart(8, "0")}</td>
                  <td>{question.title}</td>
                  <td>{question.userId}</td>
                  <td>{question.isAnswered ? "답변 완료" : "미완료"}</td>
                </tr>
              ))
          )}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(questions.length / questionsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Questions;
