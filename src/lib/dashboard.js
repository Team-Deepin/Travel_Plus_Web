import api from "./api";

export async function getDashboard() {
  try {
    // const { data } = await api.get(`/todos/${id}`)
    // return data
    return {
      userStats: {
        totalUsers: 1200,
        newUsersLast7Days: 150,
        roleDistribution: 101,
      },
      inquiryStats: {
        totalInquiries: 372,
        unansweredInquiries: 9,
      },
      modelRates: {
        survey: [
          { name: "survey01", rate: 4.7 },
          { name: "survey02", rate: 1.8 },
          { name: "survey03", rate: 2.9 },
          { name: "survey04", rate: 0.8 },
          { name: "survey05", rate: 3.3 },
        ],
        filtering: [
          { name: "filtering01", rate: 0.7 },
          { name: "filtering02", rate: 2.8 },
          { name: "filtering03", rate: 3.9 },
          { name: "filtering04", rate: 4.2 },
          { name: "filtering05", rate: 1.3 },
        ],
      },
      popularPlaces: [
        { name: "남산타워", count: 279 },
        { name: "청계천", count: 175 },
        { name: "명동", count: 127 },
      ],
    };
  } catch (error) {
    console.error("todo를 받아 오는 데에 실패했습니다. :", error);
    return null;
  }
}
