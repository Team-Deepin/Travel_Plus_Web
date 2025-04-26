// Dashboard.js

import React, { useEffect, useState } from "react";
import "../../styles/Web.css";
import { getDashboard } from "../../lib/dashboard";

import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0D2241", "#76A8E2"];

const Dashboard = () => {
  const [totalUsers, setTotalusers] = useState(0);
  const [newUsersLast7Days, setNewUsersLast7Days] = useState(0);
  const [roleDistribution, setRoleDistribution] = useState(0);
  const [popularPlaces, setPopularPlaces] = useState([]);
  const [inquiryStats, setInquiryStats] = useState({
    totalInquiries: 0,
    unansweredInquiries: 0,
    answeredInquiries: 0,
  });

  useEffect(() => {
    const fetchTodo = async () => {
      const dashboard = await getDashboard();
      console.log("getDashboard:", dashboard);
      setTotalusers(dashboard.userStats.totalUsers);
      setNewUsersLast7Days(dashboard.userStats.newUsersLast7Days);
      setRoleDistribution(dashboard.userStats.roleDistribution);
      setPopularPlaces(dashboard.popularPlaces);
      setInquiryStats({
        totalInquiries: dashboard.inquiryStats.totalInquiries,
        unansweredInquiries: dashboard.inquiryStats.unansweredInquiries,
        answeredInquiries:
          dashboard.inquiryStats.totalInquiries -
          dashboard.inquiryStats.unansweredInquiries,
      });
    };
    fetchTodo();
  }, []);

  const inquiryData = [
    { name: "답변 완료", value: inquiryStats.answeredInquiries },
    { name: "답변 미완료", value: inquiryStats.unansweredInquiries },
  ];


  return (
    <div className="dashboard-content">
      <div className="card-row">
        <div className="column-wrap">
          <div className="card card-1">
            <p className="card-text">전체 사용자</p>
            <p className="value-text">{totalUsers}</p>
          </div>
          <div className="card card-1">
            <p className="card-text">현재 접속자</p>
            <p className="value-text">{roleDistribution}</p>
          </div>
        </div>

        <div className="column-wrap">
          <div className="card card-1">
            <p className="card-text">7일 이내 신규 가입자</p>
            <p className="value-text">{newUsersLast7Days}</p>
          </div>
          <div className="card card-1">
            <p className="card-text">인기 여행지</p>
            <table className="popular-dest-table">
              <thead>
                <tr>
                  <th>여행지</th>
                  <th>생성된 코스 수</th>
                </tr>
              </thead>
              <tbody>
                {popularPlaces.map((place, idx) => (
                  <tr key={idx}>
                    <td>{place.name}</td>
                    <td>{place.count}회</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card card-2">
          <p className="card-text">문의 통계</p>
          <div className="inquiry-chart-container">
            <p className="inquiry-total">{inquiryStats.totalInquiries}</p>
            <PieChart width={300} height={300}>
              <Pie
                data={inquiryData}
                cx="50%"
                cy="50%"
                innerRadius={100}
                outerRadius={150}
                dataKey="value"
              >
                {inquiryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
            <div className="inquiry-legend">
              <div>
                <span className="dot" style={{ backgroundColor: COLORS[1] }}></span>
                답변 미완료
              </div>
              <div>
                <span className="dot" style={{ backgroundColor: COLORS[0] }}></span>
                답변 완료
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-row">
        <div className="card card-3">
          <p className="card-text">CatBoost</p>
        </div>
        <div className="card card-3">
          <p className="card-text">Factorization</p>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
