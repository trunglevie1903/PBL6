// import { DataTypes, Model, Optional } from "sequelize";
// import { sequelize } from "../config/database";
// import User from "./User";

// const VideoPrivacy = ["public", "private", "unlisted"] as const;
// const VideoStatus = ["published", "draft", "removed"] as const;

// interface Video_Interface {
//   video_id: string;
//   creator_user_id: string;
//   title: string;
//   description: string;
//   file_path: string;
//   thumbnail_path: string;
//   duration: number;
//   view_count?: number;
//   like_count?: number;
//   dislike_count?: number;
//   upload_date?: Date;
//   privacy?: typeof VideoPrivacy[number];
//   status?: typeof VideoStatus[number];
// }

// interface VideoCreation_Interface extends Optional<Video_Interface, "video_id" | "view_count" | "like_count" | "dislike_count" | 'upload_date' | 'privacy' | 'status'> {};

// class Video extends Model<
//   Video_Interface,
//   VideoCreation_Interface
// > implements Video_Interface {
//   public video_id!: string;
//   public creator_user_id!: string;
//   public title!: string;
//   public description!: string;
//   public file_path!: string;
//   public thumbnail_path!: string;
//   public duration!: number;
//   public view_count!: number;
//   public like_count!: number;
//   public dislike_count!: number;
//   public upload_date!: Date;
//   public privacy!: typeof VideoPrivacy[number];
//   public status!: typeof VideoStatus[number];
// }

// Video.init({
//   video_id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     allowNull: false,
//     primaryKey: true
//   },
//   creator_user_id: {
//     type: DataTypes.UUID,
//     allowNull: false
//   },
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   description: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   file_path: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   thumbnail_path: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   duration: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   view_count: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     defaultValue: 0
//   },
//   like_count: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     defaultValue: 0
//   },
//   dislike_count: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     defaultValue: 0
//   },
//   upload_date: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW
//   },
//   privacy: {
//     type: DataTypes.ENUM(...VideoPrivacy),
//     allowNull: false,
//     defaultValue: "public"
//   },
//   status: {
//     type: DataTypes.ENUM(...VideoStatus),
//     allowNull: false,
//     defaultValue: "draft"
//   }
// }, {
//   sequelize,
//   tableName: "Video",
//   timestamps: true
// });

// export default Video;

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

import User from "./User";
import { VideoPrivacy, VideoStatus } from "./enums/enums";

interface VideoInterface {
  video_id: string;
  creator_user_id: string;
  title: string;
  description: string;
  file_path: string;
  thumbnail_path: string;
  duration: number;
  view_count?: number;
  last_update_view_count?: Date;
  like_count?: number;
  last_update_like_count?: Date;
  dislike_count?: number;
  upload_date: Date;
  privacy?: typeof VideoPrivacy[number];
  status?: typeof VideoStatus[number];
}
interface VideoCreationInterface extends Optional<
  VideoInterface,
  "video_id" | "file_path" | "thumbnail_path" | 
  "view_count" | "last_update_view_count" | "like_count" | 
  "last_update_like_count" | "dislike_count" | "privacy" | 
  "status" | "upload_date"
>{};

class Video extends Model<
  VideoInterface, VideoCreationInterface
> implements VideoInterface {
  public video_id!: string;
  public creator_user_id!: string;
  public title!: string;
  public description!: string;
  public file_path!: string;
  public thumbnail_path!: string;
  public duration!: number;
  public view_count!: number;
  public last_update_view_count!: Date;
  public like_count!: number;
  public last_update_like_count!: Date;
  public dislike_count!: number;
  public upload_date!: Date;
  public privacy!: typeof VideoPrivacy[number];
  public status!: typeof VideoStatus[number];
};

Video.init({
  video_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  creator_user_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  file_path: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    unique: true
  },
  thumbnail_path: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    unique: true
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  view_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  last_update_view_count: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  like_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  last_update_like_count: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  dislike_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  upload_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  privacy: {
    type: DataTypes.ENUM(...VideoPrivacy),
    allowNull: false,
    defaultValue: "public"
  },
  status: {
    type: DataTypes.ENUM(...VideoStatus),
    allowNull: false,
    defaultValue: "draft"
  }
}, {
  sequelize,
  tableName: "Video",
  timestamps: true
});

export default Video;