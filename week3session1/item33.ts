// Item 34
// Page : 178 string 타입 보다 더 구체적인 타입 사용하기

// 스트링 타입의 범위는 매우 넓습니다.
// "X" , "Y" 와 같은 한글자도 스트링이며 소설 전체 텍스트도 모두 스트링입니다
// 어떤 변수가 스트링 타입이라면 그보다 더 좁은 타입이 적절하지 않은지 생각해 봐야합니다.

// 음악 앨범을 만들 기 위한 코드를 작성한다고 생각해보겠습니다

interface Album {
  artist: string;
  title: string;
  releasDate: string; // 예를들어 YYYY-MM-DD
  recordingType: string; // 예를들어 'live' or 'studio'
}

// string타입이 너무 많이 사용 되고 있으며, 주석에 대하여 타입중복이 일어나는 모습이라고 볼수도 있습니다.
// 위의 인터페이스는 다음과 같은 형식으로 구현 할수 있습니다 (잘못된 예시)

const kindofBlue: Album = {
  artist: "Miles Davis",
  title: "Kind of Blue",
  releasDate: "August 17, 1959", // 주석과 다른형식의 스트링 사용
  recordingType: "Studio", // 개발자는 대문자 S를 기대하지 않았음.
}; // 타입체커는 문제를 발생시키지 않습니다.

// 객체 속성의 타입이 스트링인 이유로 함수에 인자로 넘어 갈 때 매개변수의 순서에 대한 정확성을 잃어버립니다.

function someAlbumMaker(date: string, title: string) {}
someAlbumMaker(kindofBlue.title, kindofBlue.releasDate); // 이런식으로 매개변수의 순서가 바뀌어도 오류를 찾을수 없습니다.

// 타입을 좁혀 위의 문제를 해결해보겠습니다.
// 아티스트나 타이틀은 너무나 다양한 값이 올수 있기 때문에 string 으로 두어도 문제가 없을것 같습니다.

/**이 녹음은 어떤 환경에서 이루어 졌는지 나타냅니다. */
type RecordingType = "studio" | "Live";

interface Album2 {
  artist: string;
  title: string;
  releasDate: Date; // Date 타입으로 변경
  recordingType: RecordingType; // RecordingType 으로 변경
}

// 위와 같은 인터페이스를 가지고 이전처럼 객체를 생성하면 오류를 확인할 수 있습니다.
const kindOfRed: Album2 = {
  artist: "Miles Davis",
  title: "Kind of Blue",
  releasDate: "August 17, 1959", // 오류 발생
  recordingType: "Studio", // 오류 발생
};

const kindOfGreen: Album2 = {
  artist: "Miles Davis",
  title: "Kind of Blue",
  releasDate: new Date(),
  recordingType: "studio",
};

//위와 같은 방식의 3가지 장점을 이야기 해보겠습니다.
// 타입정보를 명시적으로 정의하였으므로 다른 곳으로 값이 전달되어도 타입정보가 유지됩니다.
// ex ) 다음과 같은 함수 선언이 가능해집니다.

// 잘못된 예시
function getAlbumOfTypes(RecordingType: string): Album2[] {} // 매개변수가 스트링이라는 너무 넓은 타입 입니다.
// 수정된 예시
function getAlbumOfTypess(recordingType: RecordingType): Album2[] {} // 매개변수에 들어올 스트링이 정확하게 무엇인지 알수 있습니다.

// 두번째 장점은 주석을 통하여 매개변수에 대한 설명을 볼수 있습니다.
// 참조: RecordingType 의 주석

// 세 번째. keyof 연산자를 활용하여 더욱 세밀한 타입체크를 할수있습니다.
// 어떤 객체로 이루어진 배열에서 한 필드의 값만 추출하는 함수를 작성한다고 가정하겠습니다.
function fluck(records: any[], key: string) {
  return records.map((r) => r[key]);
}

// 어떠한 객체로 이루어진 배열이 올지는 매번 다르기 때문에, 제네릭을 사용하는 함수로 바꾸어 보겠습니다.
function genericFluck<T>(records: T[], key: string): any[] {
  return records.map((r) => r[key]); // 배열의 요소가 unknown 입니다.
}

// kyeof 연산자를 사용하여 제네릭 함수를 수정해보겠습니다.
function keyOfFluck<T>(records: T[], key: keyof T) {
  return records.map((r) => r[key]); // 제네릭 타입의 키값을 기대할수있습니다. //반환값도 똑똑하게 추론합니다.
  // T[keyof T][]는 T객체 내의 모든 속성의 타입입니다.
}

const albums = [kindOfGreen, kindOfGreen, kindOfGreen];

const releasDate = keyOfFluck(albums, "releasDate"); 
// 위 함수의 반환값은 (string|Date)[] 입니다. 두번째 인자에 대한 반환값은 Date [] 여야 합니다.
// 반환값을 올바르게 수정하기 위해서 두번째 제네릭 매개변수를 도입하겠습니다.

//질문: 왜 string|Date 로 추론될까요? // 다른 키값에 대한 타입을 추론해서 일까요.

function pluck<T, K extends keyof T>(records: T[], key: K) {
  return records.map((r) => r[key]);
}

const dates = pluck(albums, "releasDate");
const artists = pluck(albums, "artist");
const wrongArtists = pluck(albums, "Artist"); // 타입 추론을 정확하게 해냅니다.

// 타입스크립트에서 string 은 문자열의 any 와 비슷합니다. 따라서 잘못 사용하게 되면 무효한 값을 허용하고 타입간의 관계를 잃어버릴수 있습니다.

// 요약 문자열(string 타입)을 남발하지 말고 더 구체적인 리터럴 값을 표현 하도록 하는것이 좋습니다.
// 객체의 속성이름을 함수 매개변수로 받을 때에는 string보다 keyof T가 좋습니다.
