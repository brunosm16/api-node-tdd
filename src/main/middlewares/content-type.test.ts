import app from '../config/app'
import request from 'supertest'

describe('Content Type Middleware', () => {
  test('Should return default content type as json', async () => {
    const URL = '/test_content_type'

    app.get(URL, (req, res) => {
      res.send({
        id: 'fake_id'
      })
    })

    await request(app).get(URL).expect('content-type', /json/)
  })
})
