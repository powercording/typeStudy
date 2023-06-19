// 아이템 14
// Page : 75 타입 연산과 제너릭으로 반복 줄이기

// 타입 중복 제거가 힘든 이유는 중복된 패턴을 제거하는 매커니즘이 기존 코드 에서 하던 것과
// 비교하여 덜 익숙하기 때문이고,
// 중복을 제거하는 여러 다른 활동이 타입시스템에서는 어떤것에 해당 할 지 상상이 잘 되지 않기 때문이다.

// 타입간 매핑방법을 익히면 타입 정의에서도 DRY 원칙을 적용 할 수 있다.

// 반복을 줄이는 가장 첫 단계는 타입에 이름을 붙이는것이다.
function distance(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

// 위 함수 코드를 수정하여 타입에 이름을 붙여 인수 부분의 타입중복을 제거하려면
interface Point14 {
  x: number;
  y: number;
}
function disTanace(p1: Point14, p2: Point14) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
} // 상수를 사용하여 반복을 줄인것과 같은 개념

// 몇몇 함수가 시그니쳐가 같다면
function get(url: string, opts: Options): Promise<Response> {
  return new Promise((resolve, reject) => {});
}
function Poset(url: string, opts: Options): Promise<Response> {
  return new Promise((resolve, reject) => {});
}

// 명명된 타입을 작성하여코드 중복을 제거 할 수 있다.
type HTTPFunction = (url: string, opts: Options) => Promise<Response>;

const get14: HTTPFunction = (url, opts) => {
  return new Promise((resolve, reject) => {});
};
const post14: HTTPFunction = (url, opts) => {
  return new Promise((resolve, reject) => {});
};

// 한 인터페이스가 다른 인터페이스를 확장하게 해서 중복을 피할 수 있다.
interface Person_14 {
  name: string;
  age: number;
}
interface PersonWithBirthDate_14 extends Person_14 {
  birth: Date;
}

// 만약 어떠한두 인터페이스가 필드의 부분 집합을 공유 한다면 공통된 필드만 골라서 기반
// 클래스 ( 기반타입 ) 을 만들어서 중복을 제거 할 수 있다.

// type 을 확장하는 경우에 & 연산자를 활용한다.
type TypePerson_14 = {
  name: string;
  age: number;
};
// 유니온 타입을 확장 할때 특히 유용하다고 하는데 잘 모르겠습니다
// . 이러한 문법은 잘못 사용하면 구현불가능할지도 모른다는 생각이 듭니다.
type TypePersonWithBirthDate_14 = TypePerson_14 & { birth: Date };

// 확장 하지 않고 인터페이스의 타입을 가져와 사용 하는 방법도 있다.
interface State {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
  pageContents: string;
}

interface TopNavState {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
}

//페이지의 구성 상 TopNavState 를 확장해서 State 를 구현하기 보다
// State 의 부분집합으로 TopNavState 를 사용하는것이 더 바람직해보인다.

type TopNavState_14 = {
  userId: State["userId"];
  pageTitle: State["pageTitle"];
  recentFiles: State["recentFiles"];
};

// 키값이 중복되 보인다.
type TopNavState_14_1 = {
  [key in "userId" | "pageTitle" | "recentFiles"]: State[key];
};

// 매핑된 타입이라는 것은 기존타입의 속성을 가져와 새로운 타입을 만드는것을 말한다.
// type Pick<T, K> = { [key in K]: T[key] };
type TopNavState_14_2 = Pick<State, "userId" | "pageTitle" | "recentFiles">;

// 위 코드에서 Pick 은 제네릭 타입이다. 중복된 코드를 없앤다는 관점에서 Pick 을
// 사용하는것은 함수를 사용하는것과 같다. 두개의 매개 변수를 받아서 결과 타입을 반환한다.

// 태그된 유니온 에서의 타입중복
interface Success {
  type: "success";
  name: string;
}
interface Fail {
  type: "fail";
  name: string;
}

type Actions = Success | Fail;
type ActionsType = "success" | "fail"; // 중복 등장

type Action_Type_14 = Actions["type"]; // "success" | "fail"

// 어떤 Options 라는 임의이 타입과 해당 타입을 선택적으로 받는 함수가 있다고 하면
interface Options_14 {
  width: number;
  height: number;
}
interface Options_14_Fn {
  width?: number;
  height?: number;
}

function updateOptions(opts: Options_14_Fn) {}

// keyof 를 사용하여 Options_14 의 속성으로 이루어진 유니온을 생성할 수 있다.
type OptionsKeys_14 = keyof Options_14; // "width" | "height"
type OptionsUpdate_14 = { [key in keyof Options_14]?: Options_14[key] };

// 값의 타입을 추출하여 타입정의를 하고 싶을수도 있다.
const valueType = {
  age: 25,
  vegan: false,
  gender: "X",
};

type ValueType = typeof valueType;
// 해당 typeof 는 자바스크립트 런타임이 아니며 타입스크립트 단계에서 연산되며 훨씬 더 정확한
// 타입을 제공한다.

// 함수나 매서드의 반환값으로 부터 명명된 타입을 선언하고 싶을 수도 있다
function returnType(x: number) {
  return x * 2;
} // 추론된 리턴타입은 number 이다

type ReturnType_14 = ReturnType<typeof returnType>; // number
// 여기서 ReturnType의 제네릭 자리에 함수의 값인 함수 이름이 아니라 함수의 타입인 typeof returnType 이 들어갔다.

// 함수의 매개변수를 제한하기 위해서 우리는 지금 타입 스크립트를 사용 하고 있다.
// 제네릭에서도extends 를 사용하여 타입의 범위제한을 둘 수 있다.

const arr = [1, 2, 3, 4];

for (let i of arr) {
  console.log(i);
}
