import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-task-editor',
  templateUrl: './task-editor.component.html',
  styleUrls: ['./task-editor.component.scss']
})
export class TaskEditorComponent implements OnInit, AfterViewInit {

  @Output()
  cancel = new EventEmitter();
  @Output()
  update = new EventEmitter();

  @ViewChild('txt')
  txt!: ElementRef;
  @Input()
  taskText!: string;

  @Input()
  newTask = true;

  @Output()
  taskTextChange = new EventEmitter();

  constructor() {

  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   console.log(this.txt);
    // }, 2000);
  }

  ngAfterViewInit(): void {
    (this.txt.nativeElement as HTMLInputElement).focus();
  }

  updateTask(): void {
    this.update.emit({txt: this.txt.nativeElement.value, isNew: this.newTask});
  }
}
