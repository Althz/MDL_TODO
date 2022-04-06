import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TasksGroupService } from '../tasks-group.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './tasks-group-edit.component.html',
  styleUrls: ['./tasks-group-edit.component.css']
})
export class TasksGroupEditComponent implements OnInit {
  id: number;
  editMode = false;
  tasksGroupForm: FormGroup;


  constructor(private route: ActivatedRoute,
    private tasksGroupService: TasksGroupService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.
    subscribe(
      (params: Params)=>{
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        
      }
    )
  }

  onSubmit(){

    if(this.editMode){
      this.tasksGroupService.updateTasksGroup(this.id,this.tasksGroupForm.value)
    }else{
      this.tasksGroupService.addTasksGroup(this.tasksGroupForm.value);
    }
    this.onCancel();
  }

  onAddIngredient(){
    (<FormArray> this.tasksGroupForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    ) 
  }
  onDeleteIngredient(index: number){
    (<FormArray>this.tasksGroupForm.get('ingredients')).removeAt(index);
  }
  onCancel(){
    
    this.router.navigate(['../'],{relativeTo: this.route});
  }
  private initForm(){
    
    let tasksGroupName = '';
    let tasksGroupDescription = '';
    let tasksGroupTasks = new FormArray([]); 

    if(this.editMode){
      const tasksGroup = this.tasksGroupService.getTasksGroup(this.id)
      tasksGroupName = tasksGroup.name;
      tasksGroupDescription = tasksGroup.description;
      if(tasksGroup['ingredients']){
        for(let ingredient of tasksGroup.ingredients){
          tasksGroupTasks.push(
            new FormGroup({
              'name': new FormControl(ingredient.name,Validators.required),
              'amount': new FormControl(ingredient.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ]),
              'deadline': new FormControl(ingredient.deadline,Validators.required),
              'tasksGroup': new FormControl(ingredient.tasksGroup,Validators.required)

            })
          )
        }
      }
    }
    this.tasksGroupForm = new FormGroup({
      'name': new FormControl(tasksGroupName,Validators.required),
      'description':new FormControl(tasksGroupDescription,Validators.required),
      'ingredients': tasksGroupTasks
    });
  }


  get controls() { // a getter!
    return (<FormArray>this.tasksGroupForm.get('ingredients')).controls;
  }
}
