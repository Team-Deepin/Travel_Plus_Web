// User.js

import React, { useEffect, useState } from "react";
import "../../styles/Web.css";
import axios from "axios";
import { getUsers } from "../../lib/users";

// 가입일 포맷 함수
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 1월은 0이니까 +1
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

const User = () => {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // 회원 목록 불러오기
  const fetchUsers = async () => {
    try {
      // const res = await axios.get("/admin/users");
      // setUsers(res.data);
      const data = await getUsers();
      if (data) {
        const userList = Object.values(data);
        setUsers(userList);
      } else {
        alert("회원 목록을 불러오는 데 실패했습니다.");
      }
    } catch (error) {
      alert("회원 목록을 불러오는 데 실패했습니다.");
    }
  };

  // 이름 검색
  const handleSearch = async () => {
    if (!searchName.trim()) {
      fetchUsers();
      return;
    }

    try {
      // const res = await axios.get(`/admin/inquire/${searchName}`);
      // if (!res.data || (Array.isArray(res.data) && res.data.length === 0)) {
      //   alert("해당하는 회원이 없습니다.");
      //   setUsers([]);
      // } else {
      //   setUsers([res.data]);
      // }
      const data = await getUsers();
      if (data) {
        const userList = Object.values(data);
        const filteredUsers = userList.filter((user) =>
          user.userName.includes(searchName)
        );

        if (filteredUsers.length === 0) {
          alert("해당하는 회원이 없습니다.");
          setUsers([]);
        } else {
          setUsers(filteredUsers);
        }
      } else {
        alert("검색에 실패했습니다.");
      }
    } catch (error) {
      alert("검색에 실패했습니다.");
    }
  };

  // 정지/정지해제 처리
  // const handleDeactivate = async (userId) => {
  //   try {
  //     const res = await axios.post(`/admin/users/deactive/${userId}`);

  //     if (res.data.isSuspended) {
  //       alert("해당 유저를 정지시켰습니다.");
  //     } else {
  //       alert("해당 유저의 정지가 해제되었습니다.");
  //     }

  //     fetchUsers();
  //   } catch (error) {
  //     alert("정지 처리에 실패했습니다.");
  //     console.error(error);
  //   }
  // };

  const handleDeactivate = (userId) => {
    const updatedUsers = users.map((user) => {
      if (user.userId === userId) {
        if (user.isSuspended) {
          alert("정지 해제되었습니다.");
        } else {
          alert("정지시켰습니다.");
        }
        const updatedUser = { ...user, isSuspended: !user.isSuspended };
        return updatedUser;
      }
      return user;
    });

    setUsers(updatedUsers);
  };

  // 회원 탈퇴 처리
  const handleDelete = async (userId) => {
    const confirmed = window.confirm("정말 이 회원을 탈퇴시키겠습니까?");
    if (!confirmed) return;

    try {
      // await axios.delete(`/admin/users/delete/${userId}`);
      alert("해당 유저를 탈퇴했습니다.");
      fetchUsers();
    } catch (error) {
      alert("탈퇴 처리에 실패했습니다.");
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
                  <td>{formatDate(user.createDate)}</td>
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
