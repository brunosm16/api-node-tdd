import {
  Encrypter,
  AddAccount,
  AddAccountModel,
  AccountModel
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter

  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const fakeAccount = {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password$123'
    }

    await this.encrypter.encrypt(account.password)

    return await new Promise((resolve) => resolve(fakeAccount))
  }
}
