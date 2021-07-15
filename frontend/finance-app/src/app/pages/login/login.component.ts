import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AccountsService} from '../../services/accounts.service';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  loginForm: FormGroup = this.formBuilder.group({
    username: [''],
    password: ['']
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private httpClient: HttpClient,
              private accountsService: AccountsService, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  registerRoute(): void {
    this.router.navigate(['/', 'register']);
  }

  async login(): Promise<void> {
    const username: string = this.loginForm.get('username')?.value;
    const password: string = this.loginForm.get('password')?.value;

    const isLogin: boolean = await this.accountsService.login(username, password);
    if (isLogin) {
      alert('You have been successfully sign in');
      this.authService.update();
      this.router.navigate(['/', 'dashboard']);
      return;
    }

    alert('Bad credentials');
  }

}
