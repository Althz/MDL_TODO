import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { TasksGroup } from '../tasks-group.model';
import { TasksGroupService } from '../tasks-group.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './tasks-group-detail.component.html',
  styleUrls: ['./tasks-group-detail.component.css']
})
export class TasksGroupDetailComponent implements OnInit {
  tasksGroup: TasksGroup;
  id: number;

  constructor(private tasksGroupService: TasksGroupService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const id = this.route
    .params.subscribe(
      (params: Params) =>{
        this.id = +params['id'];
        this.tasksGroup = this.tasksGroupService.getTasksGroup(this.id);
      }
    );
  }

  onAddToTaskList() {
    this.tasksGroupService.addTasksToTaskList(this.tasksGroup.ingredients);
  }

  onEditTasksGroup(){
    
    this.router.navigate(['../',this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteTasksGroup(){
    this.tasksGroupService.deleteTasksGroup(this.id);
    this.router.navigate(['/tasks-groups']);
  }
}
