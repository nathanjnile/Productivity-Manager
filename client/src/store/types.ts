import { AxiosRequestHeaders } from "axios";
import { Action, ActionCreator, AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "..";

export type AppThunk = ActionCreator<
  ThunkAction<void, RootState, null, Action<string>>
>;

export type AppThunkDispatch = ThunkDispatch<{}, void, AnyAction>;

export interface Goal {
  _id: string;
  content: string;
  date: string;
  order: number;
  owner: string;
}

export interface Task {
  column: string;
  content: string;
  order: number;
  owner: string;
  _id: string;
}

export interface Column {
  _id: string;
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

export interface IUserDetails extends IUser {
  _id: string;
}

export interface IConfig {
  headers: AxiosRequestHeaders;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean | null;
  isLoading: boolean;
  user: IUserDetails | null;
}

export interface ErrorState {
  msg: { msg: string };
  status: string | null;
  id: string | null;
}

export interface GoalsState {
  goals: Goal[];
  isLoading: boolean;
}

export interface TasksState {
  columns: { [key: string]: Column };
  isLoading: boolean;
}
