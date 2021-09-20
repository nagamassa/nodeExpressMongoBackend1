import supertest from 'supertest'

import app from '../src/express'

const { TOKEN } = process.env

describe('GET /api', () => {
  test('Tester l\'accès sans TOKEN', async () => {
    const { text, status } = await supertest(app).get('/api')

    expect(status).toBe(401)
    expect(text).toBe('Unauthorized')
  })

  test('Tester l\'accès avec TOKEN', async () => {
    const { text, status } = await supertest(app).get(`/api?token=${TOKEN}`)

    expect(status).toBe(200)
    expect(text).toBe('ça fonctionne !')
  })
})
