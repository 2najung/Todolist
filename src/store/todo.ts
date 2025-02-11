import { atom } from "recoil";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const todoState = atom<Todo[]>({
  key: "todoState",
  default: [],
});
