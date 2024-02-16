import { z } from "zod";

export default z.object({
  creationTime: z.string(),
  // displayName will be null if user does not sign in with Google
  displayName: z.string().nullable(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  // Google does not seem to add a phone number - I've only ever seen this as null
  phoneNumber: z.string().nullable(),
  // photoURL will be null if user does not sign in with Google
  photoURL: z.string().nullable(),
  providerId: z.string(),
});
