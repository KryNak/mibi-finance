import {AfterViewInit, Component, Input} from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_stock from 'highcharts/modules/stock';
import IndicatorsCore from "highcharts/indicators/indicators";
import IndicatorZigzag from "highcharts/indicators/zigzag";
import {Options} from "highcharts/highstock";
import {Chart} from "highcharts";

HC_stock(Highcharts);
IndicatorsCore(Highcharts);
IndicatorZigzag(Highcharts);

@Component({
  selector: 'app-company-chart',
  templateUrl: './company-chart.component.html',
  styleUrls: ['./company-chart.component.css']
})
export class CompanyChartComponent implements AfterViewInit{

  @Input()
  chartData: Array<Array<number>> = [];

  @Input()
  symbol: string = '';

  selectedValue: string = '';

  updateFlag: boolean = false;
  Highcharts: typeof Highcharts;
  chartOptions: Options;
  charts: Array<Chart | undefined>;

  constructor() {
    this.Highcharts = Highcharts;
    this.chartOptions = {
      title: {
        text: ''
      },
      exporting: {
        enabled: true
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      xAxis: {
        type: 'datetime',
        labels: {
          format: '{value:%Y-%b-%e %l:%M %p }'
        }
      },
      series: [
        {
          type: "ohlc",
          id: "base",
          pointInterval: 24 * 3600 * 1000,
          data: this.chartData
        }
      ],
      legend: {
        enabled: false
      }
    };

    this.charts = Highcharts.charts;
  }

  ngAfterViewInit(): void {
    this.charts.forEach(e => {
      e?.series[0]?.setData(this.chartData);
    });
  }



}
