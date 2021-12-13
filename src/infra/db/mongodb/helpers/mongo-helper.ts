import { MongoClient } from 'mongodb'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export abstract class MongoHelper {
  private static connection

  public static async connect (uri: string): Promise<void> {
    this.connection = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  public static async disconnect (): Promise<void> {
    await this.connection.close()
  }
}
