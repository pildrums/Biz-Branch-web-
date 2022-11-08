import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface ITodoState {
  [key: string]: ITodo[];
}

export const todoState = atom<ITodoState>({
  key: "todo",
  default: {
    todo: [
      { id: 1, text: "hello" },
      { id: 2, text: "world" },
    ],
    doing: [],
    done: [],
  },
});
