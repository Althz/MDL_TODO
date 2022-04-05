
import { Subject } from 'rxjs';
import { Task } from '../shared/task.model';


export class TasksListService {
  tasksChanged = new Subject<Task[]>();
  startedEditing = new Subject<number>();

  private tasks: Task[] = [
    new Task('Algo des graphes', 5),
    new Task('Methode numérique', 10),
  ];

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
}
