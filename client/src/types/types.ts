import { AxiosResponse } from "axios";

export type TauthContext = {
  auth: boolean;
  setAuth: (newAuth: boolean) => void;
  handleRegister: (payload: {
    username: string;
    password: string;
  }) => Promise<AxiosResponse>;
  handleLogin: (payload: {
    username: string;
    password: string;
  }) => Promise<AxiosResponse>;
  handleLogout: () => void;
};

export type TtodoItem = {
  id: string;
  content: string;
  complete: boolean;
};

export type Tuser = {
  id: string;
  username: string;
  todos: { [todoId: string]: TtodoItem };
  todosOrder: string[];
};

export enum THEME_TYPE {
  SYSTEM,
  LIGHT,
  DARK,
}

export enum FILTER_TYPE {
  ALL,
  ACTIVE,
  COMPLETED,
}
