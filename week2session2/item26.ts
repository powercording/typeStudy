// Item 26
// Page : 142 타입 추론에 문맥이 어떻게 사용되는지 이해하기

// 타입스크립트는 타입을 추론할 때 단순히 값만 고려하지 않습니다.
// 값이 존재하는 곳의 문맥까지도 살핍니다.
// 문맥을 고려하는 동작 때문에 가끔 추론이 어긋날 때도 있습니다.
// 이를 적절하게 제어하려면 타입스크립트가 문맥을 어떻게 이해하는지 알아야 합니다.

// 자바스크립트에서는 참조: ./item26.js

// 타입스크립트에서는 다음과 같이 작성할 수 있습니다.
function setLanguage(language: string) {
  //...
}

// 예시1
setLanguage("english"); // OK
// 예시2
const language = "english";
setLanguage(language); // OK
// 위 두 예시 모두 가능합니다.

// 예시를 바꾸어 함수의 인자를 스트링 리터럴 유니온 타입으로 지정하겠습니다.
type Lang = "korean" | "english";
function stringLiteralUnion(language: Lang) {}

// 바꾼 후의 예시 1
stringLiteralUnion("korean");

let literalLanguage = "english";
stringLiteralUnion(literalLanguage); //let 변수는 변화 가능성을 고려하여 리터럴이 아닌 string 으로 추론합니다.

// 이와 같은 상황을 해결하기 위해서두가지 방법이 있습니다.
// 첫번째는 타입을 명시하여 let 선언이라도 변수가 가지는 값을 제한하는것입니다.
let literalLang: Lang = "english";
stringLiteralUnion(literalLang); // let 선언으로 생성된 변수이지만 타입으로 인하여 리터럴 타입으로 추론합니다.

// 두번쨰는 const 로 만드는 것입니다. const 는 재할당이 불가능하므로 리터럴 그대로 추론합니다.
const lang = "english";
stringLiteralUnion(lang);

// 튜플을 사용할때에도 문제가 발생할 수 있습니다.
function panTo(where: [number, number]) {
  //...
}

panTo([10, 20]); // OK

const panVar = [10, 20];
panTo(panVar); // 해당 number[] 변수의 길이를 특정할 수 없습니다.

// 타입을 명시하여 해결할 수 있습니다.

const panpan: [number, number] = [10, 20];
panTo(panpan);

// 이미 const 를 사용하여 변수를 선언 했지만 에러가 발생하고 있으므로 다른 방법이 필요합니다.
// 개발자는 해당 변수가 변하지 않을것이라는 단언을 할 수 있습니다.
const panpan2 = [10, 20] as const;
// readonly 가 되어 할당할 수 있을것 같지만 readonly [number, number] 는 일반적인 [number ,number]보다 좁은 범위 이므로
// 할당할 수 없습니다.
panTo(panpan2);

// as const 와 함께 해당 함수의 파라미터를 readonly 라고 수정 할 수 있습니다.
function fanTo(where: readonly [number, number]) {
  //...
}
fanTo(panpan2);

// 객체에서 발생하는 문맥적 오류에 대해서 알아보겠습니다.
type StringLang = "JavaScript" | "TypeScript";

interface Go {
  language: StringLang;
  organizaion: string;
}

function complain(government: Go) {
  //...
}

complain({ language: "JavaScript", organizaion: "W3C" }); // OK

const langObj = {
  language: "JavaScript",
  organizaion: "W3C",
};

const langObj2 = {
  language: "JavaScript",
  organizaion: "W3C",
} as const;

complain(langObj); // language 타입이 일치하지 않습니다.
complain(langObj2); // as const 를 사용해서 해결 할 수 있습니다

// 콜백 사용시의 주의점
function needSomeCallback(callback: (x: number) => void) {
  //...
}

needSomeCallback((x) => {}); // 함수 선언에서 명시된 대로 x 를 넘버로 추론 합니다.

// 이때 콜백을 상수화 시킨다면 어떻게 될까요.
function thisIsCallback(a) {} // 타입을 any 로 추론합니다.

needSomeCallback(thisIsCallback); // any 타입을 가지기 때문에 타입체크를 무시합니다.

// 이때는 콜백함수의 인자에 타입을 명시함으로써 해결할 수 있습니다.
function thisIsCallback2(a: number) {}
needSomeCallback(thisIsCallback2); // OK

// 요약 
// 타입 추론에서 문매깅 어떻게 쓰이는지 주의해서 살펴봐야 합니다.
//  변수를 별도로 뽑아서 선언 했을때 오류가 발생한다면 타입선언을 추가해야합니다.
// 변수가 정말로 상수라면 as const 를 고려해 볼만 합니다. 그러나 이렇게 사용하면 선언한 곳이 아닌 사용하는곳에서오류가 발생합니다. 
