import * as z from 'zod';

export const emailSchema = z.object({
  email: z
    .string({
      required_error: 'Email cannot be empty',
      invalid_type_error: 'Email must be a string',
    })
    .email({
      message: 'Please enter a valid email address',
    }),
});

// export default z.infer;
