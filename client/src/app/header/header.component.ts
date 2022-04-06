import { Component} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private  dataStorageService: DataStorageService){

  }
  onSaveData(){
    this.dataStorageService.storeTasksGroups();
    this.dataStorageService.storeTasks();
  }

  onFetchData(){
    this.dataStorageService.fetchTasksGroups();
    this.dataStorageService.fetchTasksList();
    //this.dataStorageService.fetchTasks();
  }
}
