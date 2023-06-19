// 아이템 12
// Page : 65 함수표현식에 타입 적용 하기

// 자바스크립트에서는 함수 선언과 표현식을 다르게 인식한다
// 함수 선언식
function someFunction() {}
// 함수 표현식
const someFunction2 = function () {};
const someFunction3 = () => {};

// 타입스크립트에서는 const 로 시작하는 함수 표현식을 사용하는것이 좋다.
// 함수의 매개 변수부터 반환값 까지 전체를 함수타입으로 선언하여 함수 표현식에 재사용 할 수 있다는 장점이 있다.

type DiceRoll = (sides: number) => number;
const rollDice: DiceRoll = (sides) => sides; // side 의 타입을 이미 알고 있다.

// 반복되는 함수의 시그니쳐를 통합 할 수 있다.
/**before */
const addBefore = (a: number, b: number) => a + b;
const subBefore = (a: number, b: number) => a + b;

/**after */
type Signature = (a: number, b: number) => number; // 이 타입을 재사용 한다.
const sub: Signature = (a, b) => a + b;
const mul: Signature = (a, b) => a * b;

// 함수의 시그니처 를 타입으로 제공하기도 한다. ex :React
// 아래 예시에서는 매개 변수인 e 에 타입을 지정하지 않고 함수 자체에 타입을 지정했습니다.
const buttonHandler: React.MouseEventHandler = (e) => {};

// 시그니쳐가 일치한다면 여러 다른 함수 표현식에 적용해 볼만 하다.

// 아래 함수의 스토리는 다음과 같다.
// async function fetchTestFunction () {
//   const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
//   return await response.json();
// }
// 어떤 fetch 함수가 호출 되었을때, 404 에러 발생하면 해당 응답이 JSON 형식이 아닐 수 있고
//  .json() 함수를 호출 할 수 없다는 에러가 404 에러를 덮어 쓴다.
// 따라서 에러가 아니면 일반 fetch 와 같은 Promise<response> 를 반환하고 에러라면 404 에러를 던지도록 하는 함수를 작성하려한다.


// before
async function someFetch(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

// after
const someBetterFetch: typeof fetch = async (input, init) => {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
};
// 이러한 타입 구문 사용 은 함수의 반환 타입도 보장할수 있다. 예를들어 throw 가 아니라 return throw 면 에러를 발생 시킨다.

// 함수의 매개변수(파라미터) 에 타입을 정의 하는 것 보다 함수 표현식 전체의 타입을 정이 하는것이 코드 간결 해 지고 안전하다.
// 타입시그니처가 반복되는 느낌이 있다면 공통 시그니처 타입을 찾는 시도를 해볼 수 있다.
// 다른 함수의 시그니처를 얻고 싶을때는 typeof fn 을 하면 된다.
