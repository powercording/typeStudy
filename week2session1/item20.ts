// Item 20
// Page : 16 다른 타입에는 다른변수 사용하기

let count: number = 3;
count.toFixed(2);

count = "3"; // number 타입에 스트링을 할당 하려하니 에러가 발생합니다.

// 변수는 값은 바뀔 수 있지만 타입은 바뀌지 않는다는 중요한 관점을 알 수 있습니다.

let otherCount: number | string = 3;
otherCount.toFixed(2);

otherCount = "3";
otherCount.toUpperCase();

// 유니온 타입을 사용하여 변수의 타입이 바뀔수 있지만
// 유니온 타입을 사용하게 되면 변수가 사용되는 곳마다 해당 변수가 어떠한 타입인지 검사하는 과정을 거쳐야 합니다.

// 차라리 새로운 변수에 할당하는것이 낫습니다.
const lastCount: number = 3;
const stringCount: string = "3";

// 이렇게 되면 변수 선언에 const 를 사용하여 코드를 좀더 안전하게 유지할 수 있습니다.
// 유니온 타입처럼 예상하기 복잡하지 않고 간결한 타입을 가집니다.

// 가려지는 변수 ex
const myId: number = 123;

function myFunction() {
  const myId: string = "abc";
  console.log(myId);
}
// 함수블럭 안에 있는 myId 는 전역 myId 와 관련이 없기 때문에 타입 체커 에게는 문제가 없습니다.
// 하지만 서로 다른 역할을 하는 변수가 이름이 같다면 사람에게는 헷갈릴 수 있습니다.
// 다른 타입, 다른 역할을 하는 변수는 다른 이름을 사용하는것이 좋습니다.
