import { Task } from "../shared/task.model";

export class TasksGroup {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Task[];

  constructor(name: string, desc: string, imagePath: string, ingredients: Task[]) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
