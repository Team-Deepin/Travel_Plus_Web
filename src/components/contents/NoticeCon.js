// NoticeCon.js

import React, { useEffect, useState, useRef } from "react";
import "../../styles/Web.css";
import { getNotices } from "../../lib/notices";
// import axios from "axios"; // 실제 API 요청 시 사용

const NoticeCon = ({ noticeId, setActiveKey }) => {
  const [notice, setNotice] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);

  // 공지사항 정보 불러오기
  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const data = await getNotices();
        if (data) {
          const noticeList = Object.values(data);
          const found = noticeList.find((n) => n.noticeId === noticeId);
          if (found) {
            setNotice(found);
            setTitle(found.title);
            setContent(found.contents || ""); // contents가 없을 경우 빈 문자열
          } else {
            alert("해당 공지사항을 찾을 수 없습니다.");
          }
        } else {
          alert("공지사항을 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        alert("공지사항 불러오기 중 오류가 발생했습니다.");
      }
    };

    if (noticeId) fetchNotice();
  }, [noticeId]);

  // 내용 입력 시 height 자동 조절
  const handleInput = (e) => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setContent(e.target.value);
  };

  // 저장 버튼 클릭 시 호출
  const handleSubmit = async () => {
    try {
      // 실제 서버 요청 예시:
      // await axios.put(`/admin/notices/${noticeId}`, { title, contents: content });

      alert("공지사항이 수정되었습니다.");
      setActiveKey("notices");
    } catch (error) {
      alert("공지사항 수정에 실패했습니다.");
    }
  };

  if (!notice) return <div>불러오는 중...</div>;

  return (
    <div className="container">
      <h2>공지사항 수정</h2>
      <p><strong>공지 ID:</strong> {String(notice.noticeId).padStart(4, "0")}</p>

      <label className="notice-edit-label">
        제목:
        <input
          className="notice-edit-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label className="notice-edit-label">
        내용:
        <textarea
          className="notice-edit-textarea"
          ref={textareaRef}
          value={content}
          onChange={handleInput}
          rows={1}
        />
      </label>

      <button className="notice-edit-button" onClick={handleSubmit}>
        수정 완료
      </button>
    </div>
  );
};

export default NoticeCon;
