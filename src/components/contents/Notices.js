// Notices.js

import React, { useEffect, useState } from "react";
import "../../styles/Web.css";
import { deleteNotice, getNotices, queryNotice } from "../../lib/notices";

const Notices = ({ setActiveKey, setNoticeId, showModal }) => {
  const [notices, setNotices] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 10;

  // 공지사항 목록 불러오기
  const fetchNotices = async () => {
    try {
      const data = await getNotices();
      if (Array.isArray(data) && data.length > 0) setNotices(data);
      else setNotices([]);
    } catch (error) {
      showModal("공지사항 목록 조회에 실패했습니다.");
    }
  };

  // 문의사항 검색
  const handleSearch = async () => {
    if (!searchName.trim()) {
      fetchNotices();
      return;
    }

    try {
      const data = await queryNotice(searchName.trim());
      if (Array.isArray(data) && data.length > 0) setNotices(data);
      else setNotices([]);
    } catch (error) {
      showModal("공지사항 검색에 실패했습니다.");
    }
  };

  const handleDelete = async (noticeId) => {
    const confirmed = window.confirm("정말 이 공지사항을 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await deleteNotice(noticeId);
      fetchNotices();
    } catch (error) {
      showModal("공지사항 삭제에 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 공지 클릭 시 수정창으로 이동
  const handleClick = (id) => {
    setNoticeId(id);
    setActiveKey("noticeCon");
  };

  return (
    <div className="container">
      <div className="search">
        <button
          onClick={() => {
            setNoticeId(null);
            setActiveKey("noticeCon");
          }}
          style={{ marginRight: "12px" }}
        >
          ➕ 공지사항 추가
        </button>
        <input
          type="text"
          placeholder="공지사항 제목 검색"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSearch}>🔍</button>
      </div>
      <table className="Noti-table">
        <thead>
          <tr>
            <th>공지사항 번호</th>
            <th>제목</th>
            <th>작성일</th>
            <th>공지 타입</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {notices.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                표시할 공지사항이 없습니다.
              </td>
            </tr>
          ) : (
            notices
              .slice(
                (currentPage - 1) * noticesPerPage,
                currentPage * noticesPerPage
              )
              .map((notice) => (
                <tr
                  key={notice.id}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "var(--color-Background2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "")
                  }
                  onClick={() => handleClick(notice.id)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{String(notice.id).padStart(8, "0")}</td>
                  <td>{notice.title}</td>
                  <td>{notice.createdDate}</td>
                  <td>{notice.noticeType}</td>
                  <td>
                    <button
                      className="X"
                      title="삭제"
                      onClick={() => handleDelete(notice.id)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from(
          { length: Math.ceil(notices.length / noticesPerPage) },
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

export default Notices;
