// Item 31
// Page : 169 타입 주변에 null 값 배치하기

// strictNullChecks 옵션을 이 없는 경우의 문제를 살펴 보겠습니다.

function extent(nums: number[]) {
  let min, max;

  for (num of nums) {
    if (!min) {
      min = num;
      max = num;
    } else {
      min = Math.min(min, num);
      max = Math.max(max, num);
    }
  }

  return [min, max];
} //  이코드는 오류를 발생시키지 않지만 문제가 있습니다.
// 최솟값이나 최대값이 0인경우 값이 무시됩니다. [0,1,2] = [1,2]
// undefined[] 를 반환할수도 있습니다.

// strictNullChecks 옵션을 켜면 에러를 표시하여줍니다.
// 함수의 반환타입에 undefined[] 가 추가됩니다. 그리고 호출하는곳에서 오류를 확인할 수 있습니다.
const [min, max] = extent([0, 1, 2]);
const sp = max - min;

// null 을 추가하여 함수를 바꾸어 보겠습니다.
function nullExtent(nums: number[]) {
  let result: [number, number] | null = null;

  for (num of nums) {
    if (!result) {
      result = [num, num];
    } else {
      result = [Math.min(result[0], num), Math.max(result[1], num)];
    }
  }
  return result;
}

const [minz, maxz] = nullExtent([1, 2, 3])!;
const spn = maxz - minz;
// null 아님 단언(!)을 사용하면 정상적으로 number[] 를 얻을수있습니다.

// if 를 사용할수도 있습니다.
const minMax = nullExtent([0, 1]);
if (minMax) {
  const [min, max] = minMax;
  const span = max - min;
}

// 한 값으 null 여부가 다른값의 null 여부에 암시적으로 관련되도록 설계하면 안됩니다.
// api 작성시에는 타입 전체가 null 이거나 null 이 아니게 해야 합니다. c
// 스트릭 널쳌은 타입 시스템을 더욱 강력하게 만들어 줍니다.
