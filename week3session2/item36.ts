// item 36
// Page : 195 해당 분야의 용어로 타입이름 짓기

// 타입의 이름을 짓는것도 설계에서 중요한 부분입니다.
// 타입 이름을 잘 지으면 의도를 명확히 하고 추상화 수준을 높여줍니다.

// 동물들의 데이터베이스를 구축하기위한 인터페이스를 가정해보겠습니다
interface Animal {
  name: string;
  endangered: boolean;
  habitat: string;
}

const leopard: Animal = {
  name: "Snow Leopard",
  endangered: false,
  habitat: "tundra",
};

// 위 타입의 문제접을 꼽아보라면 다음과 같은 문제가 있습니다.
// name 은 매우 일반적인 용어입니다. 동물의 학명인지 (고양이), 일반이름(나비야)인지 알수없습니다.
// endangered 가 이미 멸종위기인지, 이미 멸종된것인지  어떻게 판단해야 할지 애매합니다.
// 서식지는 리터럴 값이 적당할수도 있습니다.
// 객체 변수명은 레오파드지만 이름은 '스노우'레오파드입니다. 의도된것인지 잘못된것인지 판단하기 어렵습니다.

// 아래처럼 개선할 수 있습니다.
type ConservationStatus = "VU" | "EN" | "CR" | "EW" | "EX";
type KoppenClimate = "Af" | "Am" | "As" | "Aw";

interface NewAnimal {
  commonName: string;
  genus: string;
  species: string;
  status: ConservationStatus;
  climates: KoppenClimate[];
}

const snowLeopard: NewAnimal = {
  commonName: "Snow Leopard",
  genus: "Panthera",
  species: "uncia",
  status: "VU", // 취약종
  climates: ["Af", "Am", "As", "Aw"],
};

// name 이 조금더 구체화된 속성이름으로 바뀌었습니다.
// endangered 가 ConservationStatus 로 바뀌었습니다.이는 동물 보호 등급에 대한 표준 분류 체계 입니다.
// habitat 이 KoppenClimate 로 바뀌었습니다. 기후에 따른 유니온스트링 리터럴 타입이며, 쾨펜 기후 분류를 따릅니다.

// 개발자는 자체적인 용어를 생성해내기보다는 이미 업계에 존재하는 용어를 사용할수 있도록 해야합니다.
// 몇가지 원칙이 있습니다.

// 동일한 의미를 나타낼 때는 같은 용어를 사용해야 합니다.
// entity, Object, item 과 같은 모호한 용어는 피하는게 좋습니다. 만약 해당이름이 업계에서 특별한 의미를 가진다면 사용해도 됩니다.
// 이름은 포함된 내용이나 계산방식 보다는 데이터가 무엇인가에 중심을 두는것이 좋습니다. NodeList 보다는 Directory 가 좋습니다.

// 요약
// 가독성을 높이고 추상화 수준을 올리기 위해서 해당 분야의 용어를 사용하는것이 좋습니다.
// 같은 의미에 여려개의 이름을 붙여서는 안됩니다. 특별한 의미가 있을 때에만 용어를 구분해야합니다.
