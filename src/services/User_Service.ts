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
  static findUsers;

  static findUserById = async (userId: string) => {
    return await User.findOne({
      where: {
        user_id: {
          [Op.eq]: userId
        },
        is_locked: {
          [Op.eq]: false
        }
      }
    })
  };

  static findUserByUsername = async (username: string) => {
    return await User.findAll({
      where: {
        username: { [Op.like]: "%".concat(username).concat("%") },
        is_locked: { [Op.eq]: false }
      }
    });
  };
  
  static findUserByEmail;
  
  static findLockedUsers = async () => {
    return await User.findAll({
      where: {
        is_locked: { [Op.eq]: true }
      }
    });
  };
  
  static findLockedUserById = async (userId: string) => {
    return await User.findOne({
      where: {
        user_id: { [Op.eq]: userId },
        is_locked: { [Op.eq]: true }
      }
    });
  };
  
  static findLockedUserByUsername = async (username: string) => {
    return await User.findAll({
      where: {
        username: { [Op.like]: "%".concat(username).concat("%") },
        is_locked: { [Op.eq]: true }
      }
    });
  };
  
  static findLockedUserByEmail;

  static findAllUsers = async () => {
    return await User.findAll();
  };

  static findAllUserById = async (userId: string) => {
    return await User.findByPk(userId);
  };

  static findAllUserByUsername = async (username: string) => {
    return await User.findAll({
      where: {
        username: { [Op.like]: "%".concat(username).concat("%") }
      }
    });
  };

  static findAllUserByEmail;
  
  // POST
  static registerUser = async (
    username: string, password: string, email: string
  ) => {
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await User.create({
      username, password_hash, email
    });
    return newUser;
  };

  static loginUser = async (
    username: string, password: string
  ) => {
    const user = await User.findOne({ where: { username } });
    if (!user) return new Error("User not found");
    if (user.is_locked && user.unlock_timestamp && user.unlock_timestamp > new Date()) {
      return new Error("User is locked");
    }
    
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      user.login_attempts += 1;
      if (user.login_attempts >= 5) {
        user.is_locked = true;
        user.unlock_timestamp = new Date(Date.now() + 5 * 60 * 1000);
      }
      await user.save();
      return new Error("Invalid password");
    }

    user.login_attempts = 0;
    user.last_login = new Date();
    await user.save();

    const payload = {
      userId: user.user_id,
      role: user.role
    };
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });

    user.refresh_token = refreshToken;
    await user.save();
    return {
      user, accessToken, refreshToken
    };
  };

  static refreshToken = async (
    oldToken: string
  ) => {
    try {
      const decoded = jwt.verify(oldToken, JWT_REFRESH_SECRET) as JwtPayload;
      const user = await User.findOne({
        where: {
          user_id: {
            [Op.eq]: decoded.userId
          },
          refresh_token: {
            [Op.eq]: oldToken
          }
        }
      });
      if (!user) return new Error("User not found or invalid refresh token");

      const payload = {
        userId: user.user_id,
        role: user.role
      }
      const newAccessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
      const newRefreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
      user.refresh_token = newRefreshToken;
      await user.save();
      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      };
    } catch (error) {
      return new Error(`Invalid refresh token: ${new Object(error).toString()}`);
    }
  };

  static logoutUser = async (
    userId: string
  ) => {
    const user = await User.findByPk(userId);
    if (!user) return new Error("User not found");
    user.refresh_token = null;
    await user.save();
    return {};
  };

  // PATCH
  static lockUser = async (userId: string, lockDurationMilliseconds: number) => {
    const user = await this.findUserById(userId);
    if (!user) return new Error("User not found");
    user.is_locked = true;
    user.unlock_timestamp = new Date(Date.now() + lockDurationMilliseconds);
    user.login_attempts = 100;
    await user.save();
    return user;
  };

  static unlockUser = async (userId: string) => {
    const user = await this.findLockedUserById(userId);
    if (!user) return new Error("User not found");
    
    user.is_locked = false;
    user.unlock_timestamp = null;
    user.login_attempts = 0;
    await user.save();
    return user;
  };

  static updateUser;

  static updatePassword = async (
    userId: string,
    updatedData: {
      oldPassword: string,
      newPassword: string
    }
  ) => {
    const user = await this.findUserById(userId);
    if (!user) return new Error("User not found");

    const isMatch = await bcrypt.compare(
      updatedData.oldPassword, user.password_hash
    );
    if (!isMatch) {
      user.login_attempts += 1;
      if (user.login_attempts >= 5) {
        user.is_locked = true;
        user.unlock_timestamp = new Date(Date.now() + 5 * 60 * 1000);
        await user.save();
        return new Error("Invalid password");
      }
    }
    user.password_hash = await bcrypt.hash(updatedData.newPassword, SALT_ROUNDS);
    await user.save();
    return user;
  };
}

export default UserService;