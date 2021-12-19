import { Express, Router } from 'express'
import fg from 'fast-glob'

export default (app: Express): void => {
  const dir = '**/src/main/routes/**routes.ts'

  const router = Router()
  app.use('/api', router)

  fg.sync(dir).map(async (file) => {
    const route = (await import(`../../../${file}`)).default
    route(router)
  })
}
