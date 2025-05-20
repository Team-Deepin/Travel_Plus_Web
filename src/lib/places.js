import api from "./api";

export async function getPlaces() {
  try {
  const { data } = await api.get(`/admin/courseDetails`)
  return data
  } catch (error) {
    console.error("여행지 정보를 받아 오는 데에 실패했습니다. :", error);
    return null;
  }
}

export async function deletePlace(courseDtId) {
  try {
    const { resultCode } = await api.delete(`/admin/courses/delete/${courseDtId}`)
    if (resultCode === 200) return 1;
    else return null;
  } catch (error) {
    console.error("여행지 삭제에 실패했습니다. :", error);
    return null;
  }
}
