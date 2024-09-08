"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load the environment variables from the .env file
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
// Define the config object and export it
exports.config = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL || '',
    jwtSecret: process.env.JWT_SECRET || 'defaultsecret',
};
