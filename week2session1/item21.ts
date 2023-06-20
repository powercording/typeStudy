// Item 21
// Page : 118 타입 넓히기

// 자바스크립트의 런타임 시점에 변수는 유일한 값을 가집니다.
// 그러나 타입스크립트의 타입 검사 시점에는 변수는 할당 가능한 값들의 집합과 같습니다 .

// 개발자가 변수를 초기화 할 때 타입을 명시하지 않으면 타입스크립트는 할당된 값을 가지고 타입을 추론해야 합니다.
let hello = "world";
// 더 자세히 말하자면 할당된 값으로부터 할당 가능한 타입들의 집합을 유추 함을 의미합니다.

function showDirection(way: "left" | "right" | "up" | "down") {
  console.log(way);
}

let left = "left";
showDirection(left); // 개발자는 left 변수의 타입을 left 로 생각할 수 있지만 추론된 타입은 string 입니다.
// const 를 사용하여 할당하면 정확하게 타입을 "left" 로 추론해냅니다.

const mixed = ["x", 1];
// 위 변수는 추론 가능한 타입이 많습니다.
// ("x" | 1)[]
// ["x" | 1]
// [string | number]
// readonly [string | number]
// (string | number)[]
// readonly (string | number)[]
// [any, any]
// any[]

// 자바스크립트는 타입이 명시되지 않은 변수의 타입을 유추 할 때 변수의 변화 가능성 명확성과 유연성 사이의 균형을 고려합니다.
let someOfNumber = 3;
someOfNumber = "3"; // 변수는 값은 변하되 타입은 변하지 않아야 합니다.
// 변수가 선언 된 이후로는 타입은 바뀌지 않아야 하므로 let left 의 타입은 string 으로 유지하는게 적절해 보입니다. (자바스크립트에서는 let 은 타입이 바뀔 수 있습니다.)

// 넓히기 제어
// const 사용.
const v = {
  x: 1,
}; // 객체의 경우 ts 는 객체의 프로퍼티를 let 으로 간주합니다. 그래서 x 의 타입은 1이 아닌 number 가 됩니다.
// 따라서 아래의 동작은 허용합니다.
v.x = 3;

// 하지만 아래의 동작들은 허용하지 않습니다.
v.y = 4; // 없는 속성 추가
v.x = "3"; // 다른 타입으로 재할당

// ts 는 오류를 잡기 위해서 구체적인 추론을 해야 하지만 잘못된 추론으로 인한 오류를 피하기 위해서 너무 구체적인 추론은 하지 않습니다.

// ts 가 더 정확한 추론이나 타입을 정의 할 수 있도록 도와주는 몇가지 방법이 있습니다.
// 1, 명시적으로 타입구문을 제공.
const typedV: { x: 1 | 3 | 5 } = { x: 1 };

// 2. 추가적인 문맥 제공 예를 들어서 함수의 매개변수로 값을 전달.
const tsStudySum = (a: number | string, b: number | string) => {
  if (typeof a === "string" || typeof b === "string") {
    return `${a}${b}`;
  }
  return a + b;
};
const sumResult = tsStudySum(1, 2); // 3
const stringSumResult = tsStudySum("1", "2"); // "12"
// 값을 전달해서 문맥을 제공하는게 이해가 될것 같으면서 안되는군요.

// 3. 단언문으로 const 사용
const v2 = {
  x: 1,
  y: 2,
};

const v3 = {
  x: 1 as const,
  y: 2,
};

const v4 = {
  x: 1,
  y: 2,
} as const;
