import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import { v4 as uuid } from "uuid";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = []; // store tasks, private marker

  // method exposed to the controller to get tasks
  getTasks(): Task[] {
    return this.tasks; // tasks = [] is being returned
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    // define a temporary array to hold result

    let tasks = this.getTasks();

    // do something with status

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    // do something with search

    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLocaleLowerCase().includes(search) ||
          task.description.toLocaleLowerCase().includes(search)
        ) {
          return true;
        }
      });
    }
    return tasks;
  }

  createTasks(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto; // the values for title and description is destructured from createTaskDto
    const task: Task = {
      id: uuid(),
      title, // assign the title passed as an argument
      description, // assign the description passed as an argument
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task); // push the newly created task into the task array on line 7
    return task; // return task object in the network respone
  }

  getTaskById(id: string): Task {
    // try to get task
    // if task is not found throw an error (404)
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    } else {
      return found;
    }
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
    // if (found) {
    //   this.tasks = this.tasks.filter((task) => task.id !== id);
    // }
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
