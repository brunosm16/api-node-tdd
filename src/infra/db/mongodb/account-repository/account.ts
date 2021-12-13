import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account-model'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoDbRepository implements AddAccountRepository {
  async add (account: AddAccountModel): Promise<AccountModel> {
    const collection = MongoHelper.getCollection('accounts')

    const result = await collection.insertOne(account)

    const { _id, ...accountWithNoId } = result.ops[0]

    const convertedAccount = Object.assign({}, { id: _id }, accountWithNoId)

    return convertedAccount
  }
}
