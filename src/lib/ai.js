// ai.js

import api from "./api";

export async function getModels() {
  try {
    const { data } = await api.get(`/admin/models`)
    return data
  } catch (error) {
    console.error("모델 정보를 받아 오는 데 실패했습니다. :", error);
    return null;
  }
}

export async function updateTrainData() {
  try {
    const { resultCode } = await api.get(`/admin/models/refresh`);
    if (resultCode === 200) return 1;
    else return null;
  } catch (error) {
    console.error("모델 학습 데이터 업데이트에 실패했습니다. :", error);
    return null;
  }
}

export async function trainContentModel(lr, batchSize, epochs) {
  try {
    const { resultCode } = await api.post(`/admin/models/content/train`,
      {
        lr: lr,
        batch_size: batchSize,
        epochs: epochs,
      }
    )
    if (resultCode === 200) return 1;
    else return null;
  } catch (error) {
    console.error("모델 훈련에 실패했습니다. :", error);
    return null;
  }
}

export async function trainCooperationModel(noComponent, learningRate, epochs) {
  try {
    const { resultCode } = await api.post(`/admin/models/cooperation/train`,
      {
        no_component: noComponent,
        learning_rate: learningRate,
        epochs: epochs,
      }
    )
    if (resultCode === 200) return 1;
    else return null;
  } catch (error) {
    console.error("모델 훈련에 실패했습니다. :", error);
    return null;
  }
}

export async function applyModel(modelId, modelType) {
  try {
    const { resultCode } = await api.post(`/admin/models/content/train`,
      {
        modelId: modelId,
        modelType: modelType,
      }
    )
    if (resultCode === 200) return 1;
    else return null;
  } catch (error) {
    console.error("모델 적용에 실패했습니다. :", error);
    return null;
  }
}



// // ai.js

// import api from "./api";

// export async function getModels() {
//   try {
//     const { data } = await api.get(`/admin/models`)
//     return data
//   } catch (error) {
//     console.error("모델 정보를 받아 오는 데 실패했습니다. :", error);
//     return null;
//   }
// }

// export async function trainContentModel(name, nEstimators, learningRate, maxDepth, information) {
//   try {
//     const { resultCode } = await api.post(`/admin/models/content/train`,
//       {
//         name: name,
//         nEstimators: nEstimators,
//         learningRate: learningRate,
//         maxDepth: maxDepth,
//         information: information,
//       }
//     )
//     if (resultCode === 200) return 1;
//     else return null;
//   } catch (error) {
//     console.error("모델 훈련에 실패했습니다. :", error);
//     return null;
//   }
// }

// export async function trainCooperationModel(name, nEstimators, maxDepth, minSamplesSplit, information) {
//   try {
//     const { resultCode } = await api.post(`/admin/models/cooperation/train`,
//       {
//         name: name,
//         nEstimators: nEstimators,
//         maxDepth: maxDepth,
//         minSamplesSplit: minSamplesSplit,
//         information: information,
//       }
//     )
//     if (resultCode === 200) return 1;
//     else return null;
//   } catch (error) {
//     console.error("모델 훈련에 실패했습니다. :", error);
//     return null;
//   }
// }

// export async function applyModel(modelId, modelType) {
//   try {
//     const { resultCode } = await api.post(`/admin/models/content/train`,
//       {
//         modelId: modelId,
//         modelType: modelType,
//       }
//     )
//     if (resultCode === 200) return 1;
//     else return null;
//   } catch (error) {
//     console.error("모델 적용에 실패했습니다. :", error);
//     return null;
//   }
// }

