// Item 25
// Page : 136 비동기 코드에는 콜백 대신 async 함수 사용하기

// ts 는 브라우저에서 읽을 수 있는 언어가 아닙니다. 따라서 ts 를 브라우저에서 사용하려면 자바스크립트로의 트랜스파일이 필요합니다.
// 이때 async 와 await 와 같은 비교적 최근의 문법은 그 이전의 자바스크립트 버전에 대해서 작동하지 않지만 타입스크립트는 이를 동작하도록 정교한
// 트랜스파일을 해냅니다.

// 콜백보다 프로미스나 async / await 를 사용해야 하는 이유는 다음과 같습니다.
// 콜백보다 프로미스가 코드를 작성하기 쉽습니다.
// 콜백보다 프로미스가 타입을 추론하기 쉽습니다.

// 참조: 이 아이템의 전반부는 자바스크립트 문법을 다루고 있으므로 예시를 생략하였습니다 .

// 비동기 함수에 async 를 사용하는 이유는 두가지가 있습니다.
// 대체적으로 더 간결한 코드가 됩니다.
// async 함수는 프로미스를 반환하도록 강제됩니다. (무조건 프로미스를 반환합니다.)

async function promisedNumber(num: number) {
  return num;
} // 비동기적 작업 없이도 리턴타입이 프로미스입니다.
const arrowResult = async (num: number) => num; // 화살표 함수도 마찬가지 입니다.
const asyncResult = () => Promise.resolve(1); // async 없는 프로미스를 만들 수도 있습니다.

// 책의예시 함수가 잘못 된것 같지만 한번 적어 보겠습니다.
declare function fetchUrl(
  url: string,
  callback: (text: string) => void
): Promise<void>;
const _cache: { [url: string]: string } = {};

function fetchWithCache(url: string, callback: (text: string) => void) {
  if (url in _cache) {
    callback(_cache[url]); // 콜백 호출이 아니라 바로 캐시값을 리턴애햐 할것 같습니다. // 다음페이지에서는 바로 리턴합니다.
    // 아래에서 이 함수를 호출하는 곳에서 제공한 콜백은 requsetStatus 를 변경하는 역할을 하고 있습니다.
  } else {
    fetchUrl(url, (text) => {
      _cache[url] = text;
      callback(text); // requestStatus 를 변경하는 역할을 하고 있습니다.
    });
  }
} // 함수선언

let requestStatus: "loading" | "success" | "error";

function getUser(userId: string) {
  fetchWithCache(`https://user/${userId}`, (profile) => {
    requestStatus = "success"; // profile 을 받았지만 아무것도 하고있지 않습니다. requestStatus = profile 이 일반적일것같습니다.
  });
  requestStatus = "loading";
}

// 요악

// 콜백 보다는 프로미스를 사용하는게 코드 작성과 타입 추론에서 유리합니다.
// 프로미스를 명시적으로 생성 하기보다 async 와 await 를 사용하는것이 좋습니다.
// 어떤 함수가 프로미스를 반환한다면 async 를 선언하는것이 좋습니다.
