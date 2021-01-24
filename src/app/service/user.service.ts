import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }


  createAccount(uname: string, pass: string): Observable<HttpResponse<any>> {
    const body = {
      username: uname,
      password: pass
    };
    return this.http.post<HttpResponse<any>>('http://localhost:8080/todo/api/v1/users', body, {
      observe: 'response'
    });
  }

  authenticate(uname: string, pwd: string): Observable<any> {
    const body = {
      username: uname,
      password: pwd
    };

    return this.http.post('http://localhost:8080/todo/api/v1/auth', body, {
      responseType: 'text'
    });
  }

  findUser(username: string): Observable<any> {
  // findUser(username: string): Observable<HttpResponse<string>> {
    return this.http.get(`http://localhost:8080/todo/api/v1/users?q=${username}`, {
      responseType: 'text'
    });
    // return this.http.get<HttpResponse<string>>(`http://localhost:8080/todo/api/v1/users?q=${username}`
    //   );

  }
}
