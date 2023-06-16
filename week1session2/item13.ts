// 아이템 13
// Page : 69 타입과 인터페이스 차이 알기

// 타입스크립트에서 타입을 정의하는 방법으로는 type 과 interface 두가지가 있다.
type Typetype = {
  name: string;
};

interface InterfaceType {
  name: string;
}

// 인터페이스 대신 클래스를 사용할 수도 있지만 클래스는 값으로도 사용 될 수 있는 자바스크립트 런타임 개념이다.
// 자바스크립트 런타임이라는 말은 자바스크립트 코드로 남아 있고, 실행에 비용이 든다는 뜻이라고 생각 할수 있을것같습니다.

// 대부분의 경우 타입을 사용하여도 되고, 인터페이스를 사용하여도 된다 .
// 그러나 차이점을 분명하게 알고, 동일한 상황에 대하여 일관적인 명명 방법을 사용하는것이 좋다.
// 이를 위해서는 하나의 타입에 대하여 타입과 인터페이스 모두로 정의 할 줄 알아야 한다.

// 아래 두 예제는 정확히 같은 동작을 하고 있다.
const sample: Typetype = {
  name: "type",
  age: 12,
};
const sample2: InterfaceType = {
  name: "interface",
  age: 12,
};

// 인덱스 시그니쳐도 모두 사용 할 수 있다.
type IndexType = {
  [key: string]: string;
};
interface IndexInterface {
  [key: string]: string;
}

// 함수의 타입도 모두 사용 할 수 있다.
type FunctionType = (a: string) => string;

interface FunctionInterface {
  (a: string): string;
}

const typeTestFunction: FunctionType = (a) => a;
const interfaceTestFunction: FunctionInterface = (a) => a;

// 위의 예제 처럼 함수타입이 간단한 경우에는 type 을 사용하는것이 더 간결하겠지만 추가적인 속성이 더 존재하는 경우는 차이가 없다.
type TypeWithProps = {
  (a: string): string;
  props: string;
};
interface InterfaceWithProps {
  (a: string): string;
  props: string;
} // 문법은 생소하지만 함수는 호출이 가능한 객체 이기 때문에 속성을 가질 수 있다.

// 제네릭 타입도 동일하게 사용이 가능하다
type GenericType<T> = {
  name: T;
};
interface GenericInterface<T> {
  name: T;
}

// 인터페이스는 타입을 확장 가능하고, 타입도 인터페이스를 확장 할 수 있다. 서로 확장 가능하며 문법이 약간 다르다.
// 인터페이스의 경우는 유니온 타입같은 복잡한 타입을 확장할 수는 없다.
type ExtendType = {
  serName: string;
} & InterfaceType;

interface ExtendInterface extends Typetype {
  serName: string;
}

type Union = "1" | "2" | "3";
interface UnionType2 extends Union {} // 인터페이스는 개체형식 또는 타입이 정적인 경우에만 확장이 가능하다.

// 클래스를 구현 할 때에 타입과 인터페이스 모두 사용가능하다.
class TypeClass implements Typetype {
  constructor(public name: string) {
    this.name = name;
  }
}
class InterfaceClass implements InterfaceType {
  constructor(public name: string) {
    this.name = name;
  }
}

// -- 위는 비슷한 점 -- 아래는 다른 점 --
// 유니온 타입은 존재하지만 유니온 인터페이스는 존재하지 않는다.
// 인터페이스는 타입을 확장 할 수 있지만 유니온타입을 확장할 수는 없다. (위의 예제 참고)

// 하지만 인터페이스에도 유니온과 같은 기능을 구현 할 수 있다.
type UnionTempType = { a: string };
type UnionTempType2 = { b: string };
interface UnionInterface {
  [key: string]: UnionTempType | UnionTempType2;
}
// 아래 예시는 인터페이스로는 표현 불가능한 예시이다.
type Named = (UnionTempType | UnionTempType2) & { name: string };
const myNamedObject: Named = {
  name: "myNamedObject",
  a: "Ds",
};

// 일반적으로 Type 키워드가 Interface 보다 쓰임새가 많음.
// 유니온이 될 수있고, 매핑된 타입 조건부타입 또는 튜플과 배열도 Type 이 더 간결하다.
type Pair = [number, number]; //튜플
type StringList = string[]; // 배열
type NamedNumberList = [string, ...number[]];

// Interface 로도 튜플과 유사한 구현이 가능하다.
interface PairInterface {
  0: number;
  1: number;
  length: 2;
}
const pair: PairInterface = { "0": 1, "1": 2, length: 2 };
const pairArray: PairInterface = [1, 2];
// 아래와 같은 형식 이 가능하기 때문에 위코드가 가능할거라 예상함.
// pairArray 의경우 실제 값은 배열이 할당 되었지만 타입으로 인하여 튜플 매서드가 사용 불가능하다.
type qwer = (typeof pairArray)["0"];
type reqw = PairInterface["0"];

// 인터페이스에서는 인터페이스 보강이 가능하다.
// 같은 인터페이스 이름으로 여러번 선언하면 기존에 선언된 인터페이스를 확장한다.
interface Augment {
  email: string;
}
interface Augment {
  password: string;
}
interface Augment {
  name: string;
}
const augment: Augment = {
  email: "email",
  password: "password",
  name: "name",
}; // 선언 병합이라고도 한다.

//추후에 다룰 타입 선언 파일에서는 타입 보강을 위해서 반드시 인터페이스를 사용해야 하며 표준을 따라야 함
// 타입 선언에는 사용자가 채워야 하는 빈틈이 있을 수 있는데 선언 병합이 바로 그렇다.

// 타입 스크립트는 여러 버전의 자바스크립트 표준 라이브러리에서 타입을 모아 병합을 실행한다.
// 예로 Array interface 는 lib.es5.d.ts 에 정의되어 있고 기본적으로느 여기에 선언된 인터페이스가 사용된다
// 만약 tsconfig.json 의 lib 목록에 ES2015 를 추가하면 lib.es2015.d.ts 에 선언된 인터페이스를 병합 한다.
// 이런 병합으로 ES2015 의 find 같은 메서드를 사용 할 수 있게 된다.
// 결과적으로 여러 버전의 인터페이스들이 병합되어 하나의 인터페이스를 가지게 된다.

// 복잡한 타입이라면 타입별칭을 사용하면 된다.
// 간단한 타입이라면 일관성과 보강의 관점에서 타입과 인터페이스를 선택하면 된다.
// 아직 스타일이 확립되지 않은 프로젝트는 향후 보강의 가능성을 고려해야한다.
// API 의 경우 인터페이스를 사용하면 API 가 변경 될 때 보강을 통해서 새로운필드를 병합할 수 있다.
// 그러나  프로젝트 내부적으로 사용하는 타입 (이라고 적혀있지만 인터페이스를 말하는 것 같음) 에
//  선언 병합이 일어나는것은 잘못된 설계일수 있으므로 이럴때는 타입사용을 고려해야한다.
