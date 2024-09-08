"use strict";
// middleware/authMiddleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    try {
        const secret = process.env.JWT_SECRET || 'yourSecret';
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        // Ensure the token is a payload object, not a string
        if (typeof decoded === 'object' && 'userId' in decoded) {
            req.user = { userId: decoded.userId }; // Typecast and assign
        }
        else {
            return res.status(401).json({ message: 'Invalid token payload' });
        }
        next();
    }
    catch (error) {
        return res.status(403).json({ message: 'Unauthorized' });
    }
};
exports.authenticateToken = authenticateToken;
