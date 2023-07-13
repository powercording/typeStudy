// Item 48.
// Page : 239 api 주석에 TSDoc 사용하기

// 주석을 달 때 /** */ 형식이면 TSDoc 으로 기능하게 됩니다.
// 다음 아래 두가지 주석을 살펴 보겠습니다.

// 숫자 두개를 넣고 합친 결과를 반환합니다.
function manualAdd(a: number, b: number): number {
  return a + b;
} // 주석으로 함수의 동작을 유추할 수 있지만 툴팁이 제공되지 않습니다.

/**
 * 숫자를 두개 제공하면 다른 숫자를 리턴합니다.
 *
 * b = 숫자2
 * @param {number} a numer <<< 이런 방식은 잘못되었습니다 아래에서 다룹니다. 여기서는 이런 주석도 달수있다는것을 보여주기 위함입니다.
 * @returns 두 숫자를 합친숫자
 */
function tsdocAdd(a: number, b: number): number {
  return 1;
} // 툴팁이 제공됩니다.

// 함수 호출시에도툴팁이 제공됩니다.
manualAdd(1, 2);
tsdocAdd(1, 2);

// JSDOC 같은 @param 과 @return 을 사용할 수 있습니다.

// 타입정의 type / interface 에도 TSDoc 을 사용할 수 있습니다.
interface AboutMe {
  /**제 이름입니다. */
  name: "상돈";
  /** ~~가장 잘하는~~ 언어입니다. */
  skill: "자바스크립트";
}

const aboutMe: AboutMe = { name: "상돈", skill: "자바스크립트" }; // 네임 부분에 마우스오버를 하면 주석 또는 팁을 볼수있습니다.

// TSDoc 은 마크다운형식을 지원합니다. 위 객체의 skill 에 마우스 오버를 하면 마크다운이 적용된 툴팁을 볼수있습니다.

// 주석을 장황하게 쓰지 않도록합니다.
// JSDoc은 타입에 대한 규칙이 있지만 ts 는 이미 타입언어이므로 혹여내 개발자의 실수로 잘못된 타입을 제공하지 않기위해
// 타입에 대한 정보를 제공하면 안됩니다.

// 요약
// export 하려는 함수,클래스,타입 등에  TSDoc 이나 JSDoc 형식의 주석을 달아줍니다. 사용하는 곳에서 편집기가 해당 주석을 제공합니다.
// 주석에 타입정보는 제공하지 않습니다.
// 주석에 마크다운도 사용할 수 있습니다.