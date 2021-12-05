import { EmailValidator } from '../presentation/protocols/email-validator'
import { EmailValidatorAdapter } from './email-validator-adapter'

const makeSut = (): EmailValidator => {
  return new EmailValidatorAdapter()
}

describe('EmailValidatorAdapter', () => {
  test('Should return false if email validator returns false', () => {
    const sut = makeSut()

    const isValid = sut.isValid('any_email@email.com')

    expect(isValid).toBe(false)
  })
})
