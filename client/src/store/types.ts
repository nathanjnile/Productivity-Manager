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
