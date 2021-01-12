import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../service/task.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public taskService: TaskService) {

  }

  ngOnInit(): void {
  }

}
