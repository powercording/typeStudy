// Item 41
// Page : 212 any 의 진화 이해하기

// 타입스크립트 변수의 타입은 일반적으로 변수를 선언 하면서 정해집니다.
// 이후에 타입 좁히기를 통해서 더 좁은 타입으로 정제할 수 있지만 새로운 타입이 추가되도록 확장하는것은 불가능합니다.

// 하지만 any 타입과 관련해서는 예외인 경우가 존재합니다.
// 아래 일정 범위의 숫자들을 생성하는 함수를 예로 들겠습니다.

function range(start: number, limit: number) {
  const out = []; // 처음에는 any [] 였다가
  for (let i = start; i < limit; i++) {
    out.push(i);
  }
  return out; // number [] 로 바뀐다.
}

// 위 함수에서 out 변수는 any 로 생성되었지만number 로 진화하였습니다.

// 진화하는 간단한 예시를 보겠습니다.
const result = [];
// result 는 any [] 타입입니다.

result.push(1);
result; // nuber[]

result.push("d");
result; // (string | number)[]

// 조건문의 분기에 따라 타입이 진화하는 과정도 볼 수 있습니다.

let val;

if (Math.random() < 0.5) {
  val = /hello/;
  val; // RegExp
} else {
  val = 123;
  val; // number
}

val; // RegExp | number
// 코드가 위에서 부터 평가되며 최종적으로 가질수 있는 가능성이 있는 타입을 모두 가지게 됩니다.

// any 타입의 진화는  no implicit any옵션을 사용하는 상태에서 변수의 타입이 암묵적인 any 인 경우에만 일어납니다.
// 만약 암묵적인 any 가 아니라 명시적인 any 라면 타입은 언제나  any 입니다.

let val2: any;

if (Math.random() < 0.5) {
  val2 = /hello/;
  val2; //any
} else {
  val2 = 123;
  val2; //any
}
//참고: any타입의 진화는 값을 할당하거나 배열에 요소가 추가된 이후에 일어나기 때문에 할당이 일어나는 라인에서는 any 타입이 유지됩니다.

// 암시적 any 는 값 할당 이전에 사용하려하면 오류입니다.
function range2(start: number, limit: number) {
  const out = [];

  if (start === limit) {
    return out; // 암묵적인 any 에 어떠한 진화도 일으키지 않고 리턴하려 하면 에러가 발생합니다.
  }

  for (let i = start; i < limit; i++) {
    out.push(i);
  }
  return out;
}

// 암시적인 any 는 값을 할당할때 타입진화가 일어나기 때문에 진화가 일어나기 전에 암시적 any 를 읽으려고 하면
// 에러가 발생합니다

// 함수 호출을 거치는 경우에도 암시적 any 타입은 변하지 않습니다.
function square(start: number, limit: number) {
  const out = [];

  range(start, limit).forEach((val) => {
    out.push(val);
  });

  return out
} // 이건좀신기하네요.

// 타입을 안전하게 유지하기 위해서는 any 를 진화시키는 방법보다 명시적인 타입을 사용하는것이 좋습니다.
// 일반적인 타입은 정제되어 좁혀지는반면 any 와 any[] 는 진화할수있습니다. 
// 이러한 특징을 인지하고 이해하여야 합니다.

