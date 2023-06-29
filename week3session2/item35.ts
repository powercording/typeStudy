// Item 35
// Page : 188 데이터가 아닌 API 와 명세를 보고 타입 만들기.

// 이전까지의 내용으로 인해서 개발자는 타입설계를 잘못하면 어떻게 잘못될 수 있는지, 잘하면 무엇이 좋은지 알게 되었습니다.
// 이로 인해서 타입설계를 잘해야 한다는 압박을 느낄수있습니다.
// 만약 타입을 직접 작성하지 않고, 자동으로 생성할 수 있다면 좋을것같습니다.

// 우리가 개발하며 접하는 명세, API 등 최소한 몇개는 프로젝트 외부에서 비롯된 것입니다.
// 여기서 주목할 것은 "예시 데이터"가 아니라 "명세"를 참고해야 한다는 것입니다.

import { Feature, BBox, Geometry } from "geojson";

function calcBox(f: Feature): BBox | null {
  let box: BBox | null = null;

  const helper = (coords: any[]) => {
    //..
  };

  const { geometry } = f;
  if (geometry) {
    // if (geometry.type === "GeometryCollection") {
    //   throw new Error("GeometryCollection은 지원하지 않습니다.");
    // }
    helper(geometry.coordinates);
    // 'Geometry' 형식에 'coordinates' 속성이 없습니다.
    // 'GeometryCollection<Geometry>' 형식에 'coordinates' 속성이 없습니다.
  }

  return box;
}
// 위 함수에서는 geometry 에 coordinates 가 있다고 가정한것이 문제가 되었습니다.
// 참조: 위 함수의 두번쨰 이프문 주석 제거 이 후 아래 발표 진행
// Geometry = Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon | GeometryCollection;
// 지오메트리는 위와같은 유니온 타입으로써 이중에서 GeometryCollection 은 coordinates 를 가지지 않습니다. 그러므로 처음과 같은 오류를 발생시킨 것입니다.
// 지오메트리의 타입을 좁힘으로써 처음과 같은 오류를 해결하였습니다.

// 하지만 타입을 차단하는 방식으로 좁히기 보다는 분기를 통해 각 타입에 대한 작업을 이어가는것이 좋습니다.
// calcBox 함수 내부라고 생각합시다.
const helper = (coords: any[]) => {
  // ...
};

const geoHelper = (g: Geometry) => {
  if (g.type === "GeometryCollection") {
    g.geometries.forEach(geoHelper);
  } else {
    helper(g.coordinates);
  }
};

const { geometry } = f;
if (geometry) {
  geoHelper(geometry);
}

// 이번 장에서는 개발자는 타입을 직접 입력하지 않고 라이브러리로부터 제공되는 타입을 사용하여 변수에 타입을 지정하고 있습니다. ex BBox, Geometry ,Feature 등
// 어떤 데이터를 보고 직접 작성하는것이 아닌 이미 작성된 타입을 적용시키고 자동완성이나 타입좁히기 등을 사용하여 의도하지 않은 실수를 방지할 수 있습니다.
