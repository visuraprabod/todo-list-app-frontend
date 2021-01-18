import {Component, DoCheck, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, DoCheck {

  username = 'hello';
  password = '';
  confirmPassword = '';
  disabled = true;

  constructor(private route: Router, private userService: UserService) {
  }

  ngOnInit(): void {
  }

  createAccount(): void {
    this.userService.createAccount(this.username, this.password).subscribe(value => {
      // console.log(value.status);
      if (value.status === 201) {
        this.route.navigateByUrl('/sign-in');
      } else {
        console.log('Something Crazy');
      }
    }, error => {
      if (error.status === 400) {
        console.log('Bad request');
      } else {
        console.log(error.statusText);
      }
    });
  }

  isValidate(): boolean {
    return (this.username.trim().length === 0
      || this.password !== this.confirmPassword || this.password.trim().length === 0 || this.confirmPassword.trim().length === 0);
  }

  ngDoCheck(): void {
    console.log('this is working');
  }
}
