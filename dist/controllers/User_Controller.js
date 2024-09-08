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
exports.UserController = void 0;
const User_Service_1 = __importDefault(require("../services/User_Service"));
class UserController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, email } = req.body;
            try {
                const newUser = yield User_Service_1.default.registerUser(username, password, email);
                res.status(201).json(newUser);
            }
            catch (error) {
                res.status(400).json({ error: error });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                const result = yield User_Service_1.default.loginUser(username, password);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(400).json({ error: error });
            }
        });
    }
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId) || ''; // Assume userId is added to req object after auth middleware
            try {
                if (!userId)
                    throw new Error('User not exist');
                yield User_Service_1.default.logoutUser(userId);
                res.status(200).send('Logged out successfully');
            }
            catch (error) {
                res.status(400).json({ error: error });
            }
        });
    }
    static refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refreshToken } = req.body;
            try {
                const result = yield User_Service_1.default.refreshToken(refreshToken);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(400).json({ error: error });
            }
        });
    }
    static unlockAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const user = yield User_Service_1.default.unlockUserAccount(userId);
                res.status(200).json(user);
            }
            catch (error) {
                res.status(400).json({ error: error });
            }
        });
    }
}
exports.UserController = UserController;
