import api from "./api";

export async function getDashboard() {
  try {
    const { data } = await api.get(`/admin/dashboard`)
    return data
  } catch (error) {
    console.error("대시보드 정보를 받아 오는 데 실패했습니다. :", error);
    return null;
  }
}
