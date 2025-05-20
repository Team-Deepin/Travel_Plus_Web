// User.js

import React, { useEffect, useState } from "react";
import "../../styles/Web.css";
import { deactiveUser, deleteUser, getUsers, queryUser } from "../../lib/users";

// 가입일 포맷 함수
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 1월은 0이니까 +1
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

const User = ({showModal}) => {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // 회원 목록 불러오기
  const fetchUsers = async () => {
    try {
      const {data} = await getUsers();
      if (!Array.isArray(data)) throw new Error();

      if (data.length > 0) setUsers(data);
      else setUsers([]);
    } catch (error) {
      showModal("회원 목록 조회에 실패했습니다.");
    }
  };

  // 이름 검색
  const handleSearch = async () => {
    if (!searchName.trim()) {
      fetchUsers();
      return;
    }

    try {
      const {data} = await queryUser(searchName.trim());
      if (!Array.isArray(data)) throw new Error();

      if (data.length > 0) setUsers(data);
      else setUsers([]);
    } catch (error) {
      showModal("회원 검색에 실패했습니다.");
      fetchUsers();
    }
  };

  const handleDeactivate = async (userId) => {
    try {
      await deactiveUser(userId);
      fetchUsers();
    } catch (error) {
      showModal("회원 정지에 실패했습니다.");
    }
  };

  // 회원 탈퇴 처리
  const handleDelete = async (userId) => {
    const confirmed = window.confirm("정말 이 회원을 탈퇴시키겠습니까?");
    if (!confirmed) return;

    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (error) {
      showModal("회원 탈퇴에 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          placeholder="이름 검색"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSearch}>🔍</button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>가입일</th>
            <th>아이디</th>
            <th>정지</th>
            <th>탈퇴</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                표시할 회원이 없습니다.
              </td>
            </tr>
          ) : (
            users
              .slice(
                (currentPage - 1) * usersPerPage,
                currentPage * usersPerPage
              )
              .map((user) => (
                <tr key={user.userId}>
                  <td>{user.userName}</td>
                  <td>{formatDate(user.createdDate)}</td>
                  <td>{user.userId}</td>
                  <td>
                    <button
                      className="X"
                      title={user.isSuspended ? "정지 해제" : "정지"}
                      onClick={() => handleDeactivate(user.userId)}
                    >
                      {user.isSuspended ? "🔓" : "🚫"}
                    </button>
                  </td>
                  <td>
                    <button
                      className="X"
                      title="탈퇴"
                      onClick={() => handleDelete(user.userId)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(users.length / usersPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default User;
