export class Credentials {
  constructor(public email: string, public password: string) {}
  toCredentials = () => new Credentials(this.email, this.password);
  toLoginCredentials = () => new LoginCredentials(this.email, this.password);
  toSignUpCredentials = () =>
    new SignUpCredentials(this.email, this.password, this.password);
  toObject = () => ({ email: this.email, password: this.password });
}

export class LoginCredentials extends Credentials {}

export class SignUpCredentials extends Credentials {
  constructor(
    public email: string,
    public password: string,
    public password_confirmation: string
  ) {
    super(email, password);
  }
}
