// Item 49
// Page : 243 콜백에서 this 에 대한 타입 제공하기

// js 에서 this 키워드는 혼란스럽습니다. let 이나 const 가 렉시컬 스코프 (선언된 장소의 스코프를 가짐) 인 반면,
// this 는 호출된 환경에서의 스코프를 가집니다.

// 자바스크립트 this 사용과 오류에 대한 간단한 예제를 보겠습니다.
class C {
  vals = [1, 2, 3];

  logSquares() {
    for (const val of this.vals) {
      console.log(val * val);
    }
  }
}

const c = new C();
c.logSquares(); // 이 함수 호출은 1,4,9 를 출력합니다.

const log = c.logSquares
log() // 이 코드는 런타입에 undefined의 vals를 참조할 수 없다는 오류를 일으킵니다.

// c.logSquares 는 실제로 2가지 작업을 하게 되는데
// C.prototype.logSquares 를 호출하면서 this 의 값을 c로 바인딩 합니다.

// 그러나 바로 위의 log() 호출은 logSquares 의 주소값을 통해 함수를 호출하기때문에
// this값은 undefined 로 남아있게됩니다.


// call
log.call(c) // this 를 참조할 수 있는 객체를 넘기면 정상적인 호출이 가능합니다.
// 이러한 특징으로 인해서 this 가 반드시 C 클래스의 인스턴스에만 바인딩 되어야 하는것은 아니며 어떤것이든 바인딩할 수 있습니다.
