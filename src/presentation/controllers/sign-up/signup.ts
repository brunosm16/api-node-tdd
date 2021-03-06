import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import {
  HttpRequest,
  HttpResponse,
  Controller,
  AddAccount,
  EmailValidator
} from './sign-up-protocols'

export class SignUpController implements Controller {
  private readonly emailValidator
  private readonly addAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirm']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password } = httpRequest.body

      const emailIsValid = this.emailValidator.isValid(email)

      const { password: reqPassword, passwordConfirm: reqPasswordConfirm } =
        httpRequest.body

      if (reqPassword !== reqPasswordConfirm) {
        return badRequest(new InvalidParamError('passwordConfirm'))
      }

      if (!emailIsValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
