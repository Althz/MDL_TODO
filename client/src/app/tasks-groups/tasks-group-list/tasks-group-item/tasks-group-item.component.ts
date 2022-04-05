import { Component, OnInit, Input } from '@angular/core';

import { TasksGroup } from '../../tasks-group.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './tasks-group-item.component.html',
  styleUrls: ['./tasks-group-item.component.css']
})
export class TasksGroupItemComponent implements OnInit {
  @Input() tasksGroup: TasksGroup;
  @Input() index: number;

  ngOnInit() {
  }
} 
