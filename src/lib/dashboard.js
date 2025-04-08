import api from "./api";

export async function getTodos(id) {

  try {
    const { data } = await api.get(`/todos/${id}`)
    return data
  } catch (error) {
    console.error("todo를 받아 오는 데에 실패했습니다. :", error)
    return null
  }
}
