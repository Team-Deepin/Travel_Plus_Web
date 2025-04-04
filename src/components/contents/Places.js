// Places.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Web.css";

const Places = () => {
  const [places, setPlaces] = useState([]);
  const [searchName, setSearchName] = useState("");

  // 여행지 목록 불러오기
  const fetchPlaces = async () => {
    try {
      const res = await axios.get("/admin/places");
      setPlaces(res.data);
    } catch (error) {
      console.error("여행지 목록 불러오기 실패:", error);
    }
  };

  // 여행지 삭제
  const handleDelete = async (placeId) => {
    const confirmed = window.confirm("정말 이 여행지를 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await axios.delete(`/admin/places/${placeId}`);
      alert("삭제되었습니다.");
      fetchPlaces();
    } catch (error) {
      console.error("여행지 삭제 실패:", error);
    }
  };

  // 검색
  const handleSearch = async () => {
    if (!searchName.trim()) {
      fetchPlaces();
      return;
    }

    try {
      const res = await axios.get(`/admin/places/search?name=${searchName}`);
      setPlaces(res.data);
    } catch (error) {
      console.error("검색 실패:", error);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          placeholder="장소 검색"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={handleSearch}>🔍</button>
      </div>

      <table className="place-table">
        <thead>
          <tr>
            <th>여행지 번호</th>
            <th>장소 명</th>
            <th>주소</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {places.map((place) => (
            <tr key={place.placeId}>
              <td>{String(place.placeId).padStart(8, "0")}</td>
              <td>{place.name}</td>
              <td>{place.address}</td>
              <td>
                <button onClick={() => handleDelete(place.placeId)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Places;
