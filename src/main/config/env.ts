export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/api-node-tdd',
  port: process.env.PORT ?? '5000'
}
