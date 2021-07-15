import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {

  private authenticationSubject: Subject<boolean> = new Subject<boolean>()

  constructor(private jwtHelper: JwtHelperService) {
    this.authenticationSubject.next(this.isAuthenticated());
  }

  public isAuthenticated(): boolean {
    const token: string = localStorage.getItem('accessToken') ?? '';
    return !this.jwtHelper.isTokenExpired(token);
  }

  public getAuthenticationSubject(): Subject<boolean>{
    return this.authenticationSubject;
  }

  public update(): void {
    this.authenticationSubject.next(this.isAuthenticated());
  }

}
