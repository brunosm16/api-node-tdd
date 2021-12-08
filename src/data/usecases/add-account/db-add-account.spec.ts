import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  class EncrypterStub implements Encrypter {
    async encrypt (password: string): Promise<string> {
      return await new Promise((resolve) => resolve('encrypted_password'))
    }
  }

  const encrypterStub = new EncrypterStub()
  const sut = new DbAddAccount(encrypterStub)

  return {
    sut,
    encrypterStub
  }
}

describe('DbAddAccount', () => {
  test('Should call encrypt with correct password', async () => {
    const { sut, encrypterStub } = makeSut()

    const account = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password$123'
    }

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    await sut.add(account)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password$123')
  })
})
