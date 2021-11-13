import MongoClient from 'mongodb'

export const connect = (mongoUrl: string = 'mongodb://localhost:21017') => 
    MongoClient.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})