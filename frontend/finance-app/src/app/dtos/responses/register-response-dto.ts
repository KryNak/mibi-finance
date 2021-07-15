export class RegisterResponseDto {

  private userId: number;
  private username: string;
  private password: string;
  private email: string;
  private refreshToken: string;
  private refreshTokenExp: Date;


  constructor(userId: number, username: string, password: string, email: string, refreshToken: string, refreshTokenExp: Date) {
    this.userId = userId;
    this.username = username;
    this.password = password;
    this.email = email;
    this.refreshToken = refreshToken;
    this.refreshTokenExp = refreshTokenExp;
  }

  public toString(): string {
    return `${this.userId}, ${this.username}, ${this.password}, ${this.email}, ${this.refreshToken}, ${this.refreshTokenExp}`;
  }

}
