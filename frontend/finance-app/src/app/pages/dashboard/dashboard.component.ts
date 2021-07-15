import {Component} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {TickerDetailResponseDto} from "../../dtos/responses/ticker-detail-response-dto";
import {TickerService} from "../../services/ticker.service";
import {catchError, map, tap} from "rxjs/operators";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  form: FormGroup = this.formBuilder.group({
    symbol: ['']
  });

  tickerDetails: TickerDetailResponseDto | null = null;
  chartData: Array<Array<number>> | null = null;

  spinnerTrigger: boolean = false;

  constructor(private formBuilder: FormBuilder, private tickerService: TickerService) {
  }

  async search() {
    const symbol: string = this.form.get('symbol')?.value;
    this.spinnerTrigger = true;

    if (symbol) {

      this.tickerDetails = await this.tickerService.getTickerDetails(symbol);
      this.chartData = await this.tickerService.getTickerAggregation(symbol, 5, 'minute', '2021-03-21', '2021-03-26')
        .pipe(
          map(response => {
            return response.results.map(e => [e.t, e.o, e.h, e.l, e.c])
          }),
          catchError(err => {
            return [];
          })
        ).toPromise();

    }

    this.spinnerTrigger = false;
  }

}
