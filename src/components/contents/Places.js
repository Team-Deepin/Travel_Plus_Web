// Places.js

import React, { useEffect, useState } from "react";
import "../../styles/Web.css";
import axios from "axios";
import { getPlaces } from "../../lib/places";

const Places = () => {
  const [places, setPlaces] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const placesPerPage = 10;

  // 여행지 목록 불러오기
  const fetchPlaces = async () => {
    try {
      // const res = await axios.get("/admin/places");
      // setPlaces(res.data);
      const data = await getPlaces();
      if (data) {
        const placeList = Object.values(data);
        setPlaces(placeList);
      } else {
        alert("여행지 목록을 불러오는 데 실패했습니다.");
      }
    } catch (error) {
      alert("여행지 목록을 불러오는 데 실패했습니다.");
    }
  };

  // 여행지 검색
  const handleSearch = async () => {
    if (!searchName.trim()) {
      fetchPlaces();
      return;
    }

    try {
      // const res = await axios.get(`/admin/places/search?name=${searchName}`);
      // if (!res.data || (Array.isArray(res.data) && res.data.length === 0)) {
      //   alert("해당하는 여행지가 없습니다.");
      //   setPlaces([]);
      // } else {
      //   setPlaces([res.data]);
      // }
      const data = await getPlaces();
      if (data) {
        const placeList = Object.values(data);
        const filteredPlaces = placeList.filter((place) =>
          place.placeName.includes(searchName)
        );

        if (filteredPlaces.length === 0) {
          alert("해당하는 여행지가 없습니다.");
          setPlaces([]);
        } else {
          setPlaces(filteredPlaces);
        }
      } else {
        alert("검색에 실패했습니다.");
      }
    } catch (error) {
      alert("검색에 실패했습니다.");
    }
  };

  // 여행지 삭제
  const handleDelete = async (placeId) => {
    const confirmed = window.confirm("정말 이 여행지를 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      // await axios.delete(`/admin/places/${placeId}`);
      alert("해당 여행지를 삭제했습니다.");
      fetchPlaces();
    } catch (error) {
      alert("삭제 처리에 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchPlaces();
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
          placeholder="장소 검색"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSearch}>🔍</button>
      </div>

      <table className="place-table">
        <thead>
          <tr>
            <th>여행지 번호</th>
            <th>장소 명</th>
            <th>주소</th>
            <th>여행지 타입</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {places.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                표시할 회원이 없습니다.
              </td>
            </tr>
          ) : (
            places
              .slice(
                (currentPage - 1) * placesPerPage,
                currentPage * placesPerPage
              )

              .map((place) => (
                <tr key={place.placeId}>
                  <td>{String(place.placeId).padStart(8, "0")}</td>
                  <td>{place.placeName}</td>
                  <td>{place.placeLocation}</td>
                  <td>{place.placeType}</td>
                  <td>
                    <button
                      className="X"
                      title="삭제"
                      onClick={() => handleDelete(place.placeId)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
      <div
        style={{ marginTop: "auto", textAlign: "center", paddingTop: "20px" }}
      >
        {Array.from(
          { length: Math.ceil(places.length / placesPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              style={{
                margin: "0 5px",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid var(--color-Point2)",
                backgroundColor:
                  currentPage === index + 1
                    ? "var(--color-Point1)"
                    : "var(--color-Background)",
                color:
                  currentPage === index + 1
                    ? "var(--color-Background)"
                    : "var(--color-Point2)",
                cursor: "pointer",
              }}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Places;
