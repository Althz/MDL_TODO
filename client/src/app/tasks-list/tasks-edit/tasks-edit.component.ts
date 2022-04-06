import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TasksGroup } from 'src/app/tasks-groups/tasks-group.model';
import { TasksGroupService } from 'src/app/tasks-groups/tasks-group.service';

import { Task } from '../../shared/task.model';
import { TasksListService } from '../tasks-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './tasks-edit.component.html',
  styleUrls: ['./tasks-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription; 
  editMode = false;
  editedItemIndex: number;
  editedItem: Task;


  constructor(private slService : TasksListService) { }

  ngOnInit() {
    this.subscription =  this.slService.startedEditing
    .subscribe(
      (index: number) =>{
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getTask(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
          deadline: this.editedItem.deadline,
          tasksGroup: this.editedItem.tasksGroup
        })
      }
    );

    
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Task(value.name, value.amount, value.deadline,value.tasksGroup);
    if(this.editMode){
      this.slService.updateTask(this.editedItemIndex, newIngredient);
    }else{
      this.slService.addTask(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.slService.deleteTask(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
