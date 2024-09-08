// src/config/database.ts
import { Sequelize } from 'sequelize';
import { config } from '../config';

const DB_NAME = "PBL6";
const DB_USER = "root";
const DB_PASS = "12345678";
const DB_HOST = "localhost";

const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false
});

export { sequelize };
