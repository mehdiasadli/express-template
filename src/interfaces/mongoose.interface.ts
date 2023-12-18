import { Types } from 'mongoose';

export interface IMongoose {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
