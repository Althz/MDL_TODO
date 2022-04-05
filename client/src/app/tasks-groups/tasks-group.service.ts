import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Task } from "../shared/task.model";
import { TasksListService } from "../tasks-list/tasks-list.service";
import { TasksGroup } from "./tasks-group.model";

@Injectable()
export class TasksGroupService{

   
    tasksGroupsChanged = new Subject<TasksGroup[]>();

    private tasksGroups: TasksGroup[] = [];
    
    constructor(private slService: TasksListService){}
    
     addTasksGroup(recipe: TasksGroup){
         this.tasksGroups.push(recipe);
         this.tasksGroupsChanged.next(this.tasksGroups.slice());
     }
    
     updateTasksGroup(index:number, newRecipe: TasksGroup){
         this.tasksGroups[index] = newRecipe;
         this.tasksGroupsChanged.next(this.tasksGroups.slice());
     }

    setTasksGroups(recipes: TasksGroup[]){
        this.tasksGroups = recipes;
        this.tasksGroupsChanged.next(this.tasksGroups.slice());
    }

    deleteTasksGroup(index: number){
        this.tasksGroups.splice(index,1);
        this.tasksGroupsChanged.next(this.tasksGroups.slice())
    }

    getTasksGroup(index: number){
        return this.tasksGroups[index];
    }
     getTasksGroups(){
         return this.tasksGroups.slice();
     }
     
     addTasksToTaskList(tasks: Task[]){
        this.slService.addTasks(tasks);
     }

}