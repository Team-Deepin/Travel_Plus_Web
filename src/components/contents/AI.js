// AI.js

import React, { useState } from "react";
import "../../styles/Web.css";
import ModelList from "./ModelList.js";
import ModelTrain from "./ModelTrain.js";

const AI = ({showModal}) => {
  const [activeTab, setActiveTab] = useState("List");

  return (
    <div>
      <div className="ai-tabs">
        <button
          className={`ai-tab-button ${activeTab === "List" ? "active" : ""}`}
          onClick={() => setActiveTab("List")}
        >
          모델 목록
        </button>
        <button
          className={`ai-tab-button ${activeTab === "Train" ? "active" : ""}`}
          onClick={() => setActiveTab("Train")}
        >
          모델 훈련
        </button>
      </div>

      <div>
        {activeTab === "List" && <ModelList showModal={showModal} />}
        {activeTab === "Train" && <ModelTrain showModal={showModal} />}
      </div>
    </div>
  );
};

export default AI;
