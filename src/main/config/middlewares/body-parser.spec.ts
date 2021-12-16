import app from '../app'
import request from 'supertest'

describe('Body Parser Middleware', () => {
  test('Should parse request as json', async () => {
    const URL = '/test_body_parser'
    app.post(URL, (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post(URL)
      .send({ id: 'mock_id' })
      .expect({ id: 'mock_id' })
  })
})
