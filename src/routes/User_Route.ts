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