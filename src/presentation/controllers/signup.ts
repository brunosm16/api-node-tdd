import { InvalidParamError } from '../errors/invalid-param'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController implements Controller {
  private readonly emailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirm']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const { email } = httpRequest.body
    const emailIsValid = this.emailValidator.isValid(email)

    console.log(emailIsValid)

    if (!emailIsValid) {
      return badRequest(new InvalidParamError('email'))
    }

    return { statusCode: 404, body: new Error('Request not found') }
  }
}
