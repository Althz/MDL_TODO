import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TasksGroupDetailComponent } from "./tasks-groups/tasks-group-detail/tasks-group-detail.component";
import { TasksGroupEditComponent } from "./tasks-groups/tasks-group-edit/tasks-group-edit.component";
import { TasksGroupStartComponent } from "./tasks-groups/tasks-group-start/tasks-group-start.component";
import { TasksGroupsComponent } from "./tasks-groups/tasks-group.component";
import { RegistrationComponent } from "./registration/registration.component";
import { ShoppingListComponent } from "./tasks-list/tasks-list.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/tasks-groups',pathMatch:'full'},
    { path: 'tasks-groups', component: TasksGroupsComponent, children: [
        {path: '',component: TasksGroupStartComponent},
        {path: 'new', component: TasksGroupEditComponent},
        {path: ':id', component: TasksGroupDetailComponent},
        {path: ':id/edit', component: TasksGroupEditComponent},
    ] },
    { path: 'registration', component: RegistrationComponent },
    { path: 'task-list', component: ShoppingListComponent },
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}   