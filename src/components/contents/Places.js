// Places.js

import React, { useEffect, useState } from "react";
import "../../styles/Web.css";
import { deletePlace, getPlaces } from "../../lib/places";

const Places = ({showModal}) => {
  const [places, setPlaces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const placesPerPage = 10;

  // 여행지 목록 불러오기
  const fetchPlaces = async () => {
    try {
      const {data} = await getPlaces();
      if (!Array.isArray(data)) throw new Error();
      
      if (data.length > 0) setPlaces(data);
      else setPlaces([]);
    } catch (error) {
      showModal("여행지 목록 조회에 실패했습니다.");
    }
  };

  // 여행지 삭제
  const handleDelete = async (placeId) => {
    const confirmed = window.confirm("정말 이 여행지를 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await deletePlace(placeId);
      fetchPlaces();
    } catch (error) {
      showModal("여행지 삭제에 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <div className="container">

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
                <tr key={place.courseDetailId}>
                  <td>{String(place.courseDetailId).padStart(8, "0")}</td>
                  <td>{place.placeName}</td>
                  <td>{place.placeAddress}</td>
                  <td>{place.placeType}</td>
                  <td>
                    <button
                      className="X"
                      title="삭제"
                      onClick={() => handleDelete(place.courseDetailId)}
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
          { length: Math.ceil(places.length / placesPerPage) },
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

export default Places;
