import {AfterViewInit, Component, DoCheck, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, DoCheck, AfterViewInit {
  username = '';
  password = '';
  confirmPassword = '';
  @ViewChild('txtUsername')
  txtUsername!: ElementRef;
  // }
  invalid = false;

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

  }

  // isDisabled(): boolean {
  //   return (this.username.trim().length === 0
  //     || this.password.trim().length === 0
  //     || this.confirmPassword.trim().length === 0
  //     || this.password !== this.confirmPassword);

  createAccount(): void {
    this.userService.createAccount(this.username, this.password).subscribe(value => {
      if (value.status === 201) {
        this.router.navigateByUrl('/sign-in');
      } else {
        console.log('Something crazy');
      }
    }, error => {
      if (error.status === 400) {
        // console.log('Bad Request');
        this.snackBar.open('Invalid details!', 'Dismiss');
      } else {
        this.snackBar.open('500 something went wrong!', 'Dismiss');

        // console.log(error.statusText);
      }
    });
  }

  ngDoCheck(): void {
    // console.log('This is working' + Math.random());
  }

  ngAfterViewInit(): void {
    const nativeElement = this.txtUsername.nativeElement as HTMLInputElement;
    nativeElement.addEventListener('input', () => {
      this.userService.findUser(this.username).subscribe(value => {
        this.invalid = true;
      }, error => {
        this.invalid = false;
      });
    });

  }
}
