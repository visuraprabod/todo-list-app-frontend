import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {TaskService} from './service/task.service';
import { TaskItemComponent } from './view/task-item/task-item.component';
import { MainComponent } from './view/main/main.component';
import { WelcomeComponent } from './view/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskItemComponent,
    MainComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
