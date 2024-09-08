"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const SALT_ROUNDS = 10;
const JWT_SECRET = config_1.config.jwtSecret;
const JWT_REFRESH_SECRET = config_1.config.jwtSecret;
const JWT_EXPIRES_IN = '15m'; // Short-lived access token
const JWT_REFRESH_EXPIRES_IN = '7d'; // Long-lived refresh token
class UserService {
    static registerUser(username, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const password_hash = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
            const newUser = yield User_1.default.create({ username, password_hash, email });
            return newUser;
        });
    }
    static loginUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ where: { username } });
            if (!user)
                throw new Error('User not found');
            if (user.is_locked && user.unlock_timestamp && user.unlock_timestamp > new Date()) {
                throw new Error('Account is locked');
            }
            const isMatch = yield bcrypt_1.default.compare(password, user.password_hash);
            if (!isMatch) {
                user.login_attempts += 1;
                if (user.login_attempts >= 5) {
                    user.is_locked = true;
                    user.unlock_timestamp = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes lock
                }
                yield user.save();
                throw new Error('Invalid password');
            }
            // Reset login attempts on successful login
            user.login_attempts = 0;
            user.last_login = new Date();
            yield user.save();
            // Generate JWT and refresh token
            const accessToken = jsonwebtoken_1.default.sign({ userId: user.user_id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
            const refreshToken = jsonwebtoken_1.default.sign({ userId: user.user_id, role: user.role }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
            // Store refresh token in the database
            user.refresh_token = refreshToken;
            yield user.save();
            return { user, accessToken, refreshToken };
        });
    }
    static refreshToken(oldRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jsonwebtoken_1.default.verify(oldRefreshToken, JWT_REFRESH_SECRET);
                const user = yield User_1.default.findOne({ where: { user_id: decoded.userId, refresh_token: oldRefreshToken } });
                if (!user)
                    throw new Error('User not found or invalid refresh token');
                // Generate new access and refresh tokens
                const newAccessToken = jsonwebtoken_1.default.sign({ userId: user.user_id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
                const newRefreshToken = jsonwebtoken_1.default.sign({ userId: user.user_id, role: user.role }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
                // Update the refresh token in the database
                user.refresh_token = newRefreshToken;
                yield user.save();
                return { accessToken: newAccessToken, refreshToken: newRefreshToken };
            }
            catch (error) {
                throw new Error('Invalid refresh token');
            }
        });
    }
    static logoutUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findByPk(userId);
            if (!user)
                throw new Error('User not found');
            // Invalidate refresh token on logout
            user.refresh_token = null;
            yield user.save();
        });
    }
    static findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findByPk(userId);
        });
    }
    static unlockUserAccount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findByPk(userId);
            if (!user)
                throw new Error('User not found');
            user.is_locked = false;
            user.unlock_timestamp = null;
            user.login_attempts = 0;
            yield user.save();
            return user;
        });
    }
}
exports.default = UserService;
