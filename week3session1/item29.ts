// Item29
// Page : 162 사용할 때는 너그럽게, 생성할 때는 엄격하게

// 함수의 매개 변수는 타입의 범위가 넓어도 되지만 결과는 일반적으로 더 좁은 타입이 되어야 합니다. (구체적이어야 합니다)

// 아래 두 함수를 보겠습니다.
interface CameraOptions {
  center?: LngLat;
  zoom?: number;
  bearing?: number;
  pitch?: number;
}
type LngLat =
  | { lng: number; lat: number }
  | { lon: number; lat: number }
  | [number, number]; // 유니온 타입에 할당된 타입들이 모두 같은 역할을 하지만 편의성 측면에서 여러개를 제공하고 있습니다.

type LngLatBounds =
  | { northeast: LngLat; southwest: LngLat }
  | [LngLat, LngLat]
  | [number, number, number, number]; // LngLat 를 활용한 또 다른 자유로운 타입입니다.

declare function setCamera(camera: CameraOptions): void; // 매개변수는 모두 선택적입니다.
declare function viewportForBounds(bounds: LngLatBounds): CameraOptions;

// LngLat 는 3가지 형태를 받을 수 있으므로 LngLatBounds 의 가능한 형태는 19가지 이상입니다.

// 다른 함수를 작성하겠습니다.
function focusOnFeature(f: Feature) {
  const bounds = calcuateBoundingBox(f);
  const camera = viewportForBounds(bounds);
  setCamera(camera);
  const {
    center: { lat, lng },
    zoom,
  } = camera;
}
// 해당 예제는 lat 과 lng 속성이 없고 zoom 속성만 존재하며 zoom 도 number 가 아닌 number | undefined 타입입니다.
// 근본적인 문제는 viewportForBounds 함수의 타입 선언이 사용하는데 편리할 뿐만 아니라 만들어 질 때에도 너무 자유로웠기 때문입니다.
// camera 값을 안전한 타입으로 사용하는 유일한 방법은 유니온 타입의 각 요소별로 코드를 분기하는 방법 뿐입니다.

// 수많은 선택적 속성을 가지는 반환타입과 유니온타입은 함수를 사용하기 어렵게 만듭니다.
// 매개변수 타입범위가 넓으면 사용하기 편하지만 반환타입 범위가 넓으면 사용하기 어렵습니다.
// 즉 사용하기 편리한 api 일 수록 반환 타입이 엄격합니다.

// 이런 문제를 해결 하기 위하여 매개변수 typeLike 와 반환타입 을 분리할 수 있습니다.

interface NewLngLat {
  lng: number;
  lat: number;
} // 반환 타입은 엄격합니다.
type NewLngLatLike =
  | NewLngLat
  | { lat: number; lng: number }
  | [number, number]; // 매개변수로 like 타입을 사용하면 이전과같이
// 사용하기 편리합니다.

interface Camera {
  center: NewLngLat;
  zoom: number;
  bearing: number;
  pitch: number;
}
interface CameraOption extends Omit<Partial<Camera>, "center"> {
  center?: NewLngLatLike;
} // 새로 선언한 Camera 는 타입이 너무 엄격하므로 partial 로 선택적으로 만든 뒤 center 속성을 like 로 선언하여줍니다.


// 보통 매개변수 타입은 반환 타입에 비하여 범위가 넓은 경향이 있습니다. 선택적 속성과 유니온 타입은 반환타입 보다는
// 매개변수 타입에 더 일반적입니다.
// 매개변수와 반환 타입의 재사용을 위해서 기본형태(반환형태) 와 느슨한 형태 (매개변수 타입)을 도입하는 것이 좋습니다.

