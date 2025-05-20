import api from "./api";

export async function getUsers() {
  try {
    const { data } = await api.get(`/admin/users`)
    return data
  } catch (error) {
    console.error("사용자 목록을 받아오는 데 실패했습니다. :", error);
    return null;
  }
}

export async function queryUser(userName) {
  try {
    const { data } = await api.post(`/admin/users`, {userName: userName})
    return data
  } catch (error) {
    console.error("사용자 정보를 받아오는 데 실패했습니다. :", error);
    return null;
  }
}

export async function deactiveUser(userId) {
  try {
    const { resultCode } = await api.put(`/admin/users/deactive/${userId}`)
    if (resultCode === 200) return 1;
    else return null;
  } catch (error) {
    console.error("사용자 정지에 실패했습니다. :", error);
    return null;
  }
}

export async function deleteUser(userId) {
  try {
    const { resultCode } = await api.delete(`/admin/users/delete/${userId}`)
    if (resultCode === 200) return 1;
    else return null;
  } catch (error) {
    console.error("사용자 삭제에 실패했습니다. :", error);
    return null;
  }
}
