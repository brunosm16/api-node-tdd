import request from 'supertest'
import app from '../config/app'

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
