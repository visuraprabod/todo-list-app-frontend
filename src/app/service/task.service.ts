import {Injectable} from '@angular/core';
import {Task} from '../model/task';
import {Priority} from '../util/priority.enum';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Status} from '../util/status.enum';

@Injectable()
export class TaskService {

  taskList: Array<Task> = [];

  constructor(private rotuer: Router, private http: HttpClient) {


  }


  getAllTasks(): Observable<Array<Task>> {
    const token = sessionStorage.getItem('token');
    if (token === null) {
      this.rotuer.navigateByUrl('/sign-in');
      return throwError('Invalid Token');
    } else {
      return this.http.get<Array<Task>>(`http://localhost:8080/todo/api/v1/items`, {
        headers: new HttpHeaders()
          .append('Authorization', `Bearer ${token} `)
      });
    }
  }

  saveTask(taskDescription: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    const uname = sessionStorage.getItem('uname') as string;

    if (token === null || uname === null) {
      return throwError('Invalid Username or Token');
    }
    const newTask = new Task(null, taskDescription, Priority.PRIORITY1, Status.NOT_COMPLETED, uname);
    return this.http.post(`http://localhost:8080/todo/api/v1/items`, newTask, {
      headers: new HttpHeaders()
        .append('Authorization', `Bearer ${token} `)
    });
  }


  updateTask(currentTask: Task | null): Observable<any> {
    const token = sessionStorage.getItem('token');
    const uname = sessionStorage.getItem('uname') as string;
    if (token === null || uname === null) {
      return throwError('Invalid Username or Token');
    }
    return this.http.put(`http://localhost:8080/todo/api/v1/items?id=${currentTask?.id}`, currentTask, {
      headers: new HttpHeaders()
        .append('Authorization', `Bearer ${token} `)
    });
  }

  deleteTask(id: number | null): Observable<any> {
    const token = sessionStorage.getItem('token');
    const uname = sessionStorage.getItem('uname') as string;
    if (token === null || uname === null) {
      return throwError('Invalid Username or Token');
    }
    return this.http.delete(`http://localhost:8080/todo/api/v1/items?id=${id}`, {
      headers: new HttpHeaders()
        .append('Authorization', `Bearer ${token} `)
    });
  }
}
