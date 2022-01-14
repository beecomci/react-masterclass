import { DefaultTheme } from "styled-components";

// 앞서 styled.d.ts에서 생성한 DefaultTheme interface를 정의해둬서
// light와 dark 모드에서 속성을 하나라도 빠뜨리지 않고 작성 가능
export const lightTheme: DefaultTheme = {
  bgColor: "white",
  textColor: "black"
};

export const darkTheme: DefaultTheme = {
  bgColor: "black",
  textColor: "white"
};
