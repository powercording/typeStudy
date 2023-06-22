// Item 24
// Page : 131 일관성 있는 별칭 사용하기

// 별칭을 만드는 예시를 작성해 보겠습니다.
const typeFruits = { type: "sweet", color: ["red"] };
const fruitColor = typeFruits.color; // fruitColor 라는 별칭

// 별칭에서 값을 변경하면 원본도 변경됩니다. 이는 별칭이 원본을 참조하기 때문입니다.
fruitColor[0] = "green";

// 이처럼 별칭을 남발하게 되면 제어흐름을 따라가기 어렵게 될 수 있습니다.

// 다각형을 표현하는 자료 구조를 가정하겠습니다

interface 좌표 {
  x: number;
  y: number;
}

interface 바운딩박스 {
  x: [number, number];
  y: [number, number];
}

interface 다각형 {
  exterior: 좌표[];
  holes: 좌표[][];
  비박스?: 바운딩박스;
}

// 다각형의 기하학적 구조는 exterior 와 holes 로 구성되어 있습니다. 비박스 는 필수가 아닌 최적화 속성입니다.
// 비박스 는 어떤 점이 다각형에 포함 되는지 빠르게 체크할 수 있습니다.

function 다각형안에점이있나요(다각형: 다각형, 점: 좌표) {
  if (다각형.비박스) {
    if (
      점.x < 다각형.비박스.x[0] ||
      점.x > 다각형.비박스.x[1] ||
      점.y < 다각형.비박스.y[0] ||
      점.y > 다각형.비박스.y[1]
    ) {
      return false;
    }
  }
} //이 코드는 잘 동작하지만 반복되는 부분이 존재합니다.

// 중복을 줄이기 위해 임시 변수를 생성해 보겠습니다.

function 다각형안에점이있습니까(다각형: 다각형, 점: 좌표) {
  const 박스 = 다각형.비박스;
  if (다각형.비박스) {
    if (
      점.x < 박스.x[0] ||
      점.x > 박스.x[1] ||
      점.y < 박스.y[0] ||
      점.y > 박스.y[1]
    ) {
      return false;
    }
  }
} // 참조: 이 예제는 이상합니다. 박스 변수에 (다각형.비박스) 를 할당하였으므로 첫번째 if 문에 (다각형.비박스) 가 아닌 그냥 박스가 들어가면 됩니다.
// 참조: 다음페이지에 바로 수정된 코드가 있습니다.
// const 박스 = 다각형.비박스;
// if (박스) { ... }

// if 의 조건문을 바꾸었어도 코드를 읽는 사람 입장에서 문제가 남아 있게 됩니다.
// 박스와 비박스는 같은 값인데 다른 이름을 사용한 것입니다.
// 객체 비구조화 할당을 통하여 보다 간결하게 코드를 짤 수 있습니다 .

// 요약
// 별칭은 타입좁히기를 방해할 수 있습니다. 별칭을 사용할 때는 일관성 있게 사용해야 합니다.
// 비구조화 문법을 사용해서 일관된 이름을 사용 할 수 있습니다.

//질문: 함수 호출이 객체 속성의 타입 정제를 무효화 할수 있다?