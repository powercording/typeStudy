// @ts-check
// / <reference path="./types.d.ts" />

// Item 59
// Page :  300 ts 도입 전에 @ts-check 와 JSDock 으로 시험해보기

// 본격적으로 타입스크립트 도입하기 전에 @ts-check 지시자를 사용하면 타입스크립트 전환시에 어떠한 문제가 있는지 미리 시험해볼수있습니다.
// 그러나 이 지시자는 noImplicitAny 옵션을 해제한것보다 훨씬 가벼운 체크만을 수행합니다.

const PErson = {
  first: "Grace",
  last: "Hopper",
};
const namesss = "상돈";

* PErson.first;

// first 를 스트링 타입으로 추론하고 있는건 맞지만
// 타입불일치는 왜 동작하는건지 가늠이 안됩니다.
PErson.first

// 선언되지 않은 변수사용을 체크할수 있습니다.
console.log(myname.firstName)

// 트리플슬래시로 타입선언 파일을 가져오면 에러를 없앨수있습니다.

// 라이브러리를 사용하는 경우 라이브러리의 타입정보를 알아야 합니다. (js 파일에서) 
// 예를들어 @ts-check 가 있는 상태에서는 jquery 사용시 타입정보가 없기때문에 에러가 발생합니다.
// npm install --save-dev @types/jquery 로 타입파일을 설치하면 js 에서도 라이브러리에 대한 타입검사를 할 수 있습니다.



// DOM 관련문제
const ageEl = document.getElementById("age");
ageEl.value = 12

// document.getElementById 는 HTMLElement | null 을 반환합니다. 이는 value 속성은 inputElement 에 존재하지만
// 더 상위개념인 htmlElement 에는 존재하지 않습니다. 이런경우 에러를 없애려면 단언을 사용해야하지만
// 해당 파일은 js 파일이므로 단언 문법을 사용할 수 없습니다. 이럴때 JSDoc 을 사용할 수 있습니다.

const realElement = /** @type {HTMLInputElement} */ (document.getElementById("age"));
realElement.value = 12
realElement.value = "12"   // 숫자와 스트링까지 타입추론을 잘 해냅니다.

// 만약 @ts-check 이전에 JSDoc 을 프로그램 전반에 사용하고 있었다면
// ts check 를 활성화 하는 순간 JSDoc 과 충돌이 일어날수도 있습니다. 


// JSDoc 을 활요하여 점진적인 타입추가 의 예시를 보겠습니다
function getDouble(val) {
  return val * 2;
}  // 참조: val에 마우스 올려서 빠른수정하여 JSDoc 자동생성 하기.
// 타입정보를 빠르게 생성할수 있지만 잘 동작하지 않는 경우도 있습니다.

function loadingData (data) {
  data.files.forEach(async (file) => { })
} // 여기서 data 매개변수에 빠른수정을 하면 책과 다르게  잘되는거같습니다. 버전 차이일까요.
// 책에서는 엉뚱한 타입이 추론됩니다.


// 요약
///// @ts-check 를 사용하면 js 에서도 타입체크를 수행할수있습니다.
// JSDoc 으로 타입단언과 같은 효과를 낼수있습니다.
// JSDoc 은 중간 단계이기 때문에 너무 공들이거나 많은 시간을 할애하지 않도록 합니다.
 