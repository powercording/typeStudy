// Item 38
// page : 203 any 타입은 가능한 좁은 범위에서만 다루기

// 타입스크립트는 다른 타입 언어와 다르게 타입이 선택적이고 점진적입니다.
// 이러한 특징으로 자바스크립트를 타입스크립트로 마이그레이션 할 수 있으며
// 이 과정에서 any 가 유용하게 쓰일수 있습니다.

// 반면에 any 는 남용하게 될 경우 타입스크립트의 장점을 잃게 됩니다.
// 이번 5장에서는 any 의 장점이나 현명하게 사용하는 방법에 대해 알아보겠습니다.

type Bar = "bar";
type Foo = "foo";

function expressionReturningFoo(): Foo {
  return "foo";
}
function progressBar(bar: Bar) {}

function fooBar(foo: Foo) {
  const x = expressionReturningFoo();
  progressBar(x);
}

// any 는 되도록 사용하지 않는것이 좋지만 문맥상 foo 를 bar 에 할당할수 있고, any 를 사용해야 한다면 다음 두가지 방법이 있습니다.
function anyExpression() {
  const x: any = expressionReturningFoo();
  // 추가 코드가 있을 수 있다면...
  progressBar(x); // 이 방법은 별로입니다.
}
function anyAssertion() {
  const x = expressionReturningFoo();
  // 추가 코드가 있을 수 있다면...
  progressBar(x as any); // 이 방법이 더 낫습니다.
}
// 아래 방법이 더 나은 이유는 x의 타입이 애니인것은 progressBar의 매개변수 할당부분에서만 유효하기 때문입니다
// 그러므로  expressionReturningFoo() 의 반환값을 다른 곳에서 사용할때는 any 가 아닌 Foo 로 사용할 수 있습니다.

// 만약 위쪽의 안좋은 예시로 반환이 일어난다면 상황은 더욱 안좋아 집니다.
function returningFooAsAny() {
  const x: any = expressionReturningFoo();
  return x;
} // 함수의 리턴이 any 가 되어버립니다.
function otherExpression() {
  const x = returningFooAsAny();
  x.getInstance(); // 없는 함수이며 잘못된 접근이지만 any 이므로 에러가 발생하지 않습니다.
}

// 위와 같은 상황을 방지 하기 위해서 함수의 반환타입을 추론할 수 있는 경우 반환타입을 명시해주는것이 좋습니다.
// 그렇게 하면 any 타입이 함수의 바깥으로 영향을 미치는 것을 방지할 수 있습니다.

// 객체를 생성할때도 비슷한 상황을 적용시킬 수 있습니다.
const configuratioin: Config = {
  a: 1,
  b: 2,
  c: {
    key: "value",
    // 여기서 에러가 발생했다고 가정하겠습니다 ~~ 'foo' 속성이 Foo 타입에 필요하지만....
  },
} as any // 이렇게 하지 맙시다.

const configuratioin2: Config = { 
  a: 1,
  b: 2,
  c: { 
    key: "value" as any //이렇게 합시다.
} // 이렇게하면 객체와 나머지 속성들에 대해서는 여전히 타입체크가 작동합니다.
