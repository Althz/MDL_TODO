
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../shared/task.model';

@Injectable()
export class TasksListService {
  tasksChanged = new Subject<Task[]>();
  startedEditing = new Subject<number>();

  private tasks: Task[] = [];

  getTasks() {
    return this.tasks.slice();
  }

  getTask(index: number){
    return this.tasks[index];
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.tasksChanged.next(this.tasks.slice());
  }

  addTasks(tasks: Task[]) {
    this.tasks.push(...tasks);
    this.tasksChanged.next(this.tasks.slice());
  }

  updateTask(index:number,newTask:Task){
    this.tasks[index] = newTask;
    this.tasksChanged.next(this.tasks.slice());
  }

  deleteTask(index: number){
    this.tasks.splice(index,1);
    this.tasksChanged.next(this.tasks.slice());
  }


  setTasks(tasks: Task[]){
    this.tasks = tasks;
    this.tasksChanged.next(this.tasks.slice());
  }
}
