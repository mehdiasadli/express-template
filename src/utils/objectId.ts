import mongoose from 'mongoose';
import { z } from 'zod';

export const objectId = (message: string = 'Invalid ID', path: string[] = ['id']) =>
  z.string().refine(v => mongoose.isValidObjectId(v), {
    message,
    path,
  });
