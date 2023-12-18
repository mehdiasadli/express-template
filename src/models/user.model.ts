import { IUser } from 'interfaces/user.interface';
import { Document, Schema, model } from 'mongoose';

const UserSchema: Schema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        delete ret.__v;
        delete ret.password;

        return ret;
      },
    },
  },
);

export const UserModel = model<IUser & Document>('User', UserSchema);
