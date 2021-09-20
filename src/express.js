import express from 'express'
import bodyParser from 'body-parser'

import Router from './routes'

process.env.SERVER_PORT = 6789; process.env.TOKEN = 12345

const { SERVER_PORT, TOKEN, NODE_ENV } = process.env
const app = express()

const auth = (req, res, next) => {
    if (req.query.token !== TOKEN)
        return res.status(401).send("Unauthorized")
    return next()
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(auth)

app.use('/api', Router)

app.listen(SERVER_PORT, () => {
    if (NODE_ENV !== 'test')
        console.log(`[Express] is running on port ${SERVER_PORT}`)
})

export default app
