import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { TasksGroup } from '../tasks-groups/tasks-group.model';
import { TasksGroupService } from '../tasks-groups/tasks-group.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private tasksGroupService: TasksGroupService) {}


  storeTasksGroups(){
    const recipes  = this.tasksGroupService.getTasksGroups();
    this.http.put('https://ng-course-recipe-book-e52a6-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',recipes).subscribe(response =>{
        console.log(response);
        
    });
}

fetchTasksGroups(){
    this.http.get<TasksGroup[]>('https://ng-course-recipe-book-e52a6-default-rtdb.europe-west1.firebasedatabase.app/recipes.json').subscribe(recipes =>{
        this.tasksGroupService.setTasksGroups(recipes)
        
    });
}




fetchTasks(){

    this.http.get('http://localhost:8000/tasks').subscribe(tasks =>{
        console.log(tasks);   
    });
}

}
