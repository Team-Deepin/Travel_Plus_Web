// DashboardPage.js

import React, { useEffect, useState } from "react";
import "../../styles/Web.css";
import { getTodos } from "../../lib/dashboard";

const DashboardPage = () => {
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      const result = await getTodos(1);
      console.log("getTodos:", result);
      setTodo(result);
    }
    fetchTodo();
  }, []);

  return (
    <div className="dashboard-content">
      <div className="card-row">
        <div className="column-wrap">
          <div className="card card-1">
                <p className="card-text">전체 사용자</p>
          </div>
          <div className="card card-1">
            <p className="card-text">현재 접속자</p>
          </div>
        </div>

        <div className="column-wrap">
          <div className="card card-1">
            <p className="card-text">7일 이내 신규 가입자</p>
          </div>
          <div className="card card-1">
            <p className="card-text">3일 이내 탈퇴 회원</p>
          </div>
        </div>

        <div className="card card-2">
          <p className="card-text">문의 통계</p>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
