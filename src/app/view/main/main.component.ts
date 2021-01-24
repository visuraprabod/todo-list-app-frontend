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

  // taskList: Array<Task> = [];
  Status = Status;
  // }
  visibleTaskEditor = false;
  currentTask: Task | null = null;

  constructor(public taskService: TaskService, private router: Router, private sanckBar: MatSnackBar) {

  }

  // display(task: Task):void {

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe(list => {
      // this.taskList = list;
      this.taskService.taskList = list;


    }, error => {
      this.router.navigateByUrl('/sign-in');
    });
  }

  signOut(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('uname');
    this.router.navigateByUrl('/welcome');

  }

  addNewTask(object: any): void {
    if (object.isNew) {
      this.addNew(object.txt);
    } else {
      this.update(object.txt);
    }

  }

  addNew(taskDescription: any): void {
    this.taskService.saveTask(taskDescription).subscribe(task => {
      // this.taskList.push(task);
      this.taskService.taskList.push(task);
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

  editTask(task: Task): void {
    this.currentTask = task;
    this.visibleTaskEditor = true;
  }

  update(taskDescription: any): void {
    this.taskService.updateTask(this.currentTask).subscribe(value => {
      this.visibleTaskEditor = false;
      this.currentTask = null;
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
