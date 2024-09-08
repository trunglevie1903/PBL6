import dotenv from 'dotenv';
import path from 'path';

// Load the environment variables from the .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

interface Config {
  port: string | number;
  databaseUrl: string;
  jwtSecret: string;
}

// Define the config object and export it
export const config: Config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL || '',
  jwtSecret: process.env.JWT_SECRET || 'defaultsecret',
};
