// Dashboard.js

import React, { useEffect, useState } from "react";
import "../../styles/Web.css";
import axios from 'axios';
import { getDashboard } from "../../lib/dashboard";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["var(--color-Point1)", "var(--color-Point2)"];

const Dashboard = ({showModal}) => {
  const [totalUsers, setTotalusers] = useState(0);
  const [newUsersLast7Days, setNewUsersLast7Days] = useState(0);
  const [roleDistribution, setRoleDistribution] = useState(0);
  const [popularPlaces, setPopularPlaces] = useState([]);
  const [inquiryStats, setInquiryStats] = useState({
    totalInquiries: 0,
    unansweredInquiries: 0,
    answeredInquiries: 0,
  });
  const [surveyRates, setSurveyRates] = useState([]);
  const [filteringRates, setFilteringRates] = useState([]);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
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
      setSurveyRates(dashboard.modelRates.survey);
      setFilteringRates(dashboard.modelRates.filtering);
      } catch {
        showModal('네트워크 에러', '대시보드 데이터를 받아오는 데에 실패했습니다.');
      }
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
          {/* 누적 이용자 */}
          <div className="card card-1">
            <p className="card-text">누적 이용자</p>
            <p className="value-text">{totalUsers}</p>
          </div>
          {/* 현재 접속자 */}
          <div className="card card-1">
            <p className="card-text">현재 접속자</p>
            <p className="value-text">{roleDistribution}</p>
          </div>
        </div>

        <div className="column-wrap">
          {/* 신규 가입자 */}
          <div className="card card-1">
            <p className="card-text">7일 이내 신규 가입자</p>
            <p className="value-text">{newUsersLast7Days}</p>
          </div>
          {/* 인기 여행지 */}
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

        {/* 문의 통계 */}
        <div className="card card-2">
          <p className="card-text">문의 통계</p>
          <div className="inquiry-chart-container">
            <p className="inquiry-title">전체 문의</p>
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
                <span
                  className="dot"
                  style={{ backgroundColor: COLORS[0] }}
                ></span>
                답변 완료 {inquiryStats.answeredInquiries}개
              </div>
              <div>
                <span
                  className="dot"
                  style={{ backgroundColor: COLORS[1] }}
                ></span>
                답변 미완료 {inquiryStats.unansweredInquiries}개
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* AI 만족도 */}
      <div className="card-row">
        <div className="card card-3">
          <p className="card-text">CatBoost</p>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={surveyRates}>
              <XAxis dataKey="name" />
              <YAxis domain={[1, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
              <Tooltip
                cursor={{
                  fill: "var(--color-Background2)"
                }}
                contentStyle={{
                  backgroundColor: "var(--color-Background)",
                  border: "1px solid #ddd",
                  fontFamily: "var(--font-Main)",
                }}
              />
              <Bar
                dataKey="rate"
                fill="var(--color-Point1)"
                radius={[10, 10, 0, 0]}
                barSize={70}
                activeBar={{ fill: "var(--color-Point2)" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card card-3">
          <p className="card-text">Factorization</p>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteringRates}>
              <XAxis dataKey="name" />
              <YAxis domain={[1, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
              <Tooltip
                cursor={{
                  fill: "var(--color-Background2)"
                }}
                contentStyle={{
                  backgroundColor: "var(--color-Background)",
                  border: "1px solid #ddd",
                  fontFamily: "var(--font-Main)",
                }}
              />
              <Bar
                dataKey="rate"
                fill="var(--color-Point2)"
                radius={[10, 10, 0, 0]}
                barSize={70}
                activeBar={{ fill: "var(--color-Point1)" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
