export type Task = {
  id: string;
  title: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  status: 'to-do' | 'done';
};