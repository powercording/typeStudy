# 아이템 1

타입스크립트는 자바스크립트의 런타임 동작 오류를 예방하기 위해서 작성 하지만 실제로 자바스크립트 동작에 문제가 없는 경우에도 에러를 표시 할 수 있으며 반대로 자바스크립트 동장에 문제가 있는 경우에 에러를 표시 하지 못 할 수도 있다.

이는 타입스크립트가 타입에 포커스 되어있는 언어이기 때문일 것이라 생각한다.

```js
// 자바스크립트 동작에 문제가 없지만 오류를 표시하는 경우
// Item 1 > page7

const a = null + 7; // 타입에러
const b = [] + 7; // 타입에러
```

```js
// 자바스크립트 오류 이지만 타입 오류를 표시하지 않는 경우
// Item 1 > page8

const names = ["alis", "bob"];
console.log(name[2].toUpperCase()); // Cannot read property 'toUpperCase' of undefined

// 위 코드는 런타임에 에러를 발생 시키지만 타입스크립트가 오류를 표시하지 않음.
```

타입스크립트의 해당 동작에 대해서 생각해보면 TS는 확실하게 타입 검사에 중점을 둔 언어라는 생각이 든다.

<br/>

# 아이템 2

- ### 타입스크립트 설정 ( tsconfig.json )

tsconfig 파일 생성 명령어

```
tsc --init
```

> noImplicitAny : 변수가 미리 정의 된 타입을 가져야 하는지에 대한 여부 Item 2 page 9

Implicit 의 사전적 의미 : 암묵적인, 분명히 표현하지 않은.  
해당 옵션이 없는 경우에는 변수에 기본적으로 암시적 any 타입이 할당된다.  
따라서 이러한 암시적 any 타입을 허용하지 않게 되면 자연스레 변수들은 정의된 타임을 가지고 있어야 하게 된다.

```ts
// no ImplicitAny 를 설정하면 모든 변수의 타입, any 도 명시적으로 작성해 주어야 한다.
function add(a: any, b: any) {
  return a + b;
}
```

타입스크립트는 타입 정보가 있을때 잘 작동하므로 처음부터 noImplicitAny 를 설정하여 개발하는것을 추천한다.

<hr/>

> strictNullChecks : 모든 타입에서 null 과 undefined 를 에러 없이 할당 할수 있는지에 대한 여부 Item 2 page 11

```ts
//strictNullChecks : false
const a: number = null;

//strictNullChecks : true
const a: number = null; // 오류
const a: number | null = null; // 허용
```

이러한 srtictNullChecks 는 null 과 undefined 관련 오류를 발결하는데 도움이 되지만 익숙하지 않은 경우에는 코드작성을 어렵게 하는 단점이 있음.  
프로젝트의 시작단계에서는 설정하는것이 좋지만 타입스크립트가 익숙하지 않다면 설정하지 않을 수도 있음.

### 제약사항 : strictNullChecks 를 설정 하기 위해서는 noImplicitAny 를 먼저 설정해야함.

<br/>

# 아이템 3

> 타입스크립트의 두가지 역할. Item 3 page 13

- 컴파일 : 타입스크립트는 타입스크립트 파일을 자바스크립트 파일로 트랜스파일 합니다.
- 타입체크 : 타입에 오류가 있는지 검사합니다.

그러나 타입스크립트는 타입에 오류가 있더라도 컴파일을 완성합니다. 실제로 타입에 문제가 있더라도 전체 어플리케이션을 실행시켜 나머지 부분을 확인하는것이 유용할 수 있습니다.  
만약 타입에 오류가 있을 때 컴파일을 하지 않으려면 tsconfig.json 파일에 다음 속성을 추가한다.  
`noEmitOnError`

<br/>

> 타입스크립트는 런타임에 타입체크를 할 수 없다. Item 3 page 15

```ts
interface Person {
  age : number
}

interface Animal {
  rece : string
}

interface Life : Person | Animal

function newFunction ( life : Life )  {
  if (life instanceof Person) {
    // life.age = ....
  }
} // Person 은 데이터가 아니라 타입 이기 때문에 컴파일 시점에 사라진다.
```

instanceof 는 런타임에 동작하는 코드 이지만 Person 은 타입이기 때문에 런타임시에 해당
instanceof 에 대입할 타입 데이터가 존재하지 않는다. 자바스크립트로 컴파일 되는 과정에서 모든 타입 표현이 삭제되기 떄문.

<br />

> 런타임에 타입정보를 유지하는 방법이 필요함. Item 3 page 15

```ts
if ("age" in life) {
  // ..
}
```

해당 방식은 타입체커가 `life` 객체의 타입을 더욱 좁게 유추할 수 있게된다.

```ts
interface Human {
  tag: "human";
  gender: string;
}

interface Animal {
  tag: "animal";
  age: number;
}

interface Life : Human | Animal

function newFunction ( life : Life ) {
  if (life.tag === 'human') {
    // life.gender = ...
  }
}
```

해당 방식은 life 객체가 될 수 있는 interface 가 공통적인 키를 가지고 있고, 키의 타입이 `string` 이나 `number` 가 아니라 **_const 한 스트링_** 이라는 특징이 있다.

<br />

> 클래스를 이용한 방법 Item 3 page 17

```ts
class Human {
  constructor(public age: number) {}
}

class Adult extends Human {
  constructor(public age: number, public tall: number) {
    supuer(age);
  }
}

type Person = Human | Adult;

function newFunction(person: Person) {
  if (person instanceof Adult) {
    // ...
  }
}
```

클래스들은 값과 타입 모두로써 존재 할 수 있게 된다. 따라서 컴파일 시점에 사라지지 않고 데이터를 유지 할 수 있게 된다. `type Person = Human | Adult` 클래스들은 타입으로써 참조 되고 있고, `if ( person instanceof Adult )` 부분에서 값으로 참조 되고 있다.

<br />

> 타입 연산은 타입스크립트가 아니라 자바스크립트 코드로 하여야 한다. Item 3 page 17

```ts
function asNumber(val: number | string): number {
  return val as number;
}
// 위 타입스크립트는 타입처커에 아무런 오류를 표시하지 않지만 아래의 자바스크립트와 같다.
function asNumber(val) {
  return val;
}
```

위와 같은 코드를 런타임 시점에 정확하게 의도한 대로 ( string 과 number 일 가능 성이 있는 변수를 항상 넘버로 변환하는 함수 ) 동작 하게 하려면 자바스크립트를 사용하여야 한다.

```ts
function asNumber(val: number | string): number {
  return typeof val === "string" ? Number(val) : val;
}
```

<br />

> 타입스크립트는 타입 수준에서만 함수 오버로드를 작성 할 수 있다. 런타임에 구현체는 하나 뿐이다.

```ts
function add(a: number, b: string): number;
function add(a: string, b: string): string;
// 두개 이상의 타입 정보가 제공 되어도, 한개의 구현체만을 생성 할 수 있다.
```

타입스크립트는 컴파일시 사라지기 때문에 타입수준에서 오버로딩이 되어도 실제 구현되는 함수는 단 하나이다.

<br>

> 타입스크립트는 비용이 0이다.

타입스크립트 타입구문은 컴파일시 모두 제거되므로 실제 실행시에 드는 비용은 없다.

<br>

# 아이템 4

> 덕타이핑

타입스크립트는 덕타이핑 구조 입니다. 만약 A 타입의 모든 속성을 만족하는 B 타입이 있다면, B는 A타입이 요구되는 곳에 할당될 수 있습니다.

> 덕타이핑으로 인한 오류

```ts
interface Axis {
  x: number;
  y: number;
  z: number;
}

const axisSquare: Axis = {
  x: 1,
  y: 1,
  z: 1,
};

for (const axis of Object.keys(axisSquare)) {
  const coord = axisSquare[string];
  // 'string' 은 Axis 의 인덱스로 사용 할 수 없...
}
```

위 코드에서 axis 변수는 axisSquare 의 키값이기 때문에 `x, y, z` 중 반드시 하나일것이라 생각할 수 있지만 컴파일러 입장에서는 덕타이핑 가능성이 있기 때문에 기대하지 않은 키값이 등장하는것을 예상하여 오류를 일으킨다.

이런 상황에서는 순회 함수 보다 모든 속성을 일일히 구하는것이 더 나을수도 있음.

```ts
function newFunction(axis: Axis) {
  return Math.abs(axis.x) + Math.abs(axis.y) + Math.abs(axis.z);
}
```
