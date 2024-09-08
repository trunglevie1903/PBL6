"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
// src/config/database.ts
const sequelize_1 = require("sequelize");
const DB_NAME = "PBL6";
const DB_USER = "root";
const DB_PASS = "12345678";
const DB_HOST = "localhost";
const sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql',
});
exports.sequelize = sequelize;
