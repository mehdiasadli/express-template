import { IMongoose } from './mongoose.interface';

export interface IUser extends IMongoose {
  email: string;
  password: string;
}
