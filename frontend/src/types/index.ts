export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface TaskResponse {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
}

export interface TaskCreateUpdate {
  title: string;
  description?: string;
  priority: Priority;
}

export interface TaskToggleComplete {
  completed: boolean;
}