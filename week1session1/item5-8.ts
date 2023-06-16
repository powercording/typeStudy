// 아이템 5
// Page > 27. title: any 타입 지양하기

let random: number = 1;
random = "1"; //  타입이 명시된 변수에는 해당 타입의 값만 할당 할 수 있습니다.

let otherRandom = 1;
otherRandom = "1"; //  타입을 추론할 수 있는 경우에도 해당 타입의 값만 할당 할 수 있습니다.

random = "1" as any;
otherRandom = "1" as any; // as 는 타입 단언, 타입 형변환 같은 개념이고, any 는 타입스크립트의 모든 타입체크를 무시합니다.

//**************************************** any 타입은 함수 시그니처 ( 약속된 입력타입, 약속된 출력타입 ) 를 무시합니다.****************************************//
function sum(a: number, b: number) {
  return a + b;
}

let firstNumber: any = "1";
let secondNumber: any = "2";

// 매개변수가 any 이기 때문에 함수 호출에 에러를 발생시키지 않음. 이는 타입스크립트가 값보다 타입검사에 특화된 언어이기 때문이라 생각합니다.
sum(firstNumber, secondNumber); 

//**************************************** any 타입은 각종 편의기능이 (ex. 자동완성) 이 적용되지 않습니다. ****************************************//
const someText : any = "hello";

// 자동완성이 적용되지 않습니다. 하지만 올바른 매서드나 속성을 타이핑 할 수있다면 오류가 발생하지는 않습니다.
someText.

// 이 경우에는 toUpperCase() 가 올바른 매서드이기 때문에 런타임이나 컴파일 오류가 발생하지 않습니다.
const toUpperSomeText = someText.toUpperCase(); 

// 이 밖에도 텍스트 에디터의 각종 편의 기능이 적용되지 않습니다.

//****************************************  any 타입은 코드 리팩토링시에도 문제가 됩니다. ***************************************//
// interface Props {
//   onClick: (item: any) => void;
// } // 기존 인터페이스

function renderFunctionComponent (props: Props) {
} // 기존 랜더링 컴포넌트


let selectedId : number = 0; // 함수에서 값을 변경 할 변수

function selectId(item: any) { 
  selectedId = item.id;
} // renderFunctionComponent 함수 호출시 인터페이스에 따라 인자로 넘길 수 있는 함수

// <RenderFunctionComponent onClick={selectId} /> // 랜더링 컴포넌트 호출 (react 라이브러리를 사용한다고 가정)
renderFunctionComponent({ onClick: selectId }); // 인자로 넘길 수 있는 함수를 넘김

// 리팩토링을 진행하여 onClick 함수의 인자를 명시적으로 number 타입으로 변경하였습니다.
interface Props { 
  onClick: (id: number) => void;
}

// 이 시점에서도 selectId 함수는 any 타입을 인자로 받습니다. 따라서 리팩토링에 따른 에러를 표현하지 않습니다. 
renderFunctionComponent({ onClick: selectId })

/*********************************** any 는 타입 설계를 감춥니다. ********************************************/
// 애플리케이션 상태같은 복잡한 상태 객체를 정의하는 경우 수많은 프로퍼티를 정의해야 합니다.
// 이때 any 타입을 사용하면 객체의 상태에 대한 설계를 알 수 없게 되버립니다. 
// 다른 사람이 any 로 작성된 코드를 본다면 코드를 재구성해 봐야 할만큼 알수 없게 됩니다.


/*********************************** any 는 타입시스템 신뢰도를 떨어트립니다. ***********************************/
// 사람의 실수를 타입 체커가 미리 잡아주어야 합니다. 
// 하지만 any 를 사용함으로써 런타임에 에러가 발생한다면 우리는 타입체커를 신뢰 할 수 없을것입니다.
// any 타입을 사용하지 않음으로 인해서 런타임에 발견 될 오류를 미리 잡을 수 있고, 신뢰도를 높이르 수 있습니다.
// 어쩔 수 없이 any 를 사용 해야 하는 경우도 있을 수 있습니다. 


// 아이템 6
// Page > 33. title: 편집기를 사용하여 타입 시스템 탐색하기

// 타입스크립트의 설치시 두가지 기능을 제공합니다.
// 1. 타입스크립트 컴파일러 tsc 
// 2. 타입스크립트 서버 tsserver
//// 타입스크립트 서버 참고 url : https://velog.io/@dessin/tsserver

// 해당 챕터의 편집기란 우리가 사용하는 vscode, atom, sublime text 등의 텍스트 에디터를 말합니다.
// 이러한 텍스트 에디터 사용시 타입스크립트 서버를 지원하여 문서 작성 중에 타입스크립트의 각종 기능을 제공 받을 수 있습니다. 

let num = 10;


function add (a:number, b:number) {
  return a + b;
} // 함수 이름에 마우스를 올리면 타입을 확인 할 수 있다. 만약 리턴값이 기대한것과 다르면 리턴타입을 직접 명시하고 문제가 발생하는 부분을 찾아내야 합니다. 
 
function message (text : string | number) {
  console.log(text) // text 의 타입을 string | number 로 인식.
  if (typeof text === "string") {
    return text; // text 의타입을 스트링으로 인식.
  }
}

// 사용하는 함수에 대해서 자세히 알고 싶은 경우 커서를 위치하고 f12 또는 컨트롤 클릭.
const response = fetch("someUrl")
// 타입선언파일은은 처음에는 이해하기 어렵지만 타입스크립트가 하는일, 라이브러리의 생김새를 살펴 볼 수 있는 수단 중 하나입니다 .


// 아이템 7
// Page > 38 타입이 값들이 집합이라고 생각하기.

interface one {
  name: string;
}

interface two {
  age: number;
}

type three = one & two;

const three : three = {
  name: "kim",
  age: 10
}

// 아이템 7 임시 패스

// 타입 중 아무런 값도 받을 수 없는 타입을 never 라고 한다.
const neverType : never = 0; // never 타입은 어떤 값도 할당 할 수 없다.
const neverType1 : never = "dd"; // never 타입은 어떤 값도 할당 할 수 없다.

//그 다음으로 작은 값은 리터럴이다. 리터럴은 값 자체를 타입으로 사용한다. 유닛이라고도 부른다.
type LiteralType = "kim"; // 리터럴 타입은 값 자체를 타입으로 사용한다.
const literalType : LiteralType = "kim"; // 리터럴 타입은 값 자체를 타입으로 사용한다.
const noLiteralType : LiteralType = "lee";

//유니온 타입은 여러 타입 중 하나를 선택할 수 있게 해준다.
type UnionType = "kim" | "lee" | "park";
const unionType : UnionType = "kim";
const unionType2 : UnionType = "lee";
const noUnionType : UnionType = "choi";

// & 연산자 투 타입의 모든 타입을 가지고 있어야 한다.
type andType1 = { name : string }
type andType2 = { age : number }

type bothType = andType1 & andType2;
const bothType321 : bothType = { age :10 , name:"123"}

// 추가적인 속성이 있어도 된다고 책에 소개 되어있는데 아래가 왜 안되는지 아시는분...
const bothType2 : bothType = { age :10 , name:"123", address : "seoul"}


// 아이템 8
// Page > 46. 타입 공간과 값 공간의 심벌 구분하기 (심벌 : 이름이 같은 변수나 함수를 구분하기 위한 식별자)

// 타입스크립트 에서는 심벌(식별자) 가 두가지 공간에 존재 할 수 있습니다. 
// 1.타입 공간 , 2. 값 공간
// 심벌은 이름이 같더라도 속하고 있는 공간에 따라 다른값을 참조하거나 나타낼 수 있습니다. 

interface Home {
  password: string;
  address: string;
} // 여기에서 Home 은 타입공간에 존재하고 있습니다. 

const Home = () => {
  return "home"
} // 여기에서 Home 은 값공간에 존재하고 있습니다.
// 이름은 같지만 서로 아무런 관련을 가지고 있지 않습니다. 그렇기 때문에 값공간과 타입공간으로 인한 사용에 혼동이 있을 수 있습니다.

function homeFunction  (home: unknown) {
  if ( home instanceof Home ) {
    home.address // instanceof 는 런타임 연산자 이며 런타임에 타입은 존재하지않습니다. 따라서 여기서는 함수 Home 의 address 를 참조하려 시도하지만 에러가 발생합니다.
  }
} 

// 심벌이 타입인지 값인지 언뜻 봐서는 판단하기 알 수 없을지도 모릅니다.
// 일반적으로 type 이나 interface 뒤에 등장하는 심벌은 타입으로 여깁니다.
type A1 = 'string' 
type A2 = 123 

// 일반적으로 const 나 let 또는 function  뒤에 등장하는 심벌은 값으로 여깁니다. 
const B1 = 'string'
const B2 = 123

// 타입스크립트 플레이그라운드 https://www.typescriptlang.org/play 에서 변환된 자바스크립트를 확인하면 어떤것이 타입이고 어떤것이 값인지 알 수 있습니다. 

// as 나 : 뒤에 나오는 것은 일반적으로 타입인 반면 = 다음에 나오는 것은 값입니다. 
const typeCheck : string = "this is string"

interface Person {
  firstName: string;
  lastName: string;
}

const nobody : Person = { firstName : "Lee", lastName : "Kim" }

const numberReturn = (a: number) : number => a 

// class 와 enum 은 타입과 값 모두로 사용 될 수 있습니다. 
class Doctor {
  age = 2 ;
  name = "kim"
}

function makeDoctor (doctor : unknown) {
  if (doctor instanceof Doctor) {
    doctor.age 
    doctor
    }
} // 클래스가 타입으로 참조 될 때는 매서드와 속성이 활용되는 반면 값으로 쓰일때는 생성자가 사용됩니다.


// 연산자 중에서 값과 타입을 모두 다루는 연산자가 있습니다.
type Token = typeof Doctor // Token 은 Doctor 타입 입니다. 그러나 실제로는 인스턴스가 아니라 생성자 함수타입 입니다. 
const kindOfDoctor = typeof Doctor // kindOfDoctor 는 'function' 입니다. ( 문자열  string )

declare let fn: Token
const m = new fn();

// 위와같은 과정을 거치지 않으려면 InstnaceType 을 사용하면 됩니다.
type InstanceTypOfDoctor = InstanceType<typeof Doctor> // InstanceTypOfDoctor 는 Doctor 타입 입니다. 그러나 실제로는 인스턴스 입니다.

// 속성 접근자 타입의 속성에 접근하기 위해서는 반드시 속성 접근자인 [] 를 사용해야 합니다
// 책에서는 someObject.key 와 someObject['key'] 가 값이 동일 하더라도 타입이 다를 수 있기 때문에
//  반드시  someObject['key'] 를 써야 한다고 말하는데 무슨 말인지 잘 이해가 되지 않습니다. 
const someName : Person['firstName'] = nobody['firstName']

// 값 공간과 타입 공간에서 다른 의미를 가지는 다른 코드 패턴들이 있습니다. 

// 값공간에서 this 는 자바스크립트의 this 지만 타입 공간에서의 this 는 [ 다형성this ] 라고 불리는 타입스크립트 this 타입 입니다.
// 웹서핑 결과를 찾지 못했음.
// 값에서 & 과 |  는 And / Or 입니다. 타입스크립트에서는 인터섹션 과 유니온으로 불립니다. 

// 값에서 const 는 새 변수 선언문이지만 타입스크립트에서 as const 는 타입을 리터럴 형식으로 만듭니다. 
const asConst = ["super"] // string[] 타입
const newAsConst = ["super"] as const // "readonly" ["super"] 타입 = a모든 스트링 이 아닌 오직 'super' 만을 가지는 배열입니다.

// in 은 루프 또는 [ 매핑된 타입 ] 에 등장합니다. 
type Colors = 'red' | 'green' | 'blue';

type ColorCodes = {
  [key in Colors] : string;
}; // 타입 매핑이라고 하는것 같습니다. 

// 타입자리 와 값자리가 헷갈릴수 있다. 
function confuseTypeAndValue ({name:string, age:number}) {
  return {} 
} // 구조 분해 할당에서 키값  다음의 : 에 나오는 구문은 해당 키값을 다른 키값으로 바꿀때 사용하는 자리이다.
function typedTyepAndValue ({name, age} : {name: string, age: number}) {
  return{}
}

// 타입스크립트 코드를 읽을 때 타입인지 값인지 잘 구분 할 수 있어야 한다. 
// 모든 값은 타입을 가지지만 모든 타입은 값을 가지지 않는다. 
// class 나 enum 은 타입과 값 둘다 될 수 있다. 
// "cow" 는 문자열 리터럴 이거나 '문자열 리터럴 타입' 일 수 있다. 둘을 구분할 수 있어야 한다.