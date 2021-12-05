import { EmailValidator } from '../presentation/protocols/email-validator'
import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (email: string): boolean {
    return true
  }
}))

const makeSut = (): EmailValidator => {
  return new EmailValidatorAdapter()
}

describe('EmailValidatorAdapter', () => {
  test('Should return false if email validator returns false', () => {
    const sut = makeSut()

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    const isValid = sut.isValid('any_email@email.com')
    expect(isValid).toBe(false)
  })

  test('Should return true if email validator returns true', () => {
    const sut = makeSut()

    const isValid = sut.isValid('any_email@email.com')
    expect(isValid).toBe(true)
  })
})
