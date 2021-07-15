export class LoginRequestDto {

  private readonly username: string;
  private readonly password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  public toString(): string {
    return `${this.username}, ${this.password}`;
  }

}
