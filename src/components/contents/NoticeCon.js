// NoticeCon.js

import React, { useEffect, useState } from "react";
import "../../styles/Web.css";
import { getNotices } from "../../lib/notices";
// import axios from "axios";

const NoticeCon = ({ noticeId, setActiveKey }) => {
  const [notice, setNotice] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        // const res = await axios.get(`/admin/notices/${noticeId}`);
        // setNotice(res.data);
        const data = await getNotices();
        if (data) {
          const noticeList = Object.values(data);

          const foundNotice = noticeList.find((n) => n.noticeId === noticeId);

          if (foundNotice) {
            setNotice(foundNotice);
            setTitle(foundNotice.title);
            setContent(foundNotice.contents);
          } else {
            const today = new Date().toISOString().slice(0, 10);
            setNotice({
              noticeId: noticeId,
              title: "",
              contents: "",
              date: today,
              isPosted: false,
            });
            setTitle("");
            setContent("");
          }
        } else {
          alert("해당 공지사항을 찾을 수 없습니다.");
        }
      } catch (error) {
        alert("공지사항 불러오는 데 오류가 발생했습니다.");
      }
    };

    if (noticeId) fetchNotice();
  }, [noticeId]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleSubmit = async () => {
    try {
      // await axios.post(`/admin/notices`, { noticeId, title, contents: content });
      
      alert("공지사항이 등록되었습니다.");
      setActiveKey("notices");
    } catch (error) {
      alert("공지사항 등록록에 실패했습니다.");
    }
  };

  if (!notice) return <div>불러오는 중...</div>;

  return (
    <div className="container">
      <h2>공지사항 등록</h2>
      <p>
        <strong>공지 ID:</strong> {String(notice.noticeId).padStart(8, "0")}
      </p>
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
