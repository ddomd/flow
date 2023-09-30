import { UniqueIdentifier } from "@dnd-kit/core";

export type TaskTagPivot = {
  tag_id: number;
  task_id: number;
}

export type TagElement = {
  id: number;
  user_id: number;
  board_id: number;
  name: string;
  color: string;
  pivot?: TaskTagPivot;
  created_at: string;
  updated_at: string;
}

export type SubtaskElement = {
  id: number;
  task_id: number;
  name: string;
  done: boolean;
  created_at: string;
  updated_at: string;
}

export type TaskElement = {
  id: number;
  user_id: number;
  board_id: number;
  column_id: string;
  title: string;
  position: number;
  description: string | null;
  subtasks: SubtaskElement[];
  tags: TagElement[];
  created_at: string;
  updated_at: string;
}

export type ColumnElement = {
  id: string;
  board_id: number;
  name: string;
  color: string;
  tasks: TaskElement[];
  created_at: string;
  updated_at: string;
}

export type BoardElement = {
  id: number;
  name: string;
  pinned: boolean;
  columns: ColumnElement[];
  tags: TagElement[];
  created_at: string;
  updated_at: string;
}
