import {BigInteger} from "@angular/compiler/src/i18n/big_integer";

export class TickerDetailResponseDto {

  private _logo: string = '';
  private _listdate: string = '';
  private _clik: string = '';
  private _bloomberg: string = '';
  private _figi: string = '';
  private _lei: string = '';
  private _sic: BigInteger = BigInteger.zero();
  private _country: string = '';
  private _industry: string = '';
  private _sector: string = '';
  private _marketcap: BigInteger = BigInteger.zero();
  private _employees: BigInteger = BigInteger.zero();
  private _phone: string = '';
  private _ceo: string = '';
  private _url: string = '';
  private _description: string = '';
  private _name: string = '';
  private _symbol: string = '';
  private _exchangeSymbol: string = '';
  private _hq_adress: string = '';
  private _hq_state: string = '';
  private _hq_country: string = '';
  private _type: string = '';
  private _updated: string = '';
  private _tags: Array<string> = [];
  private _similar: Array<string> = [];
  private _active: boolean = false;


  constructor() {
  }


  get logo(): string {
    return this._logo;
  }

  get listdate(): string {
    return this._listdate;
  }

  get clik(): string {
    return this._clik;
  }

  get bloomberg(): string {
    return this._bloomberg;
  }

  get figi(): string {
    return this._figi;
  }

  get lei(): string {
    return this._lei;
  }

  get sic(): BigInteger {
    return this._sic;
  }

  get country(): string {
    return this._country;
  }

  get industry(): string {
    return this._industry;
  }

  get sector(): string {
    return this._sector;
  }

  get marketcap(): BigInteger {
    return this._marketcap;
  }

  get employees(): BigInteger {
    return this._employees;
  }

  get phone(): string {
    return this._phone;
  }

  get ceo(): string {
    return this._ceo;
  }

  get url(): string {
    return this._url;
  }

  get description(): string {
    return this._description;
  }

  get name(): string {
    return this._name;
  }

  get symbol(): string {
    return this._symbol;
  }

  get exchangeSymbol(): string {
    return this._exchangeSymbol;
  }

  get hq_adress(): string {
    return this._hq_adress;
  }

  get hq_state(): string {
    return this._hq_state;
  }

  get hq_country(): string {
    return this._hq_country;
  }

  get type(): string {
    return this._type;
  }

  get updated(): string {
    return this._updated;
  }

  get tags(): Array<string> {
    return this._tags;
  }

  get similar(): Array<string> {
    return this._similar;
  }

  get active(): boolean {
    return this._active;
  }

  set logo(value: string) {
    this._logo = value;
  }

  set listdate(value: string) {
    this._listdate = value;
  }

  set clik(value: string) {
    this._clik = value;
  }

  set bloomberg(value: string) {
    this._bloomberg = value;
  }

  set figi(value: string) {
    this._figi = value;
  }

  set lei(value: string) {
    this._lei = value;
  }

  set sic(value: BigInteger) {
    this._sic = value;
  }

  set country(value: string) {
    this._country = value;
  }

  set industry(value: string) {
    this._industry = value;
  }

  set sector(value: string) {
    this._sector = value;
  }

  set marketcap(value: BigInteger) {
    this._marketcap = value;
  }

  set employees(value: BigInteger) {
    this._employees = value;
  }

  set phone(value: string) {
    this._phone = value;
  }

  set ceo(value: string) {
    this._ceo = value;
  }

  set url(value: string) {
    this._url = value;
  }

  set description(value: string) {
    this._description = value;
  }

  set name(value: string) {
    this._name = value;
  }

  set symbol(value: string) {
    this._symbol = value;
  }

  set exchangeSymbol(value: string) {
    this._exchangeSymbol = value;
  }

  set hq_adress(value: string) {
    this._hq_adress = value;
  }

  set hq_state(value: string) {
    this._hq_state = value;
  }

  set hq_country(value: string) {
    this._hq_country = value;
  }

  set type(value: string) {
    this._type = value;
  }

  set updated(value: string) {
    this._updated = value;
  }

  set tags(value: Array<string>) {
    this._tags = value;
  }

  set similar(value: Array<string>) {
    this._similar = value;
  }

  set active(value: boolean) {
    this._active = value;
  }
}
