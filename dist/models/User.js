"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class User extends sequelize_1.Model {
}
User.init({
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password_hash: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    is_locked: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    unlock_timestamp: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    last_login: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('user', 'admin', 'moderator'),
        defaultValue: 'user',
    },
    login_attempts: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    two_factor_secret: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    last_password_reset: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    refresh_token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'User',
});
exports.default = User;
