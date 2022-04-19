import { AxiosRequestHeaders } from "axios";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";

export type AppThunk = ActionCreator<
  ThunkAction<void, RootState, null, Action<string>>
>;
export interface Goal {
  _id: string;
  content: string;
  date: string;
}

export interface Task {
  column: string;
  content: string;
  order: number;
  owner: string;
  _id: string;
}

export interface Column {
  columnOrder: number;
  name: string;
  owner: string;
  tasks: Task[];
}

export interface INewUser extends IUser {
  name: string;
}

export interface IUser {
  email: string;
  password: string;
}

export interface IConfig {
  headers: AxiosRequestHeaders;
}

interface IHeaders {
  "Content-type": string;
  Authorization?: string;
}
