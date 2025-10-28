import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const configSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
});

// In a real app, this might come from a database or a separate config file
export const restaurantConfig = {
  capacities: {
    '1055c543-5589-446c-9390-3a9c6f85a3a2': 20, // Example restaurant
    default: 10,
  },
};

const parsedConfig = configSchema.safeParse(process.env);

if (!parsedConfig.success) {
  console.error(
    '❌ Invalid environment variables:',
    parsedConfig.error.flatten().fieldErrors
  );
  throw new Error('Invalid environment variables.');
}

export const config = parsedConfig.data;
