// Item 17
// Page : 93 변경 관련된 오류를 방지하기 위해 readonly 사용하기

// 자바스크립트 배열매서드의 특징으로 인해서 개발자가 의도하지 않은 변경을 일으킬 수 있습니다.
// 코드예제 입니다.
// 아래 코드에서 개발자는 배열의 담긴 숫자의 합을 구하려고 합니다. ex) 1, 1+2, 1+2+3, 1+2+3+4
// [1,2,3,4] expected output : 1,3,6,10

function arraySum(arr: number[]) {
  let sum = 0;
  let num;
  // 어레이가 빈 배열이 될 때까지 요소를 꺼냅니다.
  // 원본배열의 변형이 일어납니다.
  while ((num = arr.pop()) !== undefined) {
    sum += num;
  }
  return sum;
}

function printTriangles(number: number) {
  // 원본배열입니다.
  const numberArray = [];
  for (let i = 0; i < number; i++) {
    numberArray.push(i + 1);
    console.log(arraySum(numberArray));
  }
}

// 이때 의도한 출력 값은 1 , 3 , 6 , 10 이지만 실제 출력 값은 1,2,3,4 입니다.
// 개발자는 arr.pop() 이 원본 배열을 변형시킨다는 사실을 눈치채지 못했습니다.

// 오류의 범위를 좁히기 위해서 readonly 를 사용합니다.

function arraySum_17(arr: readonly number[]) {
  let sum = 0;
  let num;
  // 타입스크립트는 readonly 배열에 대해 변형 가능한 매서드를 제공하지 않습니다.
  while ((num = arr.pop()) !== undefined) {
    sum += num;
  }
  return sum;
}

function printTriangles_17(number: number[]) {
  return number;
}

const temp: readonly number[] = [1, 2, 3, 4, 5];
printTriangles_17(temp);

// 위 함수 예제에서 number [] 는 readonly number [] 보다 기능이 많기 때문에  readonly 타입의 서브타입이 됩니다.
// 위와 같은 이유로 인해서 변경 가능한 타입을 readonly 타입으로 할당할 수 있습니다.
// 그 반대는 불가능합니다.

// 매개변수 (인자) 를 readonly 로 선언하면 다음과 같은 일이 생깁니다.
// ts 는 매개 변수가 함수 안에서 변경이 일어나는지 체크합니다.
// 호출 부분 에서는 함수가 매개변수를 변경하지 않는다는 보장을 받게 됩니다.
// 호출하는 쪽에서 인자로 readonly 배열을 넘겨 줄 수 있게 됩니다.

// 만약 함수가 매개변수를 변경하지 않거나 변경하지 않아야 한다면 readonly 를 사용하는 것이 좋습니다.
// readonly 변수로 외부 라이브러리의 함수를 호출 할 경우에는 해당 라이브러리의 매개변수에 대한 타입 선언을 바꿀 수 없으므로 as 를 사용해야 합니다.

let curr: readonly string[] = ["1"];
curr = []; // readonly 인데 왜 변경이 가능할까요?
curr.length = 20;
curr.concat("2");

// readonly 구문이 어느 요소에 영향을 미치는지 구분할수 있어야 합니다.
// ex ) arr : readonly string[][] = [["1"],["2"]] >> "1"과 "2"를 감싸는 배열은 readonly 가 아닙니다.
const readonlyArr: readonly string[][] = [["1"], ["2"]];
readonlyArr[0].push("1");
readonlyArr.push(["3"]);
// ex ) arr2 : (readonly string[])[] = [["1"],["2"]] >> "1"과 "2"를 감싸는 배열은 readonly 입니다.
const readonlyArr2: (readonly string[])[] = [["1"], ["2"]];
readonlyArr2[0].push("1");
readonlyArr2.push(["3"]);

// 객체에 사용되는 Readonly 제네릭에서도 readonly 가 어디까지 영향을 미치는지 잘 알아야 합니다.
interface Out {
  inner: {
    x: number;
  };
}

const readonlyObj: Readonly<Out> = { inner: { x: 0 } };
readonlyObj.inner = { x: 1 }; // 얕게 동작합니다. x 라는 속성이 새로 씌워지는것이므로 오류를 표시합니다.
readonlyObj.inner.x = 1; // 허용합니다. x 속성은 그대로이기 때문입니다.

type ReadonlyOut = Readonly<Out>;
// readonly inner : {x : number}

// 인덱스 시그니쳐에 readonly 를 사용 할 수 있습니다.
let obj: Readonly<{ [key: string]: number }> = { a: 1 };
obj["2"] = 1;
obj.a = 2;


