import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {LoginResponseDto} from '../dtos/responses/login-response-dto';
import {LoginRequestDto} from '../dtos/requests/login-request-dto';
import {RegisterRequestDto} from "../dtos/requests/register-request-dto";
import {RegisterResponseDto} from "../dtos/responses/register-response-dto";
import {RefreshRequestDto} from "../dtos/requests/refresh-request-dto";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable()
export class AccountsService {

  constructor(private http: HttpClient) {
  }

  async login(username: string, password: string): Promise<boolean> {
    const loginPromise: Promise<LoginResponseDto> = this.http
      .post<LoginResponseDto>('http://www.localhost:8080/api/accounts/login', new LoginRequestDto(username, password))
      .toPromise();

    return await loginPromise
      .then(loginResponse => {
        localStorage.setItem('accessToken', loginResponse.accessToken);
        localStorage.setItem('refreshToken', loginResponse.refreshToken);
        return true;
      })
      .catch(ignore => {
        return false;
      });
  }

  async register(username: string, password: string, passwordRepetition: string, email: string): Promise<boolean> {
    const request: RegisterRequestDto = new RegisterRequestDto(username, password, passwordRepetition, email);
    const response: Promise<RegisterResponseDto> = this.http
      .post<RegisterResponseDto>('http://www.localhost:8080/api/accounts/register', request)
      .toPromise();

    return await response
      .then(ignore => {
        return true;
      })
      .catch(ignore => {
        return false;
      });
  }

  refresh(): Observable<any>{
    const refreshToken: string = localStorage.getItem('refreshToken') ?? '';
    const accessToken: string = localStorage.getItem('accessToken') ?? '';
    const header: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${accessToken}`});

    return this.http.post<LoginResponseDto>('http://localhost:8080/api/accounts/refresh', new RefreshRequestDto(refreshToken), {headers: header, observe: 'response'})
      .pipe(
        tap((res: HttpResponse<LoginResponseDto>) => {
          localStorage.setItem('accessToken', res.body?.accessToken ?? '');
          localStorage.setItem('refreshToken', res.body?.refreshToken ?? '');
        })
      );
  }

}
