import { Db, ObjectID } from 'mongodb';
import { injectable } from 'inversify';
import { MongoDBConnection } from './connection';
import { User } from '../../models/user';

@injectable()
export class MongoDBClient {
  public db: Db;

  constructor() {
    MongoDBConnection.getConnection((connection) => {
      this.db = connection;
    });
  }

  public find(collection: string, filter: Object, result: (error, data) => void): void {
    this.db.collection(collection).find(filter).toArray((error, find) => {
      return result(error, find);
    });
  }

  public findOne(collection: string, filter: Object, result: (error, data) => void): void {
    this.db.collection(collection).find(filter).limit(1).toArray((error, find) => {
      return result(error, find[0]);
    });
  }

  public findOneById(collection: string, objectId: string, result: (error, data) => void): void {
    this.db.collection(collection).find({ _id: new ObjectID(objectId) }).limit(1).toArray((error, find) => {
      return result(error, find[0]);
    });
  }

  public insert(collection: string, model: User, result: (error, data) => void): void {
    this.db.collection(collection).insertOne(model, (error, insert) => {
      return result(error, insert);
    });
  }

  public update(collection: string, objectId: string, model: User, result: (error, data) => void): void {
    this.db.collection(collection).updateOne({ _id: new ObjectID(objectId) }, model, (error, update) => {
      return result(error, update);
    });
  }

  public remove(collection: string, objectId: string, result: (error, data) => void): void {
    this.db.collection(collection).deleteOne({ _id: new ObjectID(objectId) }, (error, remove) => {
      return result(error, remove);
    });
  }
}
