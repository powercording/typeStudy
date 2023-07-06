// Item 45
// Page : 229 : Dev dependencies 에 typescript와 @types 추가하기.

// 들어가기에 앞서 이번장 소개
// ts를포함한 여러 언어에서 라이브러리의존성을 관리하는것은 어려운 일입니다.
// 이번장에서는 ts 의존성이 어떻게 동작하는지 설명하며 개념을 잡습니다
// 프로젝트를 공개하기전에 타입선언 파일을 작성하는데 도움이 될것입니다.
// 제대로 된 타입선언을  작성하여 공개 하는것은 타입스크립트 전체 커뮤니티에 기여하는 일이기도 합니다.

// npm 은 세가지 종류의 의존성을 구분합니다.

// 1. dependencies
// 프로젝트를 실행하는데 필수적인라이브러리들이 포함됩니다. 런타임에 사용되는 라이브러라리면 dependencies 에 포함되어야 합니다.
// 프로젝트를 npm 에 공개한다면 dependencies 에 포함된 라이브러리들은 설치됩니다.

// 2. devDependencies
// 프로젝트를 개발하고 테스트하는데는 필요 하지만 런타임에는 사용되지 않는 라이브러리 입니다. 테스트 프레임워크가 그예시입니다.
// 프로젝트를 npm 에 공개한다고 하여도, devDependencies 에 포함된 라이브러리들은 설치되지 않습니다.

// 3. peerDependencies
// 런타임에 필요하지만 직접 임포트나  require 하지 않는 의존성입니다.

// 타입관련된 정보는 런타임에 존재하지 않기 때문에 타입스크립트와 관련된 라이브러리는 데브디펜던시에 추가됩니다.

// 타입스크립트 자체 관리
// 시스템레벨은 추천하지 않음. 모든 팀원이 항상 같은 버전을 사용할수없음.
// 프로젝트 셋업에 별도의 단계가 추가됨.

// 타입 의존성
// 사용하려는 라이브러리가 타입정보를 제공하지 않더라도, 커뮤니티에서 타입정보를 제공하는 경우가 있습니다.
// @types/라이브러리명 으로 설치시도 해볼수있습니다.

// 타입스크립트를 시스템 레벨로 설치하는것을 피해야 합니다.
// @type 의존성은 데브디펜던시에 포함시켜야 합니다.