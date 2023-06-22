// Item 22
// Page : 123 타입 좁히기

// 타입 좁히기의 가장 일반적인 예시는 null check 일 것입니다.

const myElement = document.getElementById("intro"); //타입이 HTMLElement | null 입니다.

// 이때 개발자가 엘리먼트에 접근하려면 먼저 null 이 아닌지 체크해야 합니다.
if (myElement) {
  myElement.innerText = "Hello!"; // 타입이 HTMLElement 입니다.
} else {
  alert("There is no element #intro");
}

// if 를 통해 myElement 가 null 인지 체크하였으므로 해당 분기를 통과하면 myElement 는 null 이 아닌 HTMLElement 타입이 됩니다.
// 이렇게 타입을 좁히는것을 타입 가드 또는 타입 좁히기 라고 합니다.

// 같은 if 블록 안에 속하지 않더라도 아래와 같은 방식으로 타입을 좁힐 수도 있습니다.
if (!myElement) {
  throw new Error("There is no element #intro");
}
// 지금부터 myElement 는 null 이 아닌 HTMLElement 타입입니다. null check를 통과하지 못하였다면 코드는 아래로 진행하지 않을 것이기 때문입니다.
myElement.innerText = "Hello!"; // 타입이 HTMLElement 입니다.

// instanceof 를 사용하여 타입을 좁힐 수도 있습니다.
function cotains(text: string, search: string | RegExp) {
  if (search instanceof RegExp) {
    return !!search.exec(text); // 타입이 RegExp 입니다.
  }
  return text.includes(search); // 타입이 string 입니다.
}

// 객체의 속성을 체크하여 타입을 좁힐 수 있습니다.
type ObjA = { a: number };
type ObjB = { b: number };

function tsStudyObjChecker(a: ObjA | ObjB) {
  if ("a" in a) {
    console.log(a.a); // 타입이 ObjA 입니다.
  } else {
    console.log(a.b); // 타입이 ObjB 입니다.
  }
  a; // 타입이 ObjA | ObjB 입니다.
}

// isArray 와 같은 함수로도 타입을 좁힐 수 있습니다.

// 타입스크립트의 잘못이 아닌 개발자의 착각으로 타입 좁히기를 실수할수도 있습니다.
const myElement2 = document.getElementById("intro"); // 타입이 HTMLElement | null 입니다.
if (typeof myElement2 === "object") {
  myElement2.innerText = "Hello!"; // 타입이 좁혀지지 않았습니다.
} // 개발자는 null 타입이 null 일거라 예상했지만 typeof null 은 "object" 입니다.

// 기본형 타입에 대한 실수도 일어날 수 있습니다. ㅇ
function basicTypeMistake(x: string | number | null) {
  if (!x) {
    // null check 를 시도했지만
    x; // 0 또는  ""(빈문자열) 도 false 이기 때문에 타입이 좁혀지지 않았습니다.
  }
}

// 태그된 유니온 (type 또는 tag 역할을 하는 속성을 가지는 interface 를 사용합니다.)
interface TagedUnionA {
  type: "school";
  where: string;
}
interface TagedUnionB {
  type: "company";
  where: string;
}
type TagedUnion = TagedUnionA | TagedUnionB;

function TagedUnionCheck(union: TagedUnion) {
  if (union.type === "school") {
    union.where; // 타입이 TagedUnionA 입니다.
  } else {
    union.where; // 타입이 TagedUnionB 입니다.
  }
}

// 커스텀 타입가드
// 만약 타입 좁히기를 통해 타입식별을 하지 못한다면 커스텀 타입 가드를 통하여 ts 에게 정보를 줄 수 있습니다.

function tsStudyTypeGuard(union: TagedUnion): union is TagedUnionA {
  return union.type === "school";
} // 리턴 값이 참 일 경우 타입이 TaggedUnionA 라는 것을 ts 에게 알려줍니다.

function typeGuardUsage(union: TagedUnion) {
  if (tsStudyTypeGuard(union)) {
    union.where; // 타입이 TagedUnionA 입니다.
  } else {
    union.where; // 타입이 TagedUnionB 입니다.
  }
}

// 타입이 생각처럼 잘 좁혀지지 않는 경우가 있습니다.
const fruits = ["apple", "banana", "orange"];

const myFavorit = ["apple"].map((apple) => {
  return fruits.find((f) => f === apple);
}); // 타입이 string|undefined[] 입니다.

//타입가드 추가
function isNotUndefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

const realMyFavorit = ["apple"]
  .map((apple) => {
    return fruits.find((f) => f === apple);
  })
  .filter(isNotUndefined); // 타입이 string[] 입니다.
