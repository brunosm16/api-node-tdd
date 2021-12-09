import {
  Encrypter,
  AddAccountRepository,
  AccountModel,
  AddAccountModel
} from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
  addAccountRepository: AddAccountRepository
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (password: string): Promise<string> {
      return await new Promise((resolve) => resolve('encrypted_password'))
    }
  }

  return new EncrypterStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'encrypted_password'
      }
      return await new Promise((resolve) => resolve(fakeAccount))
    }
  }
  return new AddAccountRepositoryStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const addAccountRepository = makeAddAccountRepository()
  const sut = new DbAddAccount(encrypterStub, addAccountRepository)

  return {
    sut,
    encrypterStub,
    addAccountRepository
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

  test('Should throws if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()

    const account = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password$123'
    }

    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )

    const promise = sut.add(account)

    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepository } = makeSut()

    const account = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password$123'
    }

    const addSpy = jest.spyOn(addAccountRepository, 'add')
    await sut.add(account)

    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'encrypted_password'
    })
  })
})
