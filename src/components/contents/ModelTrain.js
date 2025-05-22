// ModelTrain.js

import { useState } from "react";
import "../../styles/Web.css";
import {
  updateTrainData,
  trainContentModel,
  trainCooperationModel,
} from "../../lib/ai";

const ModelTrain = ({ showModal }) => {
  const [contentModel, setContentModel] = useState({
    param1: "",
    param2: "",
    param3: "",
  });

  const [coopModel, setCoopModel] = useState({
    param1: "",
    param2: "",
    param3: "",
  });

  const contentParamNames = [
    "콘텐츠 기반 모델 학습",
    "lr (0.0001 ~ 0.01)",
    "batch size (2^(4 ~ 8))",
    "epochs (10 ~ 100)",
  ];
  const coopParamNames = [
    "협업 모델 학습",
    "no component (10 ~ 100)",
    "learningRate (0.0001 ~ 0.5)",
    "epochs (10 ~ 100)",
  ];

  const handleUpdateData = async () => {
    const result = await updateTrainData();
    if (result === null) showModal("AI 학습용 데이터 생성에 실패했습니다.");
  };

  const handleTrainContentModel = async () => {
    const result = await trainContentModel(
      contentModel.param1,
      contentModel.param2,
      contentModel.param3
    );
    if (result === null) showModal("컨텐츠 기반 모델 학습에 실패했습니다.");
  };

  const handleTrainCooperationModel = async () => {
    const result = await trainCooperationModel(
      coopModel.param1,
      coopModel.param2,
      coopModel.param3
    );
    if (result === null) showModal("협업 모델 학습에 실패했습니다.");
  };

  const renderModelSection = (type, model, setModel, onTrainClick) => {
    const paramNames = type === "content" ? contentParamNames : coopParamNames;

    return (
      <div>
        <hr className="hr-divider" />
        <h2 style={{ margin: "12px" }}>{paramNames[0]}</h2>
        <div>
          <div className="ai-label"> {paramNames[1]} </div>
          <input
            type="text"
            value={model.param1}
            onChange={(e) => setModel({ ...model, param1: e.target.value })}
            className="ai-text-input"
          />
          <div className="ai-label"> {paramNames[2]} </div>
          <input
            type="text"
            value={model.param2}
            onChange={(e) => setModel({ ...model, param2: e.target.value })}
            className="ai-text-input"
          />
          <div className="ai-label"> {paramNames[3]} </div>
          <input
            type="text"
            value={model.param3}
            onChange={(e) => setModel({ ...model, param3: e.target.value })}
            className="ai-text-input"
          />
          <br />
          <button
            style={{ margin: "12px" }}
            className="login-button"
            onClick={onTrainClick}
          >
            모델 생성
          </button>
          <br />
          <br />
        </div>
      </div>
    );
  };

  return (
    <div className="ai-train-container">
      <br />

      <button
        style={{ margin: "12px" }}
        className="login-button"
        onClick={handleUpdateData}
      >
        학습용 데이터 생성
      </button>

      {renderModelSection(
        "content",
        contentModel,
        setContentModel,
        handleTrainContentModel
      )}
      {renderModelSection(
        "coop",
        coopModel,
        setCoopModel,
        handleTrainCooperationModel
      )}
    </div>
  );
};

export default ModelTrain;


// // ModelTrain.js

// import { useState } from "react";
// import "../../styles/Web.css";

// const ModelTrain = ({ showModal }) => {
//   const [contentModel, setContentModel] = useState({
//     name: "",
//     description: "",
//     param1: "",
//     param2: "",
//     param3: "",
//   });

//   const [coopModel, setCoopModel] = useState({
//     name: "",
//     description: "",
//     param1: "",
//     param2: "",
//     param3: "",
//   });

//   const handleTrainContentModel = () => {
//     console.log("trainContentModel:", contentModel);
//     // 실제 모델 학습 함수 호출
//   };

//   const handleTrainCooperationModel = () => {
//     console.log("trainCooperationModel:", coopModel);
//     // 실제 모델 학습 함수 호출
//   };

//   const renderModelSection = (title, model, setModel, onTrainClick) => (
//     <div>
//       <hr className="hr-divider" />

//       <h2 style={{ margin: "12px" }}>{title}</h2>
//       <div>
//         <input
//           type="text"
//           placeholder="모델명"
//           value={model.name}
//           onChange={(e) => setModel({ ...model, name: e.target.value })}
//           className="ai-text-input"
//         />
//         <textarea
//           placeholder="상세 설명"
//           value={model.description}
//           onChange={(e) => setModel({ ...model, description: e.target.value })}
//           className="ai-text-box"
//           rows={3}
//         />
//         <input
//           type="text"
//           placeholder="파라미터1 (범위)"
//           value={model.param1}
//           onChange={(e) => setModel({ ...model, param1: e.target.value })}
//           className="ai-text-input"
//         />
//         <input
//           type="text"
//           placeholder="파라미터2 (범위)"
//           value={model.param2}
//           onChange={(e) => setModel({ ...model, param2: e.target.value })}
//           className="ai-text-input"
//         />
//         <input
//           type="text"
//           placeholder="파라미터3 (범위)"
//           value={model.param3}
//           onChange={(e) => setModel({ ...model, param3: e.target.value })}
//           className="ai-text-input"
//         />
//         <br />
//         <button
//           style={{ margin: "12px" }}
//           className="login-button"
//           onClick={onTrainClick}
//         >
//           모델 생성
//         </button>

//         <br />
//         <br />
//       </div>
//     </div>
//   );

//   return (
//     <div className="ai-train-container">
//       <br />

//       <button style={{ margin: "12px" }} className="login-button">
//         학습용 데이터 생성
//       </button>

//       {renderModelSection(
//         "콘텐츠 기반 모델 학습",
//         contentModel,
//         setContentModel,
//         handleTrainContentModel
//       )}
//       {renderModelSection(
//         "협업 모델 학습",
//         coopModel,
//         setCoopModel,
//         handleTrainCooperationModel
//       )}
//     </div>
//   );
// };

// export default ModelTrain;

