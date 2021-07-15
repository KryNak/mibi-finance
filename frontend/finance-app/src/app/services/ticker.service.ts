import {Injectable} from '@angular/core';
import {TickerDetailResponseDto} from "../dtos/responses/ticker-detail-response-dto";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {TickerAggregationResponseDto} from "../dtos/responses/ticker-aggregation-response-dto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TickerService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  async getTickerDetails(ticker: string): Promise<TickerDetailResponseDto> {

    const accessToken: string = localStorage.getItem('accessToken') ?? '';
    const header: HttpHeaders = new HttpHeaders(
      {
        'Authorization': `Bearer ${accessToken}`,
        'isExpired': 'false'
      }
    );
    const url: string = `http://localhost:8080/api/tickers/${ticker}/details`;

    return await this.httpClient
      .get<TickerDetailResponseDto>(url, {headers: header})
      .toPromise()
      .then(response => response)
      .catch(errors => {

        if(errors instanceof HttpErrorResponse && errors.status === 401){
          alert("Your session is expired.");
          this.router.navigate(['/', 'login']);
        }

        return new TickerDetailResponseDto();
      });
  }

  getTickerAggregation(ticker: string, multiplier: number, timespan: string, from: string, to: string): Observable<TickerAggregationResponseDto>{

    const accessToken: string = localStorage.getItem('accessToken') ?? '';
    const header: HttpHeaders = new HttpHeaders(
      {
        'Authorization': `Bearer ${accessToken}`,
        'isExpired': 'false'
      }
    );
    const url: string = `http://localhost:8080/api/tickers/${ticker}/range/${multiplier}/${timespan}/${from}/${to}`;

    return this.httpClient.get<TickerAggregationResponseDto>(url, {headers: header})

  }

}
