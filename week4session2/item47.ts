// Item 47
// Page 238 공개 API 에 등장하는 모든 타입을 export 하기

// 이번 장은 타입선언을 작성하는 사람의 입장에서 설명합니다.

// 타입스크립트를 사용하다 보면 다른 모듈에서 export 되지 않은 타입정보가 필요한 경우가 생깁니다.
// 타입 맵핑을 해주는도구가 많으며, 웬만하면 필요한 타입을 참조할 수 있습니다.

interface SecretName {
  first: string;
  last: string;
}
interface SecretSanta {
  name: SecretName;
  gift: string;
}

export function getGift(name: SecretName, gift: string): SecretSanta {
  return {
    name,
    gift,
  };
} // 이러한 함수 나 기타 api 에 등장하는 타입은 전부 명시적으로 export 하여야 합니다.

// 이러한 라이브러리 사용자는 시크릿 네임과 산타를 직접 임포트 할수 없고 함수만 임포트 할수있습니다.
// 그러나 타입은 함수 시그니처에 등장하므로 추출 가능합니다;

//Returntype

type MySanta = ReturnType<typeof getGift>;

//Parameters
type MyName = Parameters<typeof getGift>[0];

// 어떠한 의도에 의해서 타입을 익스포트 하지 않았다면 쓸데 없는 작업을 한것입니다
// 공개 api 매개변수에 등장하기 때문입니다.
// 굳이 숨기지 않고 명시적인 export 를 하는것이 좋습니다.
