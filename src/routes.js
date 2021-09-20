import express from 'express'
import mongoose from 'mongoose'
import { createHash } from 'crypto'

const User = mongoose.model('User')
const Router = express.Router()

Router.post('/user', (req, res) => {
  const { email, password } = req.body
  const safePwd = createHash('whirlpool').update(password).digest('base64')
  const user = new User({ email, password: safePwd })

  user
    .save()
    .then(account => {
      return res.send('User created !')
    })
    .catch(({ errmsg }) => {
      return res.status(500).send(errmsg)
    })
})

Router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).exec()

    if (!user)
      throw new Error('User not found')

    return res.json(user)
  } catch (e) {
    return res.status(404).send('User not found')
  }
})

Router.get('/users', async (req, res) => {
  try {
    const users = await User.find().exec()

    if (!users)
      throw new Error('Aucun utilisateurs')

    return res.json(users)
  } catch (e) {
    console.error(e)
  }
})

export default Router
