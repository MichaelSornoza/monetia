export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public createdAt: Date,
  ) {}

  static create(name: string, email: string, password: string): User {
    return new User(crypto.randomUUID(), name, email, password, new Date());
  }
}
