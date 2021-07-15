export class LoginResponseDto {

  private _accessToken: string;
  private _refreshToken: string;


  constructor(accessToken: string, refreshToken: string) {
    this._accessToken = accessToken;
    this._refreshToken = refreshToken;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  set accessToken(value: string) {
    this._accessToken = value;
  }

  get refreshToken(): string {
    return this._refreshToken;
  }

  set refreshToken(value: string) {
    this._refreshToken = value;
  }

  public toString(): string{
    return `${this._accessToken}, ${this._refreshToken}`;
  }
}
