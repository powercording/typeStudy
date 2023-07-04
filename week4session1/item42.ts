// Item 42
// Page : 216 모르는 타입에는 any 대신 unknown을 사용하기

// 언노운 타입은
// 1.함수의 반환값과 관련된 형태
// 2.변수의 선언과 관련된 형태
// 3.단언문과 관련된 형태
// 가 있습니다.

// 어떠한 함수의 반환값이 any 인것은 좋지 못한 설계입니다.
// 차라리 호출하는 곳에서 반환값을 원하는 타입으로 받게 하는것이 낫습니다.
// 1함수에 반환에 대한 언노운
function parseYAML(yaml: string): any {
  // ...
}

interface Book {
  name: string;
  author: string;
}

const books: Book = parseYAML(`
name : Wuthering Heights
author : Emily Brontë
`); // 파스야믈의 결과가 any 이지만 Book타입을 지정해줘서 아래 얼럿함수의 참조에러가 발생합니다.
alert(books.title);

const book = parseYAML(`
name: Jane Eyre
author: Charlotte Brontë
 `);
alert(book.title); // 에러가 발생해야하는 코드지만 이 코드는 런타임에 참조에러를 발생시킵니다.

// 이러한 상황에 paseYAML 함수의 반환값을 unknown 으로 지정하면 조금더 안전핱 코드를 작성할수있습니다.
function parseYAML2(yaml: string): unknown {
  return parseYAML(yaml);
}

const pook = parseYAML2(`
name: Jane Eyre
author: Charlotte Brontë
  `);

alert(pook.title); // 타입이확실하지 않은 경우에 차라리 이런 에러가 낫습니다.

//참조:
// any // unknown // never
// any 는 어떠한 타입도 any 타입에 할당할수 있습니다 / 어떠한 타입으로도 할당 가능합니다.
let anyA: any;
let anyB: any = 3;
let anyC: string = "하이";
anyA = anyC; // 스트링 타입을 any 에 할당.
anyC = anyB; // any 타입을 스트링에 할당.

// unknown 은 다른 어떠한 타입도 unknown에 할당할수 있습니다. / unknwon 은 unknwon 과 any 로만 할당할수 있습니다.
let unknownA: unknown;
let unknownB: unknown = 3;
let unknownC: string = "하이";
unknownA = unknownC; // 스트링 타입을 unknown 타입 에 할당.
unknownC = unknownA; // unknown 타입을 스트링타입에 할당 불가.
unknownA = unknownB; // unknown 타입을 unknown 타입에 할당 가능.

// never 는 다른 어떠한 타입도 never 에 할당할수 없습니다./ never 는 다른 어떠한 타입으로도 할당 가능합니다.
let neverA: never;
let neverB: never = 3;
let neverC: string = "하이";
neverA = neverC; // 스트링 타입을 never 타입 에 할당 불가.
neverC = neverA; // never 타입을 스트링타입에 할당 가능.

// 한편 unknown 타입을 사용하거나 읽으려 하면 오류가 발생하기 때문에 적절한 타입으로 변환하도록
// 강제할수있습니다.

const cook = parseYAML2(`
name: Jane Eyre
author: Charlotte Brontë
`) as Book; // 개발자의 입장에서 반환값을 Book 으로 기대하고 만든것이기 때문에
// 단언 사용에 대한 문제는 없다고 볼수도 있다고합니다 //참조: 이런걸 문법설탕이라고 하나요?
// 그리고 단언이 사용되었다하여도 여전히Book 타입기준으로 추론되기 때문에, Book 타입에 대한 타입체커와 타입시스템 등을 활용가능합니다.

// 2 변수에 대한 언노운
// 다음 인터페이스에서 properties 는 아무런 값이나 전부 담기에 언노운을 사용합니다.
interface FFeatures {
  properties: unknown;
  id?: string | number;
  geometry: Geometry;
}

// 타입단언  (as) 만이 언노운에서 다른타입으로 변환하는 유일한 방법은 아닙니다.

//instanceof
function processValue(val: unknown) {
  if (val instanceof Date) {
    // val은 Date 타입으로 추론됩니다.
    return val.toISOString();
  }
}

// 사용자 정의 타입가드
function isBook(val: unknown): val is Book {
  return (val as Book).author !== undefined;
}

function processValue2(val: unknown) {
  if (isBook(val)) {
    // val은 Book 타입으로 추론됩니다.
    val;
  }
}

// unknown 타입의 범위를 좁히거나 다른타입으로의 변환을 위해서는 많은 노력이 필요합니다.
// 만약 in 연산자를 활용하려면 먼저 변수가 객체임을 확인 해야 하고 typeof null 또한 객체이기 때문에 널체크도 하여야합니다.

//참조: 아래문단 이해안됨.
// 언노운 타입을 대신해서 제네릭을 사용하기도 합니다.
function parseYAML3<T>(yaml: string): T {
  return parseYAML(yaml);
}
// 제네릭타입을 사용하는것은 단언과 달라보이지만 기능적으로 동일합니다 ?
// 단언과 기능적으로 동일하기 때문에 unknown 을 반환하고, 사용자가 직접 단언을 사용하거나 원하는대로 타입을 좁히는게 더 좋습니다?

// 3. 단언과 관련된 unknown
// 이중단언

declare const foo: Foo;
let barUnknown = foo as unknown as Bar;
let barAny = foo as any as Bar; // 언노운 자리에 any 가 올수도 있습니다.

// barAny 와 barUnknown 은 기능적으로 동일하지만 나중에 두개의 단언문을 분리하는 리팩터링시 언노운이 더 안전합니다.
// 질문: 단언문 분리?

// any 의 경우 단언문 분리시 그 영향력이 너무 크게 퍼지게 되므로 분리되는 순간 에러가 발생하는 언노운이더 안전하다고 합니다.

// unknown 과 비슷하지만 약간 더 좁은타입인 object 와  {} 가 있습니다.
// {} 는  null 과 undefined 를 제외한 모든 값을 포함합니다.
// 모든 비 기본형 타입으로 이루어집니다. 객체와 배열이 포함됩니다.
const meAndYou: {} = 3; // 질문: ????? 3은 기본형타입이라 위 설명이 안맞는게 아닌가요??

//unknown 이 등장하기 전에는  {} 가 더 일반적이었습니다. 최근에는 {} 를 사용하는 경우가 꽤 줄어들었습니다.
// 정말로 null 과 undefined 가 불가능한 경우에만 {} 를 사용합니다.

// 요약
// unknown 은 any 대신 사용할수있는더 안전한 타입입니다.
// 또한 언노운은 사용자의 타입단언이나 타입체크를 강제할수있으므로 이러한 행동을 원한다면 사용할수있습니다.
// {} unknown object 의 차이를 알아야 합니다.
