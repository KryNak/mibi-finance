import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AccountsService} from "../../services/accounts.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css', './register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordHide = true;

  registerForm: FormGroup = this.formBuilder.group({
    username: [''],
    password: [''],
    passwordRepetition: [''],
    email: ['']
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private httpClient: HttpClient,
              private accountsService: AccountsService) {
  }

  ngOnInit(): void {
  }

  loginRoute(): void {
    this.router.navigate(['/', 'login']);
  }

  async register(): Promise<void> {
    const username: string = this.registerForm.get('username')?.value ?? '';
    const password: string = this.registerForm.get('password')?.value ?? '';
    const passwordRepetition: string = this.registerForm.get('passwordRepetition')?.value ?? '';
    const email: string = this.registerForm.get('email')?.value ?? '';

    const isRegistered: boolean = await this.accountsService.register(username, password, passwordRepetition, email);

    if (isRegistered) {
      alert('You have been successfully registered');
      this.router.navigate(['/', 'login']);
      return;
    }

    alert('Bad credentials');
  }

}
