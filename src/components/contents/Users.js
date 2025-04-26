// User.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Web.css";

const User = () => {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState("");

  // 회원 목록 불러오기
  const fetchUsers = async () => {
    try {
      const res = await axios.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.error("회원 목록 불러오기 실패:", error);
    }
  };

  // 이름 검색
  const handleSearch = async () => {
    if (!searchName.trim()) {
      fetchUsers();
      return;
    }

    try {
      const res = await axios.get(`/admin/inquire/${searchName}`);
      setUsers([res.data]);
    } catch (error) {
      console.error("검색 실패:", error);
    }
  };

  // 정지 처리
  const handleDeactivate = async (userId) => {
    try {
      await axios.post(`/admin/users/deactive/${userId}`);
      alert("해당 유저를 정지시켰습니다.");
      fetchUsers();
    } catch (error) {
      console.error("정지 실패:", error);
    }
  };

  // 탈퇴 처리
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/admin/users/delete/${userId}`);
      alert("해당 유저를 탈퇴시켰습니다.");
      fetchUsers();
    } catch (error) {
      console.error("탈퇴 실패:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          placeholder="이름 검색"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={handleSearch}>🔍</button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>회원 번호</th>
            <th>이름</th>
            <th>가입일</th>
            <th>아이디</th>
            <th>정지</th>
            <th>탈퇴</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.name}</td>
              <td>{user.joinDate}</td>
              <td>{user.username}</td>
              <td>
                <button onClick={() => handleDeactivate(user.userId)}>
                  ⛔
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(user.userId)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
