// // routes/userRoutes.ts
// import { Router } from 'express';
// import { UserController } from '../controllers/User_Controller';
// import { authenticateToken } from '../middlewares/authMiddleware'; // Middleware to verify JWT

// const UserRoute = Router();

// UserRoute.route('/register').post(UserController.register);
// UserRoute.route('/login').post(UserController.login);
// UserRoute.route('/logout').post(authenticateToken, UserController.logout);
// UserRoute.route('/refresh-token').post(UserController.refreshToken);
// UserRoute.route('/unlock/:userId').post(UserController.unlockAccount);

// export default UserRoute;

import { Router } from "express";
import UserController from "../controllers/User_Controller";
import { authenticateToken } from "../middlewares/authMiddleware";

const UserRouter = Router();

UserRouter.route('/register').post(UserController.registerUser);
UserRouter.route("/login").post(UserController.loginUser);
UserRouter.route('/refresh-token').post(UserController.refreshToken);
UserRouter.route("/logout").post(authenticateToken, UserController.logoutUser);
UserRouter.route("/lock").post(authenticateToken, UserController.lockUser);
UserRouter.route("/unlock/:userId").post(authenticateToken, UserController.unlockUser);
UserRouter.route("/change-password").post(authenticateToken, UserController.updatePassword);

UserRouter.route("/id/:userId").get(UserController.findUserById);
UserRouter.route("/username/:username").post(UserController.findUserByUsername);
UserRouter.route("/search/:value").get();

UserRouter.route("/locked-user").get(UserController.findLockedUsers);
UserRouter.route("/all-user").get(UserController.findAllUsers);

export default UserRouter;