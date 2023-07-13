// item 54
// Page : 268 객체를 순회하는 노하우 (ts 에서 객체순회 노하우)

// 다음 예제는 정상적인 접근이지만 편집기에서 타입오류가 발생합니다.
const oojb = {
  one: "uno",
  two: "dos",
  three: "tres",
};

for (let key in oojb) {
  const value = oojb[key];
}

// 오류를 읽어보니 인덱스 관련한 오류이며, key 의 타입과 관련한 오류라는것을알수 있습니다.
// key 는 스트링으로 추론되는 반면 oojb 의 실제 키 는 "one" | "two" | "three" 타입으로 추론됩니다.
// key 를 더 구체적으로 명시해주어야 합니다.

let KKey: keyof typeof oojb; // oojb 는 값이기 때문에 타입공간에서 사용하기 위해 typeof 까지 붙여주어야 합니다.
for (KKey in oojb) {
  const value = oojb[KKey];
}

// 위 오류예제에서 key 가 특정한 객체를 순회함에도 실제 객체의 키가 아니라 string 으로 추론되는 이유는 무엇일까요?

interface ABC {
  a: string;
  b: string;
  c: number;
}

function foooo(abc: ABC) {
  for (const k in abc) {
    // k :string
    const v = abc[k];
  }
}
// 타입을 명시함에도 위와 같은 오류를 나타냅니다

// 위에 나타난 예제들이 왜 제대로 오류를 표시하는지 예시를보겠습니다.
const xxx = { a: "a", b: "b", c: 2, d: new Date() };
foooo(xxx);
// ABC 타입에 할당가능한 값이든 매개변수로 허용합니다. 위에서는 데이트를 값으로 가지는  d 키가 추가되었습니다.
// a,b,c속성 외에 다른 어떠한 속성이 존재할수도 있는 객체를 매개변수로 넘길수있기 때문에 키를 string 으로 추론하는게 맞습니다.

function fooooo2(abc: ABC) {
  let k: keyof ABC;
  for (k in abc) {
    const v = abc[k];
  }
}
// 위 예제에서는 ABC 타입일수도 있는 다른타입의 객체 가능성을 고려하지 않았기 때문에 const v의 타입도 string | number 로 추론됩니다.
// 런타임동작을 예상하기 어려워질수 있습니다.

// 이러한 타입 간섭 없이 간편하게 객체를 순회하기 위해서는
// Object.entries 를 사용하면 됩니다.

function fooooo3(abc: ABC) {
  for (const [k, v] of Object.entries(abc)) {
    // k : string
    // v : any
  }
}

// 이러한 순회를 할때 프로토타입의오염으로인해서 예상하지못한 키가 등장할수도 있습니다.
// 예를들어 Object.prototype.z = 3 이라는 코드가 어디선가 실행되었다면
// 모든 오브젝트 순회 코드에 z키가 등장하게 됩니다.

// 요약
// 함수의 매개변수에 쓰이는 객체에는 추가적인 키가 존재할수도 있다는 가능성을 고려해야합니다.
// 오브젝트.엔트리 는 간단하게 키와 값을 가져올수 있습니다.
