import { useSetRecoilState, useRecoilValue } from "recoil";
import { isDarkAtom } from "../routes/atoms";
import styled from "styled-components";

const Circle = styled.span`
  position: absolute;
  top: 1px;
  left: 1px;
  right: auto;
  width: 22px;
  height: 22px;
  background-color: #fafafa;
  border: 1px solid #4d4d4d;
  border-radius: 50%;
`;

const Emoji = styled.span`
  position: absolute;
  top: -2px;
  right: 3px;
  left: auto;
  width: 22px;
  height: 22px;
  font-size: 17px;
`;

const Btn = styled.button`
  position: relative;
  width: 50px;
  height: 24px;
  background-color: #4d4d4d;
  border: none;
  border-radius: 30px;
  vertical-align: middle;

  &.dark {
    ${Circle} {
      left: auto;
      right: 1px;
    }

    ${Emoji} {
      left: 3px;
      right: auto;
    }
  }
`;

function ToggleBtn() {
  // atom의 value를 수정하기 위한 hook
  // react의 useState와 같은 방식으로 동작
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom(prev => !prev);

  const isDark = useRecoilValue(isDarkAtom);

  return (
    <Btn onClick={toggleDarkAtom} className={isDark ? "dark" : ""}>
      <Circle />
      <Emoji>{isDark ? "🌜" : "🌞"}</Emoji>
    </Btn>
  );
}

export default ToggleBtn;
