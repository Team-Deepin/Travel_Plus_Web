// Sidebar.js

import React from "react";
import "../styles/Sidebar.css";

import logoIcon from "../assets/logo.png";
import dashboardIcon from "../assets/Sidebar/dashboard.png";
import userIcon from "../assets/Sidebar/user.png";
import mapIcon from "../assets/Sidebar/map.png";
import contactIcon from "../assets/Sidebar/contact.png";
import noticeIcon from "../assets/Sidebar/notice.png";

const menuItems = [
  { icon: dashboardIcon, label: "대시보드", key: "dashboard" },
  { icon: userIcon, label: "회원 관리", key: "users" },
  { icon: mapIcon, label: "여행지 관리", key: "places" },
  { icon: contactIcon, label: "문의사항", key: "questions" },
  { icon: noticeIcon, label: "공지사항", key: "notice" },
];

const Sidebar = ({ activeKey, onSelect }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logoIcon} alt="logo icon" className="sidebar-logo-img" />
        <div className="sidebar-logo-text">여행+</div>
      </div>

      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <div
            key={item.key}
            className={`sidebar-item ${activeKey === item.key ? "active" : ""}`}
            onClick={() => onSelect(item.key)}
          >
            <img src={item.icon} alt={item.label} className="sidebar-icon" />
            <span className="sidebar-text">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
