// ModelList.js

import { useEffect, useState } from "react";
import "../../styles/Web.css";
import { applyModel, getModels } from "../../lib/ai";

const ModelList = ({showModal}) => {
  const [models, setModels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const modelsPerPage = 10;

  useEffect(() => {
    const fetchModelList = async () => {
      try {
        const {data} = await getModels();
        if (!Array.isArray(data)) throw new Error();
        
        if (data.length > 0) setModels(data);
        else setModels([]);
      } catch (error) {
        showModal("인공지능 모델 목록 조회에 실패했습니다.");
      }
    };
    fetchModelList();
  }, []);

  const handleApply = async (modelId, modelType) => {
    const confirmed = window.confirm("정말 이 모델을 적용하시겠습니까?");
    if (!confirmed) return;

    const result = await applyModel(modelId, modelType);
    if (!result) showModal("모델 적용에 실패했습니다.");
  };

  return (
    <div className="ai-list-table">
      <table>
        <thead>
          <tr>
            <th>모델명</th>
            <th>타입</th>
            <th>상세</th>
            <th>nEstimators</th>
            <th>maxDepth</th>
            <th>learningRate</th>
            <th>rate</th>
            <th>createDate</th>
            <th>적용</th>
          </tr>
        </thead>
        <tbody>
          {models.length === 0 ? (
            <tr className="no-hover">
              <td colSpan="9" style={{ textAlign: "center" }}>
                표시할 인공지능 모델이 없습니다.
              </td>
            </tr>
          ) : (
            models
              .slice(
                (currentPage - 1) * modelsPerPage,
                currentPage * modelsPerPage
              )
              .map((model) => (
                <tr
                  key={model.id}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "var(--color-Background2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "")
                  }
                >
                  <td>{String(model.id).padStart(8, "0")}</td>
                  <td>{model.title}</td>
                  <td>{model.createdDate}</td>
                  <td>{model.noticeType}</td>
                  <td>
                    <button
                      className="X"
                      title="적용"
                      onClick={() => handleApply(model.id)}
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
          { length: Math.ceil(models.length / modelsPerPage) },
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
  )
};

export default ModelList;
  