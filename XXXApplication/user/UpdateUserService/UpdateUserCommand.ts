/** NOTE: p131
 *  更新する項目が増えた場合にアプリケーションサービスのシグネチャー(引数)が変更されることを防ぐ
 */
export class UpdateUserCommand {
  readonly userId: string;
  readonly userName?: string;
  readonly email?: string;

  constructor(userId: string, userName?: string, email?: string) {
    this.userId = userId;
    this.userName = userName;
    this.email = email;
  }
}
