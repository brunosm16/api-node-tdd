import app from '../app'
import request from 'supertest'

describe('Cors Middleware', () => {
  test('Should Enable Cors', async () => {
    const URL = '/cors-test'

    app.get(URL, (req, res) => {
      res.send()
    })
    await request(app)
      .get(URL)
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
