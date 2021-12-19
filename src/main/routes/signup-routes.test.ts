import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

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

describe('SignUp Routes', () => {
  test('Should return an account on success', async () => {
    const url = '/api/signup'
    const statusCode = 200

    await request(app)
      .post(url)
      .send({
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: 'valid_password$123',
        passwordConfirm: 'valid_password$123'
      })
      .expect(statusCode)
  })
})
