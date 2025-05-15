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

const Content = () => {
  const [activeKey, setActiveKey] = useState("dashboard");
  const [reloadToken, setReloadToken] = useState(Date.now());
  const [questionId, setQuestionId] = useState(null);
  const [noticeId, setNoticeId] = useState(null);

  const handleSelect = (key) => {
    setActiveKey(key);
    setReloadToken(Date.now());
  };

  const renderContent = () => {
    switch (activeKey) {
      case "dashboard":
        return <Dashboard key={reloadToken} />;
      case "users":
        return <Users key={reloadToken} />;
      case "places":
        return <Places key={reloadToken} />;
      case "AI":
        return <AI key={reloadToken} />;
      case "questions":
        return (
          <Questions
            key={reloadToken}
            setActiveKey={setActiveKey}
            setQuestionId={setQuestionId}
          />
        );
      case "answer":
        return (
          <Answer
            key={reloadToken}
            questionId={questionId}
            setActiveKey={setActiveKey}
          />
        );
      case "notices":
        return (
          <Notices
            key={reloadToken}
            setActiveKey={setActiveKey}
            setNoticeId={setNoticeId}
          />
        );
      case "noticeCon":
        return (
          <NoticeCon
            key={reloadToken}
            noticeId={noticeId}
            setActiveKey={setActiveKey}
          />
        );
      default:
        return <Dashboard key={reloadToken} />;
    }
  };

  return (
    <div className="content-wrapper">
      <Sidebar activeKey={activeKey} onSelect={handleSelect} />
      <main className="main-content">{renderContent()}</main>
    </div>
  );
};

export default Content;
