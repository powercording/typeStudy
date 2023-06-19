import express from "express";
const app = express();

// 3장 타입 추론
// Item 19
// Page : 107 추론 가능한 타입을 사용해 장황한 코드 방지하기

// 타입스크립트가 타입을 위한 언어이기 때문에 변수를 선언 할 때마다 타입을 명시해야 한다고 생각할 수 있다.
// 하지만 타입스크립트는 타입을 명시하지 않아도 타입을 추론 할 수 있습니다.

let x: number = 3;
let y = 3; // 타입을 명시하지 않아도 타입스크립트가 추론합니다.

// 타입 추론이 잘 작동한다면 타입을 명시하는것은 오히려 코드를 읽기 불편하게 만들 수 있습니다.

// 더 복잡한 객체에 대한 예시입니다.
const person2: {
  name: string;
  born: {
    where: string;
    when: string;
  };
  died: {
    where: string;
    when: string;
  };
} = {
  name: "Buddy",
  born: {
    where: "Mississippi",
    when: "1910-09-26",
  },
  died: {
    where: "New York",
    when: "1986-09-24",
  },
};

//타입을 생략하고 아래와 같이 작성할 수 있습니다.
const person3 = {
  name: "Buddy",
  born: {
    where: "Mississippi",
    when: "1910-09-26",
  },
  died: {
    where: "New York",
    when: "1986-09-24",
  },
}; // 위의 타입명시된 객체와 같은 타입입니다.

// 함수가 반환하는 타입도 추론할 수 있습니다.

function computeArr(nums: number[]) {
  return nums.map((num) => num * 2);
}

const computedArr = computeArr([1, 2, 3]); // number[] 타입을 반환합니다.

// 개발자의 생각 보다 더 정확하게 추론하려 합니다.
const axis1: string = "x"; // number 타입을 추론합니다.
const axis2 = "Y"; // string을 예상했지만 Y가 더 정확한 범위의 추론입니다.

// 리팩토링시에도 타입 추론이 유용하게 쓰일 수 있습니다.
interface Product {
  id: string;
  name: string;
  price: number;
}
// interface Product {
//   id: number;
//   name: string;
//   price: number;
// }

function logProduct(product: Product) {
  const id: string = product.id;
  const name: string = product.name;
  const price: number = product.price; // 불필요한 타입 명시
  console.log(id, name, price);
}

// 만약 id 를 number 타입으로 변경하려고 한다면 함수는 에러를 발생시킬것입니다.
// 타입 명시 없이 비구조화 할당으로 변수를 꺼내 사용 할 수 있습니다.

function logProduct2(product: Product) {
  const { id, name, price } = product;
  console.log(id, name, price);
} // Product 인터페이스의 속성 타입이 변경된다 하더라도 추론으로 인해 오류를 발생시키지 않습니다.

// 비구조화 할당 이후에 타입을 명시하면 코드가 번잡해질 수 있습니다.
function logProduct3(product: Product) {
  const { id, name, price }: { id: string; name: string; price: number } =
    product;
  console.log(id, name, price);
}

// ts 가 타입 추론을 하기에 정보가 부족한 경우 타입추론이 완벽하지 않을 수 있습니다.
// 이럴때는 명시적인 타입 구문이 필요합니다 ex) product: Product

// 어떤 언어들은 매개변수의 최종사용까지 고려하여 타입을 추론 하지만 타입스크립트의 변수 타입은 등장시점에서 결정됩니다.

// 이상적인 타입스크립트 코드는 함수/메서드 시그니처에 타입 구문을 포합 하지만
// 함수 내의 지역변수에는 타입 구문을 넣지 않습니다.  타입구문을 생략하여 코드를 간결하게 유지합니다.

// 매개변수의 기본값으로 매개변수 타입을 추론하기도 합니다.

function paramAutoType(item = 3) {} // item 의 타입은 number 입니다.

// 타입 정보가 있는 라이브러리에서는 콜백 함수의 매개변수 타입은 자동으로 추론됩니다.
app.get("url", (req, res) => {}); // req, res 의 타입은 express 라이브러리에서 추론됩니다.))

// 타입 추론이 가능함에도 여전히 타입을 명시 하고 싶을 수 있습니다.
// ex 객체 리터럴
const element: Product = {
  id: "1",
  name: "name",
  price: 1000,
};
// 이런 리터럴 정의에 타입을 명시하면 잉여속성 체크가 동작합니다.잉여 속성 체크는 개발자의 오타를 잡아 낼 수 있습니다.
// 그리고 변수의 사용 시점이 아닌 할당 시점에 오류를 잡아줍니다.

// 만약 위 변수에서 타입 구문을 제거하면 할당 시점이 아닌 사용 시점에 에러가발생 합니다.

// 함수의 타입도 추론 가능하지만 반환타입을 명시하면 함수를 호출 한곳 에서 오류를 방지 할 수 있습니다.

const cache: { [ticker: string]: number } = {};
function getStock(ticker: string) {
  if (ticker in cache) {
    return cache[ticker];
  }
  return fetch("url")
    .then((res) => res.json())
    .then((data) => {
      cache[ticker] = data;
      return data;
    });
} // 해당 코드는 promise 또는 number 를 리턴 하므로 캐시를 리턴할때는 Promise.resolve(chache[ticker]) 를 사용해야 합니다.
// 이러한 문제는 작성 시점이 아닌 호출 시점에 문제를 일으킵니다.

// 아래 주석 해제
// getStock("aapl").then((price) => {console.log(price)} 
// number 에는 than 이 없습니다.
// 이럴때 명시적인 반환타입을 사용하면 구현부분에서 오류를 발견 할 수 있습니다.

function getStock2(ticker: string): Promise<number>{
  if (ticker in cache) {
    return cache[ticker];
  }
  return fetch("url")
    .then((res) => res.json())
    .then((data) => {
      cache[ticker] = data;
      return data;
    })
  },

  // 오류를 표시해 주는 이점 외에도 반환타입을 명시해야 하는 이유가 더 있습니다. 

  // 반환 타입을 명시하면 함수에 대해서 더 잘 알수 있습니다. 반환타입을 명시하려면 함수를 구현하기 전에 입력과 출력타입에 대하여
// 알아야 합니다. 입력과 출력타입을 안다면 구현부분이 조금 바뀌더라도 시그니쳐는 바뀌지 않습니다. 
// 이렇게 미리 타입을 정해놓는 함수 구현은 테스트 주도 개발과 닮았습니다.
// 전체 시그니처를 미리 정의하면 구현에 따라 시그니처가 마구잡이로 정해지는 것이 아닌 의도대로 작성 할수 있습니다.

// 다른 이유로는 명명된 타입을 사용하기 위해서 입니다. 
interface NewVector2D {
  x: number;
  y: number;
}
function calc (a: NewVector2D, b: NewVector2D) {
  return {
    x: a.x + b.x,
    y: a.y + b.y
  }
} // 입력은 NewVector2D 이지만 출력은 {x: number, y: number} 입니다.
// 추론된 타입이 복잡해 질수록 명명된 타입을 제공하는 이점이 커집니다.
type NewVector2D_19 = (x: NewVector2D, y: NewVector2D) => NewVector2D;
const calc2 : NewVector2D_19 =  (a, b) => {
  return {
    x: a.x + b.x,
    y: a.y + b.y
  }
} // calc2 함수의 시그니처는 복잡하지만 calc 함수의 시그니처는 간단합니다.

// 타입스크립트가 타입을 추론 할수있다면 타입구문은 생략하는게 좋습니다.
// 이상적인 경우 함수와 메서드의 시그니처에는 타입구문이 있지만 지역변수에는 타입구문이 없습니다.
// 추론이 가능한 경우에도 객체 리터럴이나 함수 반환타입은 타입 명시를 고려해 볼만 합니다. 
// 이는 코드를 호출하는부분이 아닌 구현부에서 미리 오류를 잡아낼 수 있기 때문입니다.