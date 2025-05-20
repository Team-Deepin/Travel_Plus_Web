// NoticeCon.js

import React, { useEffect, useState } from "react";
import "../../styles/Web.css";
import { getNotice, postNotice } from "../../lib/notices";

const NoticeCon = ({ noticeId, setActiveKey, showModal }) => {
  const [notice, setNotice] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchNotice = async () => {
      if (noticeId==null) {
        const today = new Date().toISOString().slice(0, 10);
        setNotice({
          noticeId: noticeId,
          title: "",
          contents: "",
          date: today,
          noticeType: "공지",
        });
        setTitle("");
        setContent("");
        return;
      }
      try {
        const data = await getNotice(noticeId);
        setNotice(data);
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        showModal("공지사항 조회에 실패했습니다.");
      }
    };

    fetchNotice();
  }, [noticeId]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleSubmit = async () => {
    try {
      await postNotice(title, content, "공지");
      setActiveKey("notices");
    } catch (error) {
      showModal("공지사항 등록에 실패했습니다.");
    }
  };

  if (!notice) return <div>불러오는 중...</div>;

  return (
    <div className="container">
      <h2>공지사항 등록</h2>
      {noticeId && <p>
        <strong>공지 ID:</strong> {String(notice.noticeId).padStart(8, "0")}
      </p>}
      <p>
        <strong>제목:</strong>
      </p>
      <textarea
        className="notiCon-text-box"
        placeholder="공지 제목을 입력하세요"
        value={title}
        onChange={handleTitleChange}
      />
      <p>
        <strong>내용:</strong>
      </p>
      <textarea
        className="notiCon-text-box"
        placeholder="공지 내용을 입력하세요"
        value={content}
        onChange={handleContentChange}
      />
      <br />
      <button className="login-button" onClick={handleSubmit}>
        등록 완료
      </button>
    </div>
  );
};

export default NoticeCon;
