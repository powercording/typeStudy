// Item 34
// Page : 183 부정확한 타입보다 미완성 타입 사용하기

// 타입을 작성하다 보면 경우에 따라 타입을 더 구체적으로 혹은 덜 구체적으로 작성하게 됩니다.
// 구체적일수록 더많은 버그 잡기와 타입스크립트 도구를 활용할수 있지만 실수가 발생하기 쉽고 잘못된 타입은 타입이 없는것보다 못할수있습니다.

// Lisp (리습) 리습은 List Programming 이라고 불리는 오래된 함수형 프로그래밍 언어입니다.
// 저는 해당언어에 대한 지식을 가지고 있지 않아 아래에 리습의 문법형태에 대한 아주 기초적인 예시를 검색해보았습니다.
// ( + 2 3 ) => 5
// ( * 4 5 2 ) => 40
// ( sum 12 4 ) => 16 과 같은 형태의 문법을 사용한다고 합니다.

// 이번 차트에서는 해당 언어와 비슷한 형태의 타입을 다룬다고 생각 하겠습니다.
// 이러한 형태를 구현하기 위해서 타입을 작성하겠습니다.

type Expression01 = number | string | any[];

// 해당 타입을 가지고 구현해 보겠습니다.
const test01: Expression01[] = [
  10,
  "20",
  ["+", 2, 3],
  true,
  ["**", 4, 5, 2], // 존재하지 않는 연산자/함수 입니다.
  ["case", [">", 20, 10], "Red", "Green", "Blue"], // 3항연산자 같습니다 필요한 값보다 한개의 값이 더 많으므로 체커가 기대한 일을 하고 있지 못합니다.
  ["rgb", 255, 0, 7, 0], // 3개의 rgb 값이 필요한데 한개의 값이 더 있습니다.
  ["rgb", 255, 0, 7],
];

// 정밀도를 끌어 올리기 위해서 문자열 리터럴을 적용해보겠습니다.
type FnName = "+" | "-" | "*" | "/" | "*" | "rgb" | "<" | ">" | "case";
type CallExpression = [FnName, ...any[]];

type Expression02 = number | string | CallExpression;

const test02: Expression02[] = [
  10,
  "Red",
  true,
  ["+", 2, 3],
  ["**", 4, 5, 2], // 위에서 잡지 못한 에러를 잡아냅니다.
  ["case", [">", 20, 10], "Red", "Green", "Blue"],
  ["rgb", 255, 0, 7, 0],
]; // 위의 예시보다 한개의 에러를 더 잡을수 있습니다.

// 더 많은 오류를 잡기 위해서 다음과 같은 타입으로 작성해보겠습니다.
type Expression03 = number | string | NewCallExpression;
type NewCallExpression = MathCall | CaseCall | RGBCall;

interface MathCall {
  0: "+" | "-" | "/" | "*" | ">" | "<";
  1: Expression03;
  2: Expression03;
  length: 3;
}
interface CaseCall {
  0: "case";
  1: Expression03;
  2: Expression03;
  3: Expression03;
  length: 4 | 6 | 8 | 10 | 12 | 14;
}
interface RGBCall {
  0: "rgb";
  1: Expression03;
  2: Expression03;
  3: Expression03;
  length: 4;
}

const test03: Expression03[] = [
  10,
  "Red",
  true,
  ["+", 2, 3],
  ["**", 4, 5, 2], // 참조: 책의 오류메세지 number 형식은 string 에 할당할수없습니다(그리고 매개변수가 두개) 이지만 저는 매개변수 두개를 하면 올바른 에러를 알려줍니다.
  ["case", [">", 20, 10], "Red", "Green", "Blue"], // 이 에러를 더 잡아내었습니다.
  ["rgb", 255, 0, 7, 0], // 이 에러를 더 잡아내었습니다.
  ["rgb", 255, 0, 7],
];

// 이제 무효한 표현식 전부에서 에러를 잡아낼수 있습니다.
// 하지만 몇몇 에러가 부정확 하게 표현되고 있습니다.
// 참조: "**" 부분의 이전 에러메세지와 지금 에러메세지
// 에러는 잡아내고 있지만 에러메세지가 표현해 내는 내용은 부정확해졌습니다.
// 이러한 타입 언어 서비스는 타입체크 못지않게 중요합니다. ex)자동완성 등.

// 타입 선언의 복잡도로 인해서 버그가 발생할수도있습니다.
// 지금상태에서는 수학 연산자에 항상 2개의 매개변수만 받게 되어있습니다. 하지만 더 많거나 적은 매개변수를 받을 수 있는 연산자도 존재합니다.

const okExpression: Expression03 = [
  ["-", 1], // 단순하게 음수로 바꾸고 싶었습니다.
  ["+", 1, 2, 3], // + 는 더 많은 매개변수를 받을수있습니다.
];

// 위에 모든 과정을 거쳐 타입을 더 정밀하게 만들었지만 너무 과했고, 코드가 부정확해졌습니다.
// 일반적으로 복잡한타입은 더많은 테스트가 필요합니다. 타입을정확하게 만들려고 과한 정제를 하지말고, 테스트케이스를 추가하여 놓친것이 있는지 검사하는방법을
// 생각할수도 있습니다.

// 타입이 구체적일수록 정확도가 항상 비례하는것은 아니라는것을 생각해볼만 합니다.
