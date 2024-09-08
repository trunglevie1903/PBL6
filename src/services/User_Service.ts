// import User from "../models/User";
// import bcrypt from "bcrypt";
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import { Op } from 'sequelize';

// import { config } from "../config";

// const SALT_ROUNDS = 10;
// const JWT_SECRET = config.jwtSecret;
// const JWT_REFRESH_SECRET = config.jwtSecret;
// const JWT_EXPIRES_IN = '15m'; // Short-lived access token
// const JWT_REFRESH_EXPIRES_IN = '7d'; // Long-lived refresh token

// class UserService {
//   static async registerUser(username: string, password: string, email: string) {
//     const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
//     const newUser = await User.create({ username, password_hash, email });
//     return newUser;
//   }

//   static async loginUser(username: string, password: string) {
//     const user = await User.findOne({ where: { username } });
//     if (!user) return new Error('User not found');
//     if (user.is_locked && user.unlock_timestamp && user.unlock_timestamp > new Date()) {
//       return new Error('Account is locked');
//     }
//     const isMatch = await bcrypt.compare(password, user.password_hash);
//     if (!isMatch) {
//       user.login_attempts += 1;
//       if (user.login_attempts >= 5) {
//         user.is_locked = true;
//         user.unlock_timestamp = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes lock
//       }
//       await user.save();
//       return new Error('Invalid password');
//     }

//     // Reset login attempts on successful login
//     user.login_attempts = 0;
//     user.last_login = new Date();
//     await user.save();

//     // Generate JWT and refresh token
//     const accessToken = jwt.sign({ userId: user.user_id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
//     const refreshToken = jwt.sign({ userId: user.user_id, role: user.role }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });

//     // Store refresh token in the database
//     user.refresh_token = refreshToken;
//     await user.save();
//     return { user, accessToken, refreshToken };
//   }

//   static async refreshToken(oldRefreshToken: string) {
//     try {
//       const decoded = jwt.verify(oldRefreshToken, JWT_REFRESH_SECRET) as JwtPayload;
//       const user = await User.findOne({ where: { user_id: decoded.userId, refresh_token: oldRefreshToken } });
//       if (!user) throw new Error('User not found or invalid refresh token');

//       // Generate new access and refresh tokens
//       const newAccessToken = jwt.sign({ userId: user.user_id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
//       const newRefreshToken = jwt.sign({ userId: user.user_id, role: user.role }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });

//       // Update the refresh token in the database
//       user.refresh_token = newRefreshToken;
//       await user.save();

//       return { accessToken: newAccessToken, refreshToken: newRefreshToken };
//     } catch (error) {
//       throw new Error('Invalid refresh token');
//     }
//   }

//   static async logoutUser(userId: string) {
//     const user = await User.findByPk(userId);
//     if (!user) throw new Error('User not found');

//     // Invalidate refresh token on logout
//     user.refresh_token = null;
//     await user.save();
//     return {};
//   }

//   static async findUserById(userId: string) {
//     return await User.findByPk(userId);
//   }

//   static async unlockUserAccount(userId: string) {
//     const user = await User.findByPk(userId);
//     if (!user) throw new Error('User not found');

//     user.is_locked = false;
//     user.unlock_timestamp = null;
//     user.login_attempts = 0;
//     await user.save();
//     return user;
//   }
// }

// export default UserService;

import bcrypt from "bcrypt";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Op } from 'sequelize';

import { config } from "../config";
import User from "../models/User";
import { UserRole } from "../models/enums/enums";

const SALT_ROUNDS = 10;
const JWT_SECRET = config.jwtSecret;
const JWT_REFRESH_SECRET = config.jwtSecret;
const JWT_EXPIRES_IN = '15m'; // Short-lived access token
const JWT_REFRESH_EXPIRES_IN = '7d'; // Long-lived refresh token

class UserService {
  // GET
  static getUsers; // get all users
  static getUserById; // get user via user_id
  static getUserByUsername; // get user via username
  static getUserByEmail; // get user via email
  static getPasswordById; // get user's password via user_id, for changing password task
  // POST
  static registerUser; // create new user
  static loginUser; 
  static refreshToken; // refresh user's refreshToken
  static logoutUser; 
  static unlockAccount; // unlock user's account from being lock by login failed
  // PATCH
  static updatePassword; // change the password of user's account
  // DELETE
  static deleteUser; // delete user
}

export default UserService;