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
