// 아이템 11
// Page : 61 잉여 속성 체크의 한계 인지하기

// 타입이 명시된 변수에 객체 리터럴을 할당 하려 할때 타입스크립트는 해당 타입의 속성이 있는지
// 그리고 그 외 속성이 존재 하는지 확인한다.

interface Room {
  size: number;
  height: number;
}

const room: Room = {
  size: 1,
  height: 2,
  familyName: "song",
}; // 구조적 타이핑 관점에서 오류가 없어야 한다.

const room2 = {
  size: 1,
  height: 2,
  familyName: "song",
};
const room3: Room = room2; // 오류가 발생하지 않는다.

//위 두 예제의 차이는 잉여 속성 체크 검사와 할당 가능 타입 검사가 별개로 수행되기 때문이다.
// 잉여 속성 체크 검사는 상황에 따라서 동작하지 않는다는 한계가 존재한다. (객체 리터럴에만 동작 하는 듯 합니다)

// 다음 코드를 보면 차이를 이해하는데 도움이 될 수 있다.
interface Options {
  title: string;
  darkMode?: boolean;
}
function createWindow(options: Options) {
  if (options.darkMode) {
    // ...
  }
  // ...
}

// Options 타입의 darkMode 속성은 optional 이기 때문에 존재하지 않아도 괜찮고,추가적인 속성은 구조적 타이핑 관점에서도 문제가 없지만
// 객체 리터럴 작성시 개발자가 의도하지 않은 실수를 저지를 수 있다.
createWindow({ title: "Spider Solitaire", darkmode: true }); // darkMode 여야 한다.
// 반면 이미 변수에 할당 된 객체의 경우 속성끼리 비교 하기 때문에 개발자가 타입 실수를 할 가능성이 없다.

// 이런 특성으로 인하여 title 속성을 가지는 객체는 모두 Options 타입이라고 생각 할 수 있다.
const options: Options = document; // document 는 title 속성을 가지고 있다.

// 잉여 속성 체크는 리터럴 이지만 타입단언 (as) 를 사용 할때도 작동하지 않는다.
const ooptions: Options = { title: "title", darkmode: true } as Options; // darkMode 여야 하지만 오류를 내지 않는다.

// 만약 잉여속성 체크가 불편하다면 인덱스 시그니쳐를 사용 하여 우회할 수 있다.
interface IndexSignatureOptions {
  [key: string]: unknown;
  darkMode?: boolean;
}
const IndexedOptions: IndexSignatureOptions = {
  title: "title",
  darkmode: true,
}; // darkMode 여야 하지만 오류를 내지 않는다.

// 잉여 속성 체크와 비슷한 약한 타입 체크도 존재합니다.
interface Axis2 {
  xAxis?: number;
  yAxis?: number;
  zAxis?: number;
}
const someAxis = { xaxis: 3 };

// Axis2 타입은 모든 속성이 필수가 아니기 때문에 어떠한 객체도 할당 가능한 것처럼 보이지만
// 이러한 약한 타입에 대해서 타입스크립트는 값과 타입에 공통된 속성이 있는지 체크하게 된다.
const axisAxis: Axis2 = someAxis; // 모든 객체가 할당 가능해보이지만 공통된 속성이 존재하지 않기 때문에 에러를 내보낸다.

// 잉여 속성 체크는 구조적타이핑에서 허용하는 속성이름의 오타를 실수를 바로 잡는데 효과적이다.
// 앞서 본 예제와 같은 경우에 유효하며 객체 리터럴 에만 적용이 된다.
