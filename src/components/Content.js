// Content.js

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./contents/Dashboard";
import Users from "./contents/Users";
import Places from "./contents/Places";
import AI from "./contents/AI";
import Questions from "./contents/Questions";
import Answer from "./contents/Answer";
import "../styles/Web.css";

const Content = () => {
  const [activeKey, setActiveKey] = useState("dashboard");
  const [questionId, setQuestionId] = useState(null);

  const handleSelect = (key) => {
    setActiveKey(key);
  };

  const renderContent = () => {
    switch (activeKey) {
      case "dashboard":
        return <Dashboard />;
      case "users":
        return <Users />;
      case "places":
        return <Places />;
      case "AI":
        return <AI />;
      case "questions":
        return (
          <Questions
            setActiveKey={setActiveKey}
            setQuestionId={setQuestionId}
          />
        );
      case "answer":
        return <Answer questionId={questionId} />;
      default:
        return <Dashboard />;
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
