import { MissingParamError } from '../errors/missing-param-error'
import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../protocols/http'

export const badRequest = (error: MissingParamError): HttpResponse => ({
  statusCode: 400,
  body: error.message
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
