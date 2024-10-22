export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONR = "DONE",
}

g075y8z69jIhmDwQvP60iRbHZVPkYrfHT2iXyi04pH4ISJu33ZPGGHHwe01I
