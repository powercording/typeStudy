// Item 28
// Page : 156 유효한 상태만 표현하는 타입을 지향하기

// 효과적인 타입을 설계하기 위해서는 유효한 상태만 표현할 수 있는 타입을 만들어 내는것이 가장 중요합니다.

// 애플리케이션에서 페이지를 선택하면 내용을 로드하고, 화면에 표시하는 상태를 다음처럼 설계한다 하겠습니다.
interface State {
  pageText: string;
  isLoading: boolean;
  error?: string;
}

// 해당 인터페이스를 참조하여 랜더링하는 함수는 상태 객체의 필드를 전부 고려하여야 합니다.
function someRenderFunction(state: State) {
  if (state.isLoading) {
    return "loading...";
  }
  if (state.error) {
    return `error: ${state.error}`;
  }
  return state.pageText;
}

// 분기 조건에 대한 이해가 명확하게 구분되어지지 않습니다.
// 로딩중이면서 에러값이 존재하면 로딩중인 상태인지, 오류가 발생한 상태인지 명확하게 구분하기 헷갈립니다.
// 필요한 정보가 부족하기 때문입니다.

// 한편 페이지를 전환하는 함수는 아래와 같다고 하겠습니다.
async function someChangePage(state: State, newPage: string) {
  state.isLoading = true;

  try {
    const response = await fetch(newPage);

    if (!response.ok) {
      // Throw an error so we can catch it below
    }
    const text = await response.text();
    state.pageText = text;
    state.isLoading = false;
  } catch (e) {
    state.error = e + "";
  }
}

// 위의 예시에는 많은 문제점이 있습니다.
// 오류가 발생 했을때 로딩을 false 로 설정하는 로직이 존재하지 않습니다.
// state.error 를 초기화 하지 않기 때문에 과거의 에러 내역을 보여주게 됩니다.
// 페이지 로딩 중에 사용자가 페이지를 이동하면 어떤일이 벌어질지 예상하기 어렵습니다.
// 새 페이지에 응답이 오는 순서에 따라 어떤 페이지로 이동 할지 예측하기 어렵습니다.

// 정리 하자면 상태값의 두 가지 속성이 동시에 정보가 부족하거나 충돌할수있다는것입니다.
// state 타입은 isLoading 이 true 이면서 동시에 error 가 존재하는 무효한 상태를 허용합니다 .

// 조금 더 제대로 표현 해 보겠습니다.

interface RequestPending {
  state: "pending";
}

interface RequestError {
  state: "error";
  error: string;
}

interface RequestSuccess {
  state: "ok";
  pageText: string;
}

type RequestState = RequestPending | RequestError | RequestSuccess;

interface NewState {
  currentPage: string;
  request: { [page: string]: RequestState };
}

// 네트워크 요청 각각의 상태를 명시적으로 모델링 하는 태그된 유니온이 사용되었습니다.
// 타입선언이 길어졌지만 무효한 상태를 허용하지 않도록 개선되었습니다.

function NewRenderPage(state: NewState) {
  const { currentPage, request } = state;
  const requestState = request[currentPage];

  switch (requestState.state) {
    case "pending":
      return "loading...";
    case "error":
      return `error: ${requestState.error}`;
    case "ok":
      return requestState.pageText;
  }
} // 페이지 랜더링

async function changePages(state: NewState, newPage: string) {
  state.request[newPage] = { state: "pending" };
  state.currentPage = newPage;
  try {
    const response = await fetch(newPage);
    if (!response.ok) {
      throw new Error("Not found");
    }
    const text = await response.text();
    state.request[newPage] = { state: "ok", pageText: text };
  } catch (e) {
    state.request[newPage] = { state: "error", error: e + "" };
  }
} // 페이지 전환

// 잘못된 상태 설계로 인한 비행기 사고 이야기
interface CockpitControls {
  leftSideStick: number;
  rightSideStick: number;
}

// 위와 같은 객체에서 어떠한 조종 스틱의 상태를 구하는 함수를 가정해 보겠습니다.
function getStickState(controls: CockpitControls) {
  const { leftSideStick, rightSideStick } = controls;

  if (leftSideStick === 0) return rightSideStick;
  return leftSideStick;
}

// 위 함수는 문제가 있습니다. 오른쪽 스틱과 왼쪽 스틱중 중립 ( 0 ) 이 아닌 스틱의 값을 사용하여야 합니다.
// 왼쪽스틱이 0일때는 제대로 오른쪽 스틱의 값을 가져 오지만 오른쪽 스틱상태에 대한 조건이 존재하지 않습니다. 

// 이러한 상태 설계 오류로 인한 사고에 대해서 예시가 나옵니다. 
// 그러므로 개발자는 상태를 설계할 때 어떤 값들을 포함하고, 제외할지 신중하게 생각해야 합니다. 

// 유효한 상태와 무효한 상태( 존재해서는 안되는 상태 ) 를 둘 다 표현하는 타입은 혼란스럽습니다. 