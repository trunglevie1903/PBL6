// import { Request, Response } from "express";
// import UserService from "../services/User_Service";

// export class UserController {
//   static async register(req: Request, res: Response) {
//     const { username, password, email } = req.body;
//     try {
//       const newUser = await UserService.registerUser(username, password, email);
//       res.status(201).json(newUser);
//     } catch (error) {
//       res.status(400).json({ error: new Object(error).toString() });
//     }
//   }

//   static async login(req: Request, res: Response) {
//     const { username, password } = req.body;
//     try {
//       const result = await UserService.loginUser(username, password);
//       if (result instanceof Error) throw result;
//       else res.status(200).json(result);
//     } catch (error) {
//       res.status(400).json({ error: new Object(error).toString() });
//     }
//   }

//   static async logout(req: Request, res: Response) {
//     const userId = req.user?.userId || ''; // Assume userId is added to req object after auth middleware
//     try {
//       if (!userId) throw new Error('User not exist');
//       const result = await UserService.logoutUser(userId);
//       if (result instanceof Error) throw result;
//       else res.status(200).send('Logged out successfully');
//     } catch (error) {
//       res.status(400).json({ error: new Object(error).toString() });
//     }
//   }

//   static async refreshToken(req: Request, res: Response) {
//     const { refreshToken } = req.body;
//     try {
//       const result = await UserService.refreshToken(refreshToken);
//       if (result instanceof Error) throw result;
//       else res.status(200).json(result);
//     } catch (error) {
//       res.status(400).json({ error: new Object(error).toString() });
//     }
//   }

//   static async unlockAccount(req: Request, res: Response) {
//     const { userId } = req.params;
//     try {
//       const user = await UserService.unlockUserAccount(userId);
//       res.status(200).json(user);
//     } catch (error) {
//       res.status(400).json({ error: new Object(error).toString() });
//     }
//   }
// }
