import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../service/task.service';
import {Router} from '@angular/router';
import {Task} from 'src/app/model/task';
import {Status} from '../../util/status.enum';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  taskList: Array<Task> = [];
  Status = Status;
  // }
  visibleTaskEditor = false;

  constructor(public taskService: TaskService, private router: Router, private sanckBar: MatSnackBar) {

  }

  // display(task: Task):void {

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe(list => {
      this.taskList = list;


    }, error => {
      this.router.navigateByUrl('/sign-in');
    });
  }

  signOut(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('uname');
    this.router.navigateByUrl('/welcome');

  }

  addNewTask(taskDescription: any): void {
    // console.log(taskDescription);
    this.taskService.saveTask(taskDescription).subscribe(task => {
      this.taskList.push(task);
      this.visibleTaskEditor = false;
    }, error => {
      if (error instanceof HttpErrorResponse) {
        this.sanckBar.open('Something went wrong! Please try again', 'Dismiss');
      } else {
        // if Username is missing or token is expire
        this.router.navigateByUrl('/sign-in');
      }
    });

  }
}
