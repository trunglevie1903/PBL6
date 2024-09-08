"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/userRoutes.ts
const express_1 = require("express");
const User_Controller_1 = require("../controllers/User_Controller");
// const router = Router();
// router.post('/register', UserController.register);          // User registration
// router.post('/login', UserController.login);                // User login
// router.post('/logout', authenticateToken, UserController.logout);  // User logout, requires JWT
// router.post('/refresh-token', UserController.refreshToken); // Refresh token endpoint
// router.post('/unlock/:userId', UserController.unlockAccount); // Unlock user account
// export default router;
const UserRoute = (0, express_1.Router)();
UserRoute.route('/register').post(User_Controller_1.UserController.register);
UserRoute.route('/login').post(User_Controller_1.UserController.login);
UserRoute.route('/logout').post(User_Controller_1.UserController.logout);
UserRoute.route('/refresh-token').post(User_Controller_1.UserController.refreshToken);
UserRoute.route('/unlock/:userId').post(User_Controller_1.UserController.unlockAccount);
exports.default = UserRoute;
