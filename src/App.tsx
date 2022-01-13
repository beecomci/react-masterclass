import { useState } from "react";

function App() {
  const [value, setValue] = useState("");

  // 어떤 종류의 element가 이 onChange 이벤트를 발생시킬지 특정 가능
  // Typescript는 이 onChange 함수가 InputElement에 의해 실행될 것을 알 수 있음
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = event;

    // Typescript는 onChange 이벤트가 type이 text인 input에 의해서 생성되었으며
    // currentTarget의 value가 string임을 알고 있음
    setValue(value);
  };

  // event: React.{어떤 이벤트냐}<{어떤 element가 이 이벤트를 발생시키냐}>
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Typescript에게 event가 뭔지 설명해줌으로써 preventDefault가 함수란걸 앎 (만약 event 설명이 없다면 문법 오류가 나도 어디서 나는지 모름)
    console.log(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="username"
        />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
