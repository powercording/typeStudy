// item 51 의존성분리를 위해 미러타입사용하기
// Page : 251

// 의존성이 환경마다 다를 수있는 어떠한 함수를 배포한다고 가정해보겠습니다.
// 다음함수의 인자로 들어가는 타입중 buffer는 노드환경의 타입입니다.

function parseCSV(content: string | Buffer): { [column: string]: string }[] {
  // ...
  return [];
}

// 해당 Buffer 타입은 @types/node 에 의존하기 때문에 devDependencies 에 포함해야 하며
// 이러한 방식은 다음 그룹의 사용자에게 문제가 있습니다.

// @types 와 상관없는 자바스크립트 개발자
// Node 와 상관없는 웹 타입스크립트 개발자.

// 따져보면 Buffer 에 대한 타입은 타입스크립트 사용자이면서 Node 개발자에게만 필요한 디펜던시 입니다.

// 구조적 타이핑을 잘 이용한다면 이러한 문제를 해결할수 있습니다.
// Buffer 타입에 있는 tostring 매서드를 사용하는 부분을 추출하여 별도의 함수로 분리합니다.

interface CsvBuffer {
  toString(encoding: string): string;
}

function parseCSV2(
  content: string | CsvBuffer
): { [column: string]: string }[] {
  return [];
}
 // CsvBuffer 인터페이스는 실제 Buffer 인터페이스보다 훨씬 짧으면서도 필요한 부분만을 떼네어 명시하고 있습니다.
 // 또한 구조적 타이핑으로 해당 메서드가 Buffer 내에 존재하기 때문에 Node 환경에서 실제 parseCSV 함수 호출이 가능합니다.

 // 만약 작성하는 라이브러리가 기능과는 무관하게 타입에만 의존한다면, 필요한 선언부만 추출하여 라이브러리에 포함시키는 
 // 방법 (미러링) 을 고려해 볼수있습니다.

 // 만약 이런 미러링이 많아진다면 차라리 그냥 @types 의존성을 추가하는게 나은 상황도 있습니다.

 // 요약
 // 의존성이 정말로 필수적인지, 구조적 타핑등을 통해서 우회할수잇는 방법이 있는지 생각해봐야합니다.
 // js 사용자가 @types 의존성을 가지지 않게할수있는 방법을 찾아 봐야 합니다. 마찬가지로 웹 개발자가 node 관련 의존성을
 // 가지진 않을지 생각해봐야합니다.