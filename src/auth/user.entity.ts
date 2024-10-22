/* eslint-disable @typescript-eslint/no-unused-vars */
import { Task } from "src/tasks/task.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // one user is connected to many tasks
  // when eager is set to true, when the user is fetched from the
  // database the tasks are also fetched along with the users
  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
