import { UniqueIdentifier } from "@dnd-kit/core";

export interface TagElement {
  id: number;
  board_id: number;
  name: string;
  color: string;
}

export interface SubtaskElement {
  id: number;
  task_id: number;
  name: string;
  done: boolean;
}

export interface TaskElement {
  id: number;
  user_id: number;
  board_id: number;
  column_id: string;
  title: string;
  position: number;
  description: string;
  subtasks: SubtaskElement[];
  tags: TagElement[];
  updated_at: string;
}

export interface ColumnElement {
  id: string;
  board_id: number;
  name: string;
  color: string;
  tasks: TaskElement[];
}

export interface BoardElement {
  id: number;
  name: string;
  pinned: boolean;
  columns: ColumnElement[];
  tags: TagElement[];
  updated_at: string;
}
