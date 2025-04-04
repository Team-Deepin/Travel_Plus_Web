// DashboardPage.js

import React from "react";
import "../../styles/Web.css";

const DashboardPage = () => {
  return (
    <div className="dashboard-content">
      <div className="card-row">
        <div className="card card-1">
          <p className="card-text">이번 주 활성 사용자 수</p>
        </div>
      </div>

      <div className="card-row">
        <div className="card card-2">
          <p className="card-text">누적 이용자 수</p>
        </div>

        <div className="card card-3">
          <p className="card-text">이번 주 신규 가입자</p>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
