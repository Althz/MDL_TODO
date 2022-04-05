import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Task } from '../shared/task.model';
import { TasksListService } from './tasks-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  tasks: Task[];
  private subscription: Subscription;
  constructor(private slService: TasksListService) { }

  ngOnInit() {
    this.tasks = this.slService.getTasks();
    this.subscription =  this.slService.tasksChanged
      .subscribe(
        (tasks: Task[]) => {
          this.tasks = tasks;
        }
      );
  }

  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
