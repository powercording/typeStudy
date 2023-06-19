// Item 18
// Page : 101 매핑된 타입을 사용하여 값을 동기화 하기

interface ScatterProps {
  x: number;
  y: number;

  xRange: [number, number];
  yRange: [number, number];

  onClick: (x: number, y: number) => void;
}

function shouldUpdate(prevProps: ScatterProps, nextProps: ScatterProps) {
  return (
    prevProps.x !== nextProps.x ||
    prevProps.y !== nextProps.y ||
    prevProps.xRange !== nextProps.xRange ||
    prevProps.yRange !== nextProps.yRange ||
    prevProps.onClick !== nextProps.onClick
    // 인터페이스에 속성이 추가 될 경우 누락이 발생할 수 있음.
  );
}

function shouldUpdate2(prevProps: ScatterProps, nextProps: ScatterProps) {
  let k: keyof ScatterProps;
  for (k in prevProps) {
    if (prevProps[k] !== nextProps[k]) {
      if (k !== "onClick") {
        return true;
      }
    }
  }
  return false;
} // 이런식으로 하면 누락이 발생하지 않지만 너무 자주 그려질 가능성이 있습니다 (?)

// 타입체커가 코드에 개입하게 만들수 있습니다.
const REQUIRES_UPDATE: { [k in keyof ScatterProps]: boolean } = {
  x: true,
  y: true,
  xRange: true,
  yRange: true,
  onClick: false,
};

function shouldUpdate3(prevProps: ScatterProps, nextProps: ScatterProps) {
  let k: keyof ScatterProps;
  for (k in prevProps) {
    if (prevProps[k] !== nextProps[k] && REQUIRES_UPDATE[k]) {
      return true;
    }
  }
  return false;
}

// 만약 ScatterProps 에 새로운 속성이 추가된다면 REQUIRES_UPDATE 에도 추가해야 합니다.
// 누락 될 수 있는 속성을 정확하게 잡아 냅니다.
// interface ScatterProps {
//   color: string;
// }
