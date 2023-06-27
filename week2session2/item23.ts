// Item 23
// Page : 127 한꺼번에 객체 생성하기

// 이 전 아이템들에서 본것과 같이 자바스크립트에서 변수의 값은 변할수 있어도, 타입은 변하지 않게 해야 합니다.
// 이러한 특징 덕에 일부 자바스크립트 패턴을 타입스크립트화 하기 쉬워집니다.

// 아래 예시는 변수에 빈 객체 리터럴을 할당하는 일반적인 자바스크립트 입니다.
const myObj = {};

// 자바스크립트에서 아래 코드는 문제도 없고 오류도 없습니다. //참조: ./item23.js 파일 1번라인
// 하지만
myObj.name = "이상돈"; // ~ '{}' 형식에 'name' 속성이 없습니다.
// 변수가 선언되고 초기화 될 때 타입스크립트는 myObj 의 타입을 {} 를 기준으로 추론하였기 때문입니다.
// {} 에는 다른 어떠한 속성도 존재하지 않습니다.

// 인터페이스를 선언하는경우는 어떨까요?
interface MyObj {
  name: string;
}
const myNewObj: MyObj = {}; // ~ 'name' 속성이 '{}' 형식에 없지만 'MyObj' 형식에서 필수입니다.

// 위와 같은 문제들은 객체를 한번에 생성하면 해결 할 수 있습니다.
const mySecondObj : MyObj= {
  name: "상돈",
};

// 만약 객체를 반드시 여러번에 걸쳐 만들어내야 한다면 as 를 사용하여 타입체커를 통과 할 수 있습니다.
const myThirdObj = {} as MyObj; // 아무 속성도 초기화 하지 않았지만 에러가 없습니다.
myThirdObj.name = "상돈"; // 나중에 속성을 추가하였습니다.

// 위와 같은 경우라도 여전히 객체는 한번에 생성하는것이 좋습니다
const myFourthObj: MyObj = {
  name: "상돈",
};

// 객체 전개연산자를 사용하여 속성을 정의하면 타입을 지정하지 않아도 추론할 수 있습니다.
interface MySpread {
  name?: string;
  age: number;
}

const mySpreadObj = {
  name: "상돈",
};

const mySpreadObj2 = { ...mySpreadObj, age: 30 }; // mySpreadObj2 의 타입은 { name: string; age: number; } 입니다.

const myFinalObj: MySpread = { ...mySpreadObj2 };

// 만약 타입 명시 없이 조건부 속성으로 추론하게끔 추가 하고 싶다면 아래와 같이 할 수 있습니다.
declare let isOptional: boolean;

const myFinalObj2 = {
  ...mySpreadObj2,
  ...(isOptional ? { gender: "male" } : {}),
};

const mySpreadObj3 = {
  ...myFinalObj2,
  ...(isOptional ? { gender: "male", location: "seoul" } : {}),
}; // 위와같이 여러 속성을 추가할수도 있습니다.  //참조: 책과 타입 예시가 다른것같습니다. Page: 130

