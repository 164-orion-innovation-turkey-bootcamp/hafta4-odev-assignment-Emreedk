import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  constructor(
    private userDataService: UserDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginUser = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      };
      this.userDataService.getData().subscribe((users) => {
        users.forEach((user) => {
          if (
            loginUser.email == user.user.email &&
            loginUser.password == user.user.password
          ) {
            localStorage.setItem('user', JSON.stringify(user));
            this.loginForm.reset();
            this.userDataService.login.next(true); //rxJs subject trigger
            this.router.navigate(['/products']);
          } else {
            this.errorMessage = 'Email or Password Incorrect';
            this.timer();
          }
        });
      });
    }
  }
  timer() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
