import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { AccountMongoDbRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/sign-up/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const bCryptAdapter = new BcryptAdapter(salt)

  const dbAddAccountRepository = new AccountMongoDbRepository()
  const dbAddAccount = new DbAddAccount(bCryptAdapter, dbAddAccountRepository)

  const emailValidator = new EmailValidatorAdapter()

  return new SignUpController(emailValidator, dbAddAccount)
}
