import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {AccountsService} from "./accounts.service";

@Injectable({
  providedIn: 'root'
})
export class RefreshRequestInterceptorService implements HttpInterceptor {

  private readonly loginUri: string = '/api/accounts/login'
  private readonly registerUri: string = '/api/accounts/register'
  private readonly refreshUri: string = '/api/accounts/refresh'

  constructor(private accountService: AccountsService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const reqUrl = req.url;
    let counter: number = 0;

    if (reqUrl.includes(this.loginUri) && reqUrl.includes(this.registerUri) && reqUrl.includes(this.refreshUri)){
      return next.handle(req);
    }

    return next.handle(req)
      .pipe(
        catchError(err => {
          if (err.headers.get('isExpired') === 'true'){

            counter++;

            return this.accountService.refresh()
              .pipe(
                switchMap(() => {
                  const accessToken: string = localStorage.getItem('accessToken') ?? '';
                  const reqClone: HttpRequest<any> = req.clone({setHeaders: {'Authorization': `Bearer ${accessToken}`}})
                  return next.handle(reqClone);
                })
              )
          }

          return throwError(err);
        })
      );
  }
}
