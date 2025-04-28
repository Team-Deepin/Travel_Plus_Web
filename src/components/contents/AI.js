// AI.js

import React, { useState } from "react";
import "../../styles/Web.css";
import CatBoostTab from "./CatBoostTab.js";
import FactorizationTab from "./FactorizationTab.js";

const AI = () => {
  const [activeTab, setActiveTab] = useState("CatBoost");

  return (
    <div>
      <div className="ai-tabs">
        <button
          className={`ai-tab-button ${activeTab === "CatBoost" ? "active" : ""}`}
          onClick={() => setActiveTab("CatBoost")}
        >
          CatBoost
        </button>
        <button
          className={`ai-tab-button ${activeTab === "Factorization" ? "active" : ""}`}
          onClick={() => setActiveTab("Factorization")}
        >
          Factorization
        </button>
      </div>

      <div className="ai-table">
        {activeTab === "CatBoost" && <CatBoostTab />}
        {activeTab === "Factorization" && <FactorizationTab />}
      </div>
    </div>
  );
};

export default AI;
