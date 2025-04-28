export async function getPlaces() {
    try {
      return {
        place1: {
          placeId: 1,
          placeName: "해운대",
          placeLocation: "부산광역시 해운대구",
          placeType: "해변",
        },
        place2: {
          placeId: 2,
          placeName: "광안리",
          placeLocation: "부산광역시 수영구",
          placeType: "해변",
        },
        place3: {
          placeId: 3,
          placeName: "태종대",
          placeLocation: "부산광역시 영도구",
          placeType: "전망대",
        },
        place4: {
          placeId: 4,
          placeName: "설악산",
          placeLocation: "강원도 속초시",
          placeType: "산",
        },
        place5: {
          placeId: 5,
          placeName: "한라산",
          placeLocation: "제주특별자치도",
          placeType: "산",
        },
        place6: {
          placeId: 6,
          placeName: "경포대",
          placeLocation: "강원도 강릉시",
          placeType: "해변",
        },
        place7: {
          placeId: 7,
          placeName: "남산타워",
          placeLocation: "서울특별시 용산구",
          placeType: "전망대",
        },
        place8: {
          placeId: 8,
          placeName: "제주 올레길",
          placeLocation: "제주특별자치도",
          placeType: "트레킹 코스",
        },
        place9: {
          placeId: 9,
          placeName: "여의도공원",
          placeLocation: "서울특별시 영등포구",
          placeType: "공원",
        },
        place10: {
          placeId: 10,
          placeName: "부산타워",
          placeLocation: "부산광역시 중구",
          placeType: "전망대",
        },
        place11: {
          placeId: 11,
          placeName: "청계천",
          placeLocation: "서울특별시 중구",
          placeType: "도시명소",
        },
        place12: {
          placeId: 12,
          placeName: "우도",
          placeLocation: "제주특별자치도 제주시",
          placeType: "섬",
        }
      };
    } catch (error) {
      console.error("todo를 받아 오는 데에 실패했습니다. :", error);
      return null;
    }
  }
  