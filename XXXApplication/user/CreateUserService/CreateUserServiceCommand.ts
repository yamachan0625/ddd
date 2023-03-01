/** NOTE: p131
 *  更新する項目が増えた場合にアプリケーションサービスのシグネチャー(引数)が変更されることを防ぐ
 */
export class CreateUserCommand {
  readonly userName: string;
  readonly email: string;

  constructor(userName: string, email: string) {
    this.userName = userName;
    this.email = email;
  }
}
