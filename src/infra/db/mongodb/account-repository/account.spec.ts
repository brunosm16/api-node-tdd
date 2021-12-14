import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoDbRepository } from './account'

describe('MongoDB AddAccount Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')

    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoDbRepository => {
    return new AccountMongoDbRepository()
  }

  test('Should return an account on success', async () => {
    const sut = makeSut()

    const result = await sut.add({
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    })

    expect(result).toBeTruthy()
    expect(result.id).toBeTruthy()
    expect(result.name).toBe('valid_name')
    expect(result.email).toBe('valid_email@email.com')
    expect(result.password).toBe('valid_password')
  })
})
