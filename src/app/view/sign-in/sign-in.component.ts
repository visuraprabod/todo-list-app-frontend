import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  username = '';
  password = '';
  @ViewChild('txtUsername')
  txtUsername!: ElementRef;
  @ViewChild('frm')
  frmSignIn!: NgForm;

  // @ViewChild('usernameModel')

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  login(): void {

  }

  authenticate(): void {
    this.userService.authenticate(this.username, this.password).subscribe(token => {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('uname', this.username);
      this.router.navigateByUrl('/main');
    }, error => {
      this.snackBar.open('Invalid Username and Password', 'Dismiss');
      // this.username = '';
      // this.password = '';

      (this.txtUsername.nativeElement as HTMLInputElement).focus();
      this.frmSignIn.reset();
    });
  }
}
