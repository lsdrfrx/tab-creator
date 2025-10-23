import { Elysia } from 'elysia'
import mongoose from 'mongoose'
import { scoreRouter } from './routes'
import cors from '@elysiajs/cors'

await mongoose.connect('mongodb://localhost:27017', {
  auth: {
    username: 'tabcreator',
    password: 'tabcreator',
  },
})

const app = new Elysia().use(cors()).use(scoreRouter).listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)

export { app }
