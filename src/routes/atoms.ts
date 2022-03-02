import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark", // 고유한 key
  default: false // default value, 이걸로 typescript에서 type 파악
});
