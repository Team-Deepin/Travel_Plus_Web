// Content.js

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./contents/Dashboard";
import Users from "./contents/Users";
import Places from "./contents/Places";
import AI from "./contents/AI";
import Questions from "./contents/Questions";
import Answer from "./contents/Answer";
import Notices from "./contents/Notices";
import NoticeCon from "./contents/NoticeCon";
import "../styles/Web.css";
import Modal from "./Modal";

const Content = () => {
  const [activeKey, setActiveKey] = useState("dashboard");
  const [reloadToken, setReloadToken] = useState(Date.now());
  const [questionId, setQuestionId] = useState(null);
  const [noticeId, setNoticeId] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    content: "",
    onClose: () => {},
  })

  const showModal = (content) => {
    setModalState({
      isOpen: true,
      content: content,
      onClose: () => {
        setModalState((prev) => ({...prev, isOpen: false}))
      },
    })
  }

  const handleSelect = (key) => {
    setActiveKey(key);
    setReloadToken(Date.now());
  };

  const renderContent = () => {
    switch (activeKey) {
      case "dashboard":
        return <Dashboard key={reloadToken} showModal={showModal} />;
      case "users":
        return <Users key={reloadToken} showModal={showModal} />;
      case "places":
        return <Places key={reloadToken} showModal={showModal} />;
      case "AI":
        return <AI key={reloadToken} showModal={showModal} />;
      case "questions":
        return (
          <Questions
            key={reloadToken}
            setActiveKey={setActiveKey}
            setQuestionId={setQuestionId}
            showModal={showModal}
          />
        );
      case "answer":
        return (
          <Answer
            key={reloadToken}
            questionId={questionId}
            setActiveKey={setActiveKey}
            showModal={showModal}
          />
        );
      case "notices":
        return (
          <Notices
            key={reloadToken}
            setActiveKey={setActiveKey}
            setNoticeId={setNoticeId}
            showModal={showModal}
          />
        );
      case "noticeCon":
        return (
          <NoticeCon
            key={reloadToken}
            noticeId={noticeId}
            setActiveKey={setActiveKey}
            showModal={showModal}
          />
        );
      default:
        return <Dashboard key={reloadToken} showModal={showModal} />;
    }
  };

  return (
    <div className="content-wrapper">
      {modalState.isOpen && <Modal content={modalState.content} onClose={modalState.onClose} />}
      <Sidebar activeKey={activeKey} onSelect={handleSelect} />
      <main className="main-content">{renderContent()}</main>
    </div>
  );
};

export default Content;
