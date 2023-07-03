// Item 39
// Page : 206 any를 구체적으로 변경해서 사용하기

import { argv } from "process";

// 일반적인 상황에서는 any 보다 더 구체으로 표현 할수있는 타입이 존재할 가능성이 높기 때문에
// any 를 그대로 정규식이나 함수에 넣는것은 권장되지 않습니다.

// 다음 두예시를 통해 조금더 구체적인 any 가 무엇인지 알아보겠습니다.

function getLengthBad(array: any) {
  return array.length;
} // ❌bad

function getLengthOkay(array: any[]) {
  return array.length;
} // 그나마 okay

// 첫번째 함수보다 두번째가 나은 이유는 최소한 인자가 배열이라는 정보가 포함되어 있기 때문입니다.
// 그로 인한 이점으로는
// 1. 배열메소드 (array.length) 의 자동완성이 가능합니다.
// 2. 반환 타입이 number 로 추론 됩니다.
// 3. 호출시 매개변수가 배열인지 체크합니다.

getLengthBad(10); // any
getLengthOkay(10); // ❌error

// 객체와 관련하여 구체화된 any 는 다음과 같습니다.
interface anyObject {
  [key: string]: any;
}

function isKeyLength12(obj: anyObject) {
  for (const key in obj) {
    if (key.length === 12) {
      obj[key]; // 객체 속성 접근 가능
      return true;
    }
  }
  return false;
} // 매개 변수가 객체이지만 값을 알수 없는 경우 이렇게 사용할수있습니다.

function isKeyLength13(obj: object) {
  for (const key in obj) {
    if (key.length === 13) {
      obj[key]; // ❌객체 속성은 접근 불가능
      return true;
    }
  }
  return false;
} // 모든 비 기본형 타입을 포함하는 object 타입을 명시하는 방법도 있습니다.

// any 를 함수에 적용시킬때도 구체화 된 any 3가지가 있습니다.
const badAny: any = () => {}; // ❌bad

type Fn0 = () => any; // 매개 변수가 없는 모든 함수
type Fn1 = (arg: any) => any; // 매개 변수가 1개인 모든 함수
type Fn2 = (...args: any[]) => any; // 매개 변수가 1개 이상인 모든 함수

// 아래와 같이 타입을 지정하면,
const fn2: Fn2 = (...arg: any[]) => arg; // any[] 타입 추론.
const ffn2: Fn2 = (arg: []) => arg; // [] 타입 추론.

// 요약하자면 any 를 사용할 때가 되면 정말로 모든값이 허용되어야 하는지 면밀하게 검토해야 합니다.
// 그리고 any 를 사용할 때는 최대한 구체적인 any 를 사용해야 합니다.  => any[]  { [key: string]: any;}
