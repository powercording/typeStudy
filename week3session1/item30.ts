// Item 30
// Page : 166  문서에 타입 정보를 쓰지 않기

/**
 * 문자열을 반환합니다
 * 0개 또는 1개의 변수를 받습니다.
 * 매개변수가 없으면 표준 반환을 합니다.
 */
function getForegroundColor(page?: string) {
  return page === "login" ? { r: 1, g: 1, b: 1 } : { r: 0, g: 0, b: 0 };
}

// 코드와 주석 정보가 맞지 않습니다.
// 0개 또는 1개의 인자를 받는다는 정보는 타입 시그니처로 알수 있는 중복 정보입니다.
// 함수 구현체보다 주석이 더 긴느낌이 있습니다.

// 타입스크립트의 타입 구문 시스템은 간결하고 구체적이며 쉽게 읽을 수 있도록 제작되었습니다.
// 이러한 시스템 개발자들은 수십 년 경험을가진 전문가들입니다.
// 함수의 입출력과 그 타입은 코드로 작성 하는게 주석보다 더 나은방법 입니다.

// 타입 구문은 컴파일러가 체크하기 때문에 구현체와 어긋나지 않습니다.

// 변수명을 작성 할 때에도 비슷한 원칙을 적용할 수 있습니다.
const numArr = [1, 2, 3, 4, 5, 6, 7]; // 변수명에 넘버 라는 타입이 들어가는것 보다
const arrr: number[] = [1, 2]; // 타입을 명시할 수 있습니다.

// 주석과 정보에 타입 정보를 적는 것은 피해야 합니다. 타입 정보가 중복되는것을 넘어 정보에 모순이 발생할 수 있습니다.
