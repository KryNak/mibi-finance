export class RegisterRequestDto {

  private readonly username: string;
  private readonly password: string;
  private readonly passwordRepetition: string;
  private readonly email: string;

  constructor(username: string, password: string, passwordRepetition: string, email: string) {
    this.username = username;
    this.password = password;
    this.passwordRepetition = passwordRepetition;
    this.email = email;
  }

  public toString(): string {
    return `${this.username}, ${this.password}, ${this.passwordRepetition}, ${this.email}`;
  }

}
