// import { Model, DataTypes } from "sequelize";
// import { sequelize } from "../config/database";
// import Video from "./Video";

// class User extends Model {
//   public user_id!: string;
//   public username!: string;
//   public password_hash!: string;
//   public email!: string;
//   public is_locked!: boolean;
//   public unlock_timestamp!: Date | null;
//   public last_login!: Date | null;
//   public role!: string;
//   public login_attempts!: number;
//   public two_factor_secret!: string | null;
//   public last_password_reset!: Date;
//   public refresh_token!: string | null;  // Add refresh token field
// }

// User.init({
//   user_id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     allowNull: false,
//     primaryKey: true,
//   },
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password_hash: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   is_locked: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false,
//   },
//   unlock_timestamp: {
//     type: DataTypes.DATE,
//     allowNull: true,
//   },
//   last_login: {
//     type: DataTypes.DATE,
//     allowNull: true,
//   },
//   role: {
//     type: DataTypes.ENUM('user', 'admin', 'moderator'),
//     defaultValue: 'user',
//   },
//   login_attempts: {
//     type: DataTypes.INTEGER,
//     defaultValue: 0,
//   },
//   two_factor_secret: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   last_password_reset: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
//   refresh_token: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
// }, {
//   sequelize,
//   tableName: 'User',
//   timestamps: true
// });

// User.hasMany(Video, {
//   sourceKey: "user_id", foreignKey: "creator_user_id"
// });

// export default User;

import { DataTypes as DT, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

import { UserRole } from './enums/enums';
import Video from './Video';

interface UserInterface {
  user_id: string;
  username: string;
  password_hash: string;
  email: string;
  role: typeof UserRole[number];
  last_password_reset: Date;
  login_attempts: number;
  is_locked: boolean;
  unlock_timestamp?: Date | null;
  last_login?: Date | null;
  refresh_token?: string | null;
}

interface UserCreationInterface extends Optional<
  UserInterface,
  "user_id" | "unlock_timestamp" | "last_login" | "refresh_token"
>{}

class User extends Model<
  UserInterface, UserCreationInterface
> implements UserInterface {
  public user_id!: string;
  public username!: string;
  public password_hash!: string;
  public email!: string;
  public role!: typeof UserRole[number];
  public last_password_reset!: Date;
  public login_attempts!: number;
  public is_locked!: boolean;
  public unlock_timestamp!: Date;
  public last_login!: Date;
  public refresh_token!: string;
}

User.init({
  user_id: {
    type: DT.UUID,
    defaultValue: DT.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: DT.STRING,
    allowNull: false
  },
  password_hash: {
    type: DT.STRING,
    allowNull: false
  },
  email: {
    type: DT.STRING,
    allowNull: false
  },
  role: {
    type: DT.ENUM(...UserRole),
    defaultValue: "user",
    allowNull: false
  },
  last_password_reset: {
    type: DT.DATE,
    allowNull: false,
    defaultValue: DT.NOW
  },
  login_attempts: {
    type: DT.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  is_locked: {
    type: DT.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  unlock_timestamp: {
    type: DT.DATE,
    allowNull: true
  },
  last_login: {
    type: DT.DATE,
    allowNull: true
  },
  refresh_token: {
    type: DT.STRING,
    allowNull: true
  }
}, {
  sequelize,
  tableName: "User",
  timestamps: true
});

User.hasMany(Video, {
  sourceKey: "user_id",
  foreignKey: "creator_user_id"
});

export default User;