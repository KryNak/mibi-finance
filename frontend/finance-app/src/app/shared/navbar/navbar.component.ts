import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {
    authService.getAuthenticationSubject().subscribe(sub => {
      this.isAuthenticated = sub.valueOf();
    })
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    this.authService.update();
  }

}
