import { objectId } from 'utils';
import { TypeOf, z } from 'zod';

export const GetUserByIdDto = z.object({
  params: z.object({
    id: objectId('Invalid user ID'),
  }),
});

export type GetUserByIdDtoT = TypeOf<typeof GetUserByIdDto>;
