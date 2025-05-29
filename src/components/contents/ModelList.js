// ModelList.js

import { useEffect, useState } from "react";
import "../../styles/Web.css";
import { applyModel, getModels } from "../../lib/ai";

const ModelList = ({showModal}) => {
  const [models, setModels] = useState([]);
  const [activatedMenu, setActivatedMenu] = useState('content');
  const [contentModels, setContentModels] = useState([]);
  const [coopModels, setCoopModels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const modelsPerPage = 10;

  const fetchModelList = async () => {
    try {
      const {data} = await getModels();
      const contentList = data.content;
      const coopList = data.cooperation;
      if (!Array.isArray(contentList) || !Array.isArray(coopList)) throw new Error();
      
      if (contentList.length > 0) setContentModels(contentList);
      else setContentModels([]);
      if (coopList.length > 0) setCoopModels(coopList);
      else setCoopModels([]);
    } catch (error) {
      showModal("인공지능 모델 목록 조회에 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchModelList();
  }, []);

  const handleActivateContent = () => {
    setActivatedMenu('content');
  }

  const handleActivateCoop = () => {
    setActivatedMenu('coop');
  }

  useEffect(() => {
    if (activatedMenu === 'content') setModels(contentModels);
    else setModels(coopModels);
  }, [activatedMenu, contentModels, coopModels]);

  const handleApply = async (modelId, modelType) => {
    const confirmed = window.confirm("정말 이 모델을 적용하시겠습니까?");
    if (!confirmed) return;

    const result = await applyModel(modelId, modelType);
    if (!result) showModal("모델 적용에 실패했습니다.");
    else fetchModelList();
  };

  return (
    <div className="ai-list-table">
      <div
        className="model-list-actions"
        style={{ marginBottom: "12px", display: "flex", gap: "10px" }}
      >
        <button style={{ margin: "12px" }} className="login-button" onClick={handleActivateContent}>
          컨텐츠 기반 모델
        </button>
        <button style={{ margin: "12px" }} className="login-button" onClick={handleActivateCoop}>
          협업 모델
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>모델명</th>
            <th>타입</th>
            <th>상세</th>
            <th>maxDepth</th>
            <th>{activatedMenu === 'content' ? 'learningRate' : 'minSamplesSplit'}</th>
            <th>rate</th>
            <th>생성일</th>
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
                  key={model.modelId}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "var(--color-Background2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "")
                  }
                >
                  <td>{model.name}</td>
                  <td>{model.modelType}</td>
                  <td>{model.information}</td>
                  <td>{model.maxDepth}</td>
                  <td>{activatedMenu === 'content' ? model.learningRate : model.minSamplesSplit}</td>
                  <td>{model.rate ? model.rate : '-'}</td>
                  <td>{model.createDate}</td>
                  <td>
                    <button
                      className="X"
                      title="적용"
                      onClick={() => handleApply(model.modelId)}
                      disabled = { model.isActive }
                    >
                      { model.isActive ? "⭕" : "❌" }
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
