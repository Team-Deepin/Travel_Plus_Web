// Notices.js

import React, { useEffect, useState } from "react";
import "../../styles/Web.css";
import axios from "axios";
import { getNotices } from "../../lib/notices";

const Notices = ({ setActiveKey, setNoticeId }) => {
  const [notices, setNotices] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 10;

  // 공지사항 목록 불러오기
  const fetchNotices = async () => {
    try {
      // const res = await axios.get('/admin/notices');
      // setNotices(res.data);
      const data = await getNotices();
      if (data) {
        const noticeList = Object.values(data);
        setNotices(noticeList);
      } else {
        alert("공지지사항 목록을 불러오는 데 실패했습니다.");
      }
    } catch (error) {
      alert("공지사항 목록을 불러오는 데 실패했습니다.");
    }
  };

  // 문의사항 검색
  const handleSearch = async () => {
    if (!searchName.trim()) {
      fetchNotices();
      return;
    }

    try {
      // const res = await axios.get(`/admin/notices/search?name=${searchName}`);
      // if (!res.data || (Array.isArray(res.data) && res.data.length === 0)) {
      //   alert("해당하는 공지사항이 없습니다.");
      //   setNotices([]);
      // } else {
      //   setNotices([res.data]);
      // }
      const data = await getNotices();
      if (data) {
        const noticeList = Object.values(data);
        const filteredNotices = noticeList.filter((notice) =>
          notice.authorId.includes(searchName)
        );

        if (filteredNotices.length === 0) {
          alert("해당하는 공지사항이 없습니다.");
          setNotices([]);
        } else {
          setNotices(filteredNotices);
        }
      } else {
        alert("검색에 실패했습니다.");
      }
    } catch (error) {}
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
            <th>게시 여부</th>
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
                  key={notice.noticeId}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "var(--color-Background2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "")
                  }
                  onClick={() => handleClick(notice.noticeId)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{String(notice.noticeId).padStart(4, "0")}</td>
                  <td>{notice.title}</td>
                  <td>{notice.date}</td>
                  <td>{notice.isPosted ? "게시됨" : "미게시"}</td>
                </tr>
              ))
          )}
        </tbody>
      </table>

      <div
        style={{ marginTop: "auto", textAlign: "center", paddingTop: "20px" }}
      >
        {Array.from(
          { length: Math.ceil(notices.length / noticesPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              style={{
                margin: "0 5px",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid var(--color-Point2)",
                backgroundColor:
                  currentPage === index + 1
                    ? "var(--color-Point1)"
                    : "var(--color-Background)",
                color:
                  currentPage === index + 1
                    ? "var(--color-Background)"
                    : "var(--color-Point2)",
                cursor: "pointer",
              }}
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
