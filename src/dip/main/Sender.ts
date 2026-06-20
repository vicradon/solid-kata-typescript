import { Employee } from './Employee';

export interface Sender {
  send(employee: Employee): void;
}
