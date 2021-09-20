import mongoose from 'mongoose'

import { userSchema } from './schemas'

const url = 'mongodb://localhost:27017/local'
const options = {
    //   useMongoClient: true,
}

mongoose.Promise = Promise

mongoose.connect(url, options)

mongoose.connection.on('connected', () =>
    console.log('[MongoDB] is running on port 27017')
)

mongoose.connection.on('disconnected', () =>
    console.warn('[MongoDB] is not connected')
)

mongoose.model('User', userSchema)
