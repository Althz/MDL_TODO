import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { TasksGroup } from '../tasks-group.model';
import { TasksGroupService } from '../tasks-group.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './tasks-group-list.component.html',
  styleUrls: ['./tasks-group-list.component.css']
})
export class TasksGroupListComponent implements OnInit, OnDestroy {
  recipes: TasksGroup[];
  subscription: Subscription;
  constructor(private recipeService: TasksGroupService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

   this.subscription =  this.recipeService.tasksGroupsChanged
    .subscribe(
      (recipes: TasksGroup[])=>{
        this.recipes = recipes;
      }
    )
    this.recipes = this.recipeService.getTasksGroups();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
