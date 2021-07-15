import { Component, OnInit, Input } from '@angular/core';
import {TickerDetailResponseDto} from "../../dtos/responses/ticker-detail-response-dto";

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.css']
})
export class CompanyCardComponent implements OnInit {

  @Input()
  tickerDetails: TickerDetailResponseDto = new TickerDetailResponseDto();

  constructor() { }

  ngOnInit(): void {
  }

}
