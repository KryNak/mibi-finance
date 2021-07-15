import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {


  constructor(public auth: AuthService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.auth.isAuthenticated()){
      this.router.navigate(['/', 'login'])
      return false;
    }

    return true;
  }


}
