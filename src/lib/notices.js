import api from "./api";

export async function getNotices() {
  try {
    const { data } = await api.get(`/admin/notices`)
    return data
  } catch (error) {
    console.error("공지사항 목록을 받아오는 데 실패했습니다. :", error);
    return null;
  }
}

export async function getNotice(noticeId) {
  try {
    const { data } = await api.get(`/admin/notices/${noticeId}`)
    return data
  } catch (error) {
    console.error("공지사항을 받아오는 데 실패했습니다. :", error);
    return null;
  }
}

export async function postNotice(title, content, noticeType) {
  try {
    const { resultCode } = await api.post(`/admin/notices/save`,
      {
        title: title,
        content: content,
        noticeType: noticeType,
      }
    )
    if (resultCode === 200) return 1;
    else return null;
  } catch (error) {
    console.error("공지사항을 작성하는 데 실패했습니다:", error);
    return null;
  }
}

export async function queryNotice(query) {
  try {
    const { data } = await api.post(`/admin/notices/findNotice`,
      {
        title: query,
      }
    )
    return data;
  } catch (error) {
    console.error("공지사항 목록을 받아오는 데 실패했습니다:", error);
    return null;
  }
}

export async function putNotice(noticeId, title, content, noticeType) {
  try {
    const { resultCode } = await api.post(`/admin/notices/update/${noticeId}`,
      {
        id: noticeId,
        title: title,
        content: content,
        noticeType: noticeType,
      }
    )
    if (resultCode === 200) return 1;
    else return null;
  } catch (error) {
    console.error("공지사항 수정에 실패했습니다:", error);
    return null;
  }
}

export async function deleteNotice(noticeId) {
  try {
    const { resultCode } = await api.delete(`/admin/notices/delete/${noticeId}`)
    if (resultCode === 200) return 1;
    else return null;
  } catch (error) {
    console.error("공지사항 삭제에 실패했습니다. :", error);
    return null;
  }
}
