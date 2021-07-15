export class RefreshRequestDto {

  private refreshToken: string;

  constructor(refreshToken: string) {
    this.refreshToken = refreshToken;
  }

}
