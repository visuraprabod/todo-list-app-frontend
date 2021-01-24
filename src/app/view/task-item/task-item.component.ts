import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../model/task';
import {Status} from '../../util/status.enum';
import {TaskService} from '../../service/task.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Priority} from '../../util/priority.enum';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  Status = Status;
  @Input()
  task!: Task;
  @Output()
  edit = new EventEmitter();
  borderPriority = '2px solid lightgray';
  backgroundColor = '#f2f2f2';


  constructor(private taskService: TaskService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    if (Status.NOT_COMPLETED === this.task.status) {
      switch (this.task.priority) {
        case Priority.PRIORITY1:
          this.borderPriority = '2px solid red';
          this.backgroundColor = 'pink';
          break;
        case Priority.PRIORITY2:
          this.borderPriority = '2px solid yellow';
          this.backgroundColor = 'lightyellow';
          break;
        case Priority.PRIORITY3:
          this.borderPriority = '2px solid blue';
          this.backgroundColor = 'lightblue';
          break;
        case Priority.PRIORITY4:
          this.borderPriority = '2px solid lightgray';
          this.backgroundColor = '#f3f3f3';
          break;
      }
    } else {
      this.backgroundColor = '#BCF7E2';
      this.borderPriority = '2px solid green';
    }
  }


  editTask(eventData: MouseEvent): void {
    this.edit.emit(this.task);
    eventData.stopImmediatePropagation();
  }

  changeStatus(event: MouseEvent): void {
    event.stopImmediatePropagation();
    const temp = (this.task.status === Status.COMPLETED) ? Status.NOT_COMPLETED : Status.COMPLETED;
    this.taskService.updateTask(new Task(this.task.id, this.task.text, this.task.priority, temp, this.task.username)).subscribe(value => {
      this.task.status = (this.task.status === Status.COMPLETED) ? Status.NOT_COMPLETED : Status.COMPLETED;
    }, error => {
      this.snackBar.open('Something went wrong try again!', 'Dismiss');
    });
  }

  deleteTask(event: MouseEvent): void {
    event.stopImmediatePropagation();
    this.taskService.deleteTask(this.task.id).subscribe(value => {
      this.taskService.taskList.splice(this.taskService.taskList.indexOf(this.task), 1);
    }, error => {
      this.snackBar.open('Something went wrong try again!', 'Dismiss');
    });
  }

  changePriority($event: MouseEvent): void {
    $event.stopImmediatePropagation();
    let tempPriority: Priority = this.task.priority;
    const li = $event.target as any;
    switch (li.innerText) {
      case 'Priority 1':
        this.borderPriority = '2px solid red';
        tempPriority = Priority.PRIORITY1;
        this.backgroundColor = 'pink';
        break;
      case 'Priority 2':
        this.borderPriority = '2px solid yellow';
        tempPriority = Priority.PRIORITY2;
        this.backgroundColor = 'lightyellow';
        break;
      case 'Priority 3':
        this.borderPriority = '2px solid blue';
        tempPriority = Priority.PRIORITY3;
        this.backgroundColor = 'lightblue';
        break;
      case 'Priority 4':
        this.borderPriority = '2px solid lightgray';
        tempPriority = Priority.PRIORITY4;
        this.backgroundColor = '#f3f3f3';
        break;
    }
    this.taskService.updateTask(new Task(this.task.id, this.task.text, tempPriority, this.task.status, this.task.username))
      .subscribe(value => {
        this.task.priority = tempPriority;
      }, error => {
        this.snackBar.open('Something went wrong try again!', 'Dismiss');
      });

  }
}
