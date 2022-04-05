import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TasksGroupsComponent } from './tasks-groups/tasks-group.component';
import { TasksGroupListComponent } from './tasks-groups/tasks-group-list/tasks-group-list.component';
import { TasksGroupDetailComponent } from './tasks-groups/tasks-group-detail/tasks-group-detail.component';
import { TasksGroupItemComponent } from './tasks-groups/tasks-group-list/tasks-group-item/tasks-group-item.component';
import { ShoppingListComponent } from './tasks-list/tasks-list.component';
import { ShoppingEditComponent } from './tasks-list/tasks-edit/tasks-edit.component';

import { DropdownDirective } from './shared/dropdown.directive';
import { TasksListService } from './tasks-list/tasks-list.service';
import { AppRoutingModule } from './app-routing.module';
import { TasksGroupStartComponent } from './tasks-groups/tasks-group-start/tasks-group-start.component';
import { TasksGroupEditComponent } from './tasks-groups/tasks-group-edit/tasks-group-edit.component';
import { TasksGroupService } from './tasks-groups/tasks-group.service';
import { RegistrationComponent } from './registration/registration.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TasksGroupsComponent,
    TasksGroupListComponent,
    TasksGroupDetailComponent,
    TasksGroupItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    TasksGroupStartComponent,
    TasksGroupEditComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [TasksListService,TasksGroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
