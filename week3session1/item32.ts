// Item 32
// Page : 173 유니온의 인터페이스 보다는 인터페이스의 유니온을 사용하기.

// 유니온타입을 속성으로 가지는 인터페이스를 작성할 예정이라면,차라리 인터페이스를 여러개 생성하고, 그 유니온타입을 사용하는것을
// 고려해 볼만합니다.

// 아래와 같은 예시는 동시에 존재할 수 없는 타입을 가질수 있으므로 오류를 일으킬수 있습니다.
interface BadLayer {
  layout: "FillLayout" | "LineLayout" | "PointLayout";
  paint: "FillPaint" | "LinePaint" | "PointPaint"; // 원래는 스트링이 아니라 적절한 타입선언이어야 합니다.
}

// 인터페이스 설계에 따라서 FillLayout 이 LinePaint 와 함께 있는 경우는 있을 수 없습니다.
// 그렇기 때문에 위의 인터페이스를 분리된 인터페이스로 나누고 유니온화 시킬수 있습니다.

interface FillLayer {
  layout: "FillLayout";
  paint: "FillPaint";
}
interface LineLayout {
  layout: "LineLayout";
  paint: "LinePaint";
}
interface PointLayout {
  layout: "PointLayout";
  paint: "PointPaint";
}

type NewLayer = FillLayer | LineLayout | PointLayout;

// 이러한 형태라면 동시에 존재할수없는 속성끼리 섞이는것을 방지할 수 있습니다. (유효한 상태만 표현 > item 28)
// 또다른 방식으로는 태그된 유니온 이 있습니다.
// 인터페이스가 같은이름의 속성을가지고 해당 속성의 타입(값)으로 구분합니다.

interface FillLayout {
  tag: "FillLayout";
  // other types..
}
interface LineLayout {
  tag: "LineLayout";
  // other types..
}
interface PointLayout {
  tag: "PointLayout";
  // other types..
}

type TagedLayer = FillLayout | LineLayout | PointLayout;
// 이러한 방식은 런타임에 태그를 확인할수있습니다.  태그를참고하여 TagedLayer 의 타입을 좁히는데도 활용합니다.

function drqwLayer(layer: TagedLayer) {
  switch (layer.tag) {
    case "FillLayout":
      // layer is FillLayout
      break;
    case "LineLayout":
      // layer is LineLayout
      break;
    case "PointLayout":
      // layer is PointLayout
      break;
  }
} // 타입체커와 잘맞습니다.

// 태그된 유니온은 타입스크립트 타입 체커와 잘 맞으므로 타입스크립트 코드 어디에서나 찾을 수 있습니다.
// 어떤 데이터 타입을 테그된 유니온으로 표현할 수 있다면 그렇게 하는것이 일반적으로 좋습니다.

// 다른예제
interface Human {
  name: string;
  // 다음 둘 다 동시에 있거나 동시에 없습니다.
  dateOfBirth?: Date;
  placeOfBirth?: string;
}

// 타입에 대한 정보를 담고 있는 주석은 문제가 될 소지가 매우 높습니다.
// 위 인터페이스의 선택적 속성은 실제로 관계가 있지만 어떠한 관계도 표현되어 있지 않습니다.
// 이처럼 관련된 속성은 하나의 객 체로 모으는것이 더 나은 설계 입니다.

interface Human2 {
  name: string;
  birth?: {
    date: Date;
    place: string;
  };
}

// 이렇게 하면 place 와 date 중에 하나가 없는경우 오류가 발생하므로 더 나은설계가 됩니다.
const human: Human2 = {
  name: "Steve",
  birth: {
    date: new Date(),
  },
};
