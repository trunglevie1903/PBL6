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

import { Request, Response } from "express";
import UserService from "../services/User_Service";

export class UserController {
  static registerUser = async (
    req: Request, res: Response
  ) => {
    const {
      username, password, email
    } = req.body;
    try {
      const newUser = await UserService.registerUser(
        username, password, email
      );
      if (!newUser) throw new Error("Unexpected exception")
      else if (newUser instanceof Error) throw newUser;
      else res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: `Error registering user: ${new Object(error).toString()}` });
    }
  };

  static loginUser = async (
    req: Request, res: Response
  ) => {
    const { username, password } = req.body;
    try {
      const result = await UserService.loginUser(username, password);
      if (result instanceof Error) throw result;
      else res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: `Error logging user in: ${new Object(error).toString()}` });
    }
  };

  static logoutUser = async (
    req: Request, res: Response
  ) => {
    const userId = req.user?.userId || "";
    try {
      if (!userId) throw new Error("User not found");
      const result = await UserService.logoutUser(userId);
      if (result instanceof Error) throw result;
      else res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: `Error logging user out: ${new Object(error).toString()}` });
    }
  };

  static refreshToken = async (
    req: Request, res: Response
  ) => {
    const { refreshToken } = req.body;
    try {
      const result = await UserService.refreshToken(refreshToken);
      if (result instanceof Error) throw result;
      else res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: `Error refreshing token: ${new Object(error).toString()}` });
    }
  };

  static findUserById = async (
    req: Request, res: Response
  ) => {
    const userId = req.params.userId;
    try {
      if (!userId) throw new Error("UserId is empty");
      const result = await UserService.findUserById(userId);
      if (result instanceof Error) throw result;
      else res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: `Error fetching user by id: ${new Object(error).toString()}` });
    }
  };

  static findUserByUsername = async (
    req: Request, res: Response
  ) => {
    const username = req.params.username;
    try {
      if (!username) throw new Error("Input username is empty");
      const result = await UserService.findUserByUsername(username);
      if (result instanceof Error) throw result;
      else res.status(200).json(result);      
    } catch (error) {
      res.status(400).json({ error: `Error fetching user by username: ${new Object(error).toString()}` });
    }
  };

  static findLockedUsers = async (
    req: Request, res: Response
  ) => {
    try {
      const result = await UserService.findLockedUsers();
      if (result instanceof Error) throw result;
      else res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: `Error fetching locked users: ${new Object(error).toString()}` });
    }
  };

  static findLockedUserById;

  static findLockedUserByUsername;

  static findAllUsers;
  
  static findAllUserById;

  static findAllUserByUsername;

  static lockUser;

  static unlockUser;

  static updatePassword;
}

export default UserController;