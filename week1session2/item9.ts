//아이템 9
//Page : 53 타입 단언보다는 타입 선언을 사용하기.

//타입 스크립트에서 변수에 타입선언과 값을 할당하는 방식에는 두가지가 있다.

interface Persons {
  name: string;
}
// 타입선언을 명시하는 방식.
const person: Persons = { name: "Kim" };
// as 로 타입을 단언하는 방식. 이 방식은 타입스크립트의 추론을 무시하고 단언된 타입으로 여긴다.
const asPerson = { name: "Kim" } as Persons;
// as 와 동일한 기능을 하는 문법이며 jsx 나 tsx 에서는 태그와 오해될 수 있기 때문에 잘 사용되지 않는다고 한다.
const asMe = <Person>{};

// 다음과 같은 상황에서 타입 선언을 사용하는것이 더 나은 이유가 있다.
// 인터페이스를 만족하지 못하는 경우에 에러를 표시해 준다.
const typedPerson: Persons = {};
// 타입 단언은 추론된 타입이 무엇이든 타입체크를 무시하므로 에러가 발생하지 않는다.
const asPersons = {} as Persons;

// 객체의 속성을추가 할때도 문제가 발생할 수 있다.
// 알려진 속성(선언된 속성)만을 추가 할 수 있지만 임의의 속성을 추가 할 경우 에러를 발생시킨다.
const typedPerson2: Persons = { name: "Kim", age: 20 };
// 타입 단언은 타입체크를 무시하는 이유로 해당 인터페이스를 만족하지 않아도 에러를 발생시키지 않는다.
const asPersons2 = { name: "Kim", age: 20 } as Persons;

// 아이템 11에서 나올 잉여 속성 체크는 타입 선언에서만 적용되고, 타입 단언(as) 에서는 적용되지 않는다.

// 화살표 함수의 타입은 추론된 타입이 모호할 때가 존재한다.
// ! (해당 예시는 이상하네요. 타입 추론을 Person[] 으로 기대하는건 이상합니다.) Page 54.
const people = ["Kim", "Lee", "Park"].map((name) => ({ name }));

// 따라서 함수에서 타입 선언과 단언의 차이에 대해서 알아보겠습니다.
// 화살표 함수의 리턴타입 을 명시하는 곳에 타입을 선언하여 줍니다.
// 이때 (name:Persons) 와 (name) : Persons 는 다르다는것을 이해하는게 중요합니다.
const newPeople = ["Kim", "Lee", "Park"].map((name): Persons => ({ name }));
// 화살표 함수의 리턴 타입 명시는 다음과 같이 이루어집니다 () : returnType => { }
const arrowFunction = (name: string): Persons => ({ name });

// 타입단언으로 작성한 코드는 다음과 같은 문제가 있습니다.
const asPeople = ["Kim", "Lee", "Park"].map((name) => ({} as Persons)); // 타입 체크를 무시한다.

// 최종적으로 타입선언 명시를 통해 완성되는 코드는 다음과 같습니다.
const finalPeople: Persons[] = ["Kim", "Lee", "Park"].map(
  (name): Persons => ({ name })
);

// 타입 단언 (as) 이 효과적인 경우도 있다.
// 타입스크립트는 dom에 접근하지 못하기 때문에 쿼리 셀렉터로 불러온 것이 어떠한 엘리먼트인지 알지 못한다.
// 이 경우 우리가 아는 정보가 타입스크립트가 아는 정보보다 많은 경우이므로 as를 사용하는것이 좋을 수 있다.
document.querySelector("#button")!.addEventListener("click", (e) => {
  const button = e.currentTarget; // 타입은 EventTarget 이다.
  const asButton = e.currentTarget as HTMLButtonElement; // 타입은 HTMLButtonElement 이다.
}); // 해당 코드 쿼리 셀럭터 접미사 ! 는 해당 엘리먼트가 존재한다는것 ( null 이 아님을 )을 단언하는것이다.

// 타입 단언을 사용 하더라도 타입변환을 하지 못하는 경우도 있다.
// as 가 타입 체크를 무시한다 하였지만 as 를 적용하는 두 개념이 충분히 유사하지 않은경우 오류를 발생 시킨다.
// 서로의 서브타입 인 경우에만 타입 단언을 사용 할 수 있다.
const element = document.body;
const asElemnet = element as Persons;

type numnum = number;
const tempNumber = "1" as numnum;

// 만약 타입 변환을 강제하고 싶다면 중간에 unknown 을 거쳐서 타입 변환을 해야한다.
const tempNumber2 = "1" as unknown as numnum;
