// Item 40
// Page : 209 함수 안으로 타입 단언문 감추기

// 함수를 작성하다 보면 외부로 드러난 타입 정의는 간단하지만 내부 로직이 복잡해서 안전한 타입으로 구현하기 어려운 경우가 있습니다.
// 모든 부분이 안전하게 작성된다면 이상적이겠지만 필요이상으로 복잡해게 구성할 필요는 없습니다.
// 그러기 위한 방법으로는 함수 내부에서는 타입 단언을 하면서도 함수 시그니처를 지켜주면 됩니다.
// 다시말해 프로젝트 전반에 타입 단언이 등장하는것 보다 함수 제대로 타입이 정의된 함수 내부에서 등장하는것이 낫습니다.

// 자신의 마지막 호출을 캐시하는 함수를 만들어보겠습니다.
declare function cacheLast<T extends Function>(fn: T): T;

declare function shallowEqual(a: any, b: any): boolean;

function cacheLast<T extends Function>(fn: T): T {
  let lastArg: any[] | null = null;
  let lastResult: any;

  return function (...args: any[]) {
    if (!lastArg || shallowEqual(lastArg, args)) {
      lastResult = fn(...args);
      lastArg = args;
    }
    return lastResult;
  };
}

// 함수의 리턴값인 T 함수와 실제 반환되는 함수간의 관계를 모르기 때문에 에러를 발생시키고 있습니다.
// 반환되는 함수는 원본함수와 동일한 매개변수로 호출되고 반환값도 예상이 가능하기 때문에 타입 단언을 통해 해결할수 있습니다.

function cacheLast<T extends Function>(fn: T): T {
  let lastArg: any[] | null = null;
  let lastResult: any;

  return function (...args: any[]) {
    if (!lastArg || shallowEqual(lastArg, args)) {
      lastResult = fn(...args);
      lastArg = args;
    }
    return lastResult;
  } as unknown as T;
}
// 함수의 내부에서는 단언과 any 가 꽤 사용되었지만 함수 외부에서는 any 의 존재 여부를 알지 못합니다.

// 두 객체가 같은 함수인지 비교하는  상황을 보겠습니다.

declare function shllowObjectEqual<T extends object>(a: T, b: T): boolean;

function shllowObjectEqual<T extends object>(a: T, b: T): boolean {
  for (const [key, val] of Object.entries(a)) {
    if (!(key in b) || b[key] !== val) {
      return false;
    }
  }
  return Object.keys(a).length === Object.keys(b).length;
}
// a 객체에서 뽑아낸 키와 벨류가 b객 체에도 해당 키와 벨류로 있는지 비교하는 함수입니다만 b[key] 를 제대로 추론하지 못하는것이 문제입니다.
// 이를 해결하기 위해서는 타입 단언을 사용해야 합니다.

function shllowObjectEqual<T extends object>(a: T, b: T): boolean {
  for (const [key, val] of Object.entries(a)) {
    if (!(key in b) || (b as any)[key] !== val) {
      return false;
    }
  }
  return Object.keys(a).length === Object.keys(b).length;
} // 키가 b 에 있는지 이미 확인하고 있으므로 b as any 는 상대적으로 안전합니다.

// 요약
// 책 -> 타입선언문은 일반적으로 타입을 위헙하게 만들지만 -> 아마도 타입 단언은 일반적으로 타입을 위험하게 만들지만
// 상황에 따라 필요하기도하고 현실적인 해결책이 될 수도 있습니다. 불가피한 상황에서는 정확한 타입을 가지는 함수 안으로 감출 수 있도록 고민해봐야 합니다.
