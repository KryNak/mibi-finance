export interface Result{

  v: number;
  vw: number;
  o: number;
  c: number;
  h: number;
  l: number;
  t: number;
  n: number;

}

export class TickerAggregationResponseDto {

  private _ticker: string = '';
  private _queryCount: number = 0;
  private _resultsCount: number = 0;
  private _adjusted: boolean = false;
  private _status: string = '';
  private _request_id: string = '';
  private _count: number = 0;
  private _results: Array<Result> = [];

  constructor() {
  }

  get ticker(): string {
    return this._ticker;
  }

  set ticker(value: string) {
    this._ticker = value;
  }

  get queryCount(): number {
    return this._queryCount;
  }

  set queryCount(value: number) {
    this._queryCount = value;
  }

  get resultsCount(): number {
    return this._resultsCount;
  }

  set resultsCount(value: number) {
    this._resultsCount = value;
  }

  get adjusted(): boolean {
    return this._adjusted;
  }

  set adjusted(value: boolean) {
    this._adjusted = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get request_id(): string {
    return this._request_id;
  }

  set request_id(value: string) {
    this._request_id = value;
  }

  get count(): number {
    return this._count;
  }

  set count(value: number) {
    this._count = value;
  }

  get results(): Array<Result> {
    return this._results;
  }

  set results(value: Array<Result>) {
    this._results = value;
  }
}
