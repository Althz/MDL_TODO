import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { TasksGroup } from '../tasks-groups/tasks-group.model';
import { TasksGroupService } from '../tasks-groups/tasks-group.service';
import { TasksListService } from '../tasks-list/tasks-list.service';
import { Task } from './task.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private tasksGroupService: TasksGroupService,
    private slService: TasksListService) {}


  storeTasksGroups(){
    const recipes  = this.tasksGroupService.getTasksGroups();
    console.log(recipes);
    this.http.put('https://ng-course-recipe-book-e52a6-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',recipes).subscribe(response =>{
        //console.log(response);
        
    });
}

fetchTasksGroups(){
    this.http.get<TasksGroup[]>('https://ng-course-recipe-book-e52a6-default-rtdb.europe-west1.firebasedatabase.app/recipes.json').subscribe(recipes =>{
        this.tasksGroupService.setTasksGroups(recipes)
        
    });
}


storeTasks(){
    const tasks  = this.slService.getTasks();
    console.log(tasks);
    //console.log('end test');
    
    this.http.put('https://ng-course-recipe-book-e52a6-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',tasks).subscribe(response =>{
        console.log(response);
        
    });
}

fetchTasksList(){
    this.http.get<Task[]>('https://ng-course-recipe-book-e52a6-default-rtdb.europe-west1.firebasedatabase.app/tasks.json').subscribe(tasks =>{
        this.slService.setTasks(tasks)
        
    });
}

fetchTasks(){

    this.http.get('http://localhost:8000/tasks').subscribe(tasks =>{
        console.log(tasks);   
    });
}

}
