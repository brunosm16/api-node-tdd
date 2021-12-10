import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

interface SutTypes {
  sut: BcryptAdapter
}

jest.mock('bcrypt', () => ({
  async hash (value: string, salt: number): Promise<string> {
    return await new Promise((resolve) => resolve('hash'))
  }
}))

const salt = 12

const makeSut = (): SutTypes => {
  const bCryptAdapter = new BcryptAdapter(salt)
  return {
    sut: bCryptAdapter
  }
}

describe('EncrypterAdapter', () => {
  test('Should call Bcrypt with correct values', async () => {
    const { sut } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should throws if Bcrypt throws', async () => {
    const { sut } = makeSut()
    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementationOnce(
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        async (): Promise<void> => await Promise.reject(new Error())
      )
    const promise = sut.encrypt('any_value')

    await expect(promise).rejects.toThrow()
  })

  test('Should return a has on success', async () => {
    const { sut } = makeSut()

    const hash = await sut.encrypt('any_value')
    expect(hash).toEqual('hash')
  })
})
