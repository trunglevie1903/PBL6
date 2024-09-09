// import Video from "../models/Video";
// import { Op } from 'sequelize';

// const VideoPrivacy = ["public", "private", "unlisted"] as const;
// const VideoStatus = ["published", "draft", "removed"] as const;

// class VideoService {
//   static uploadVideo = async (videoData: {
//     creator_user_id: string;
//     title: string;
//     description: string;
//     file_path: string;
//     thumbnail_path: string;
//     duration: number;
//     privacy: typeof VideoPrivacy[number];
//     status: typeof VideoStatus[number];
//   }) => {
//     try {
//       const newVideo = await Video.create(videoData);
//       return newVideo;
//     } catch (error) {
//       return new Error(`Cannot update video: ${new Object(error).toString()}`);
//     }
//   }

//   static updateVideo = async (
//     video_id: string,
//     updatedData: {
//       title?: string;
//       descriptions?: string;
//       privacy?: typeof VideoPrivacy[number];
//       status?: typeof VideoStatus[number];
//     }
//   ) => {
//     try {
//       const video = await Video.findByPk(video_id);
//       if (!video) return new Error(`Video not found`);
//       const updatedVideo = await video.update(updatedData);
//       return updatedVideo;
//     } catch (error) {
//       return new Error(`Error updating video: ${new Object(error).toString()}`);
//     }
//   }

//   static deleteVideo = async (
//     video_id: string
//   ) => {
//     try {
//       const video = await Video.findByPk(video_id);
//       if (!video) return new Error("Video not found");
//       const updatedVideo = await video.update({
//         status: "removed"
//       });
//       return updatedVideo;
//     } catch (error) {
//       return new Error(`Error deleting video: ${new Object(error).toString()}`);
//     }
//   }

//   static getVideoById = async (
//     video_id: string
//   ) => {
//     try {
//       const video = await Video.findByPk(video_id);
//       if (!video) return new Error("Video not found");
//       return video;
//     } catch (error) {
//       return new Error(`Error fetching video: ${new Object(error).toString()}`);
//     }
//   }

//   static getAllVideoByUser = async (
//     creator_user_id: string
//   ) => {
//     try {
//       const videos = await Video.findAll({
//         where: {
//           creator_user_id: {
//             [Op.eq]: creator_user_id
//           }
//         }
//       });
//       return videos;
//     } catch (error) {
//       return new Error(`Error fetching user's videos: ${new Object(error).toString()}`);
//     }
//   }

//   static incrementViewCount = async (
//     video_id: string
//   ) => {
//     try {
//       const video = await Video.findByPk(video_id);
//       if (!video) return new Error("Video not found");
//       await video.increment('view_count');
//       return video;
//     } catch (error) {
//       return new Error(`Error incrementing view count: ${new Object(error).toString()}`);
//     }
//   };

//   static likeVideo = async (video_id: string) => {
//     try {
//       const video = await Video.findByPk(video_id);
//       if (!video) throw new Error('Video not found');
  
//       await video.increment('like_count');
//       return video;
//     } catch (error) {
//       throw new Error(`Error liking video: ${error.message}`);
//     }
//   };

//   static dislikeVideo = async (video_id: string) => {
//     try {
//       const video = await Video.findByPk(video_id);
//       if (!video) throw new Error('Video not found');
  
//       await video.increment('dislike_count');
//       return video;
//     } catch (error) {
//       throw new Error(`Error disliking video: ${error.message}`);
//     }
// }

import { Op, Sequelize } from "sequelize";

import Video from "../models/Video";
import { VideoPrivacy, VideoStatus } from "../models/enums/enums";


class VideoService {
  // GET
  static findPublicPublishedVideos;
  static findRandomPublicPublishedVideos = async (
    numVideos?: number
  ) => {
    if (!numVideos) numVideos = 5;
    try {
      const result = await Video.findAll({
        order: Sequelize.literal("RAND()")
      });
      if (result instanceof Error) throw result;
      else return result;
    } catch (error) {
      return new Error(new Object(error).toString());
    }
  };

  static findPublicPublishedVideoById = async (
    videoId: string
  ) => {
    try {
      const video = await Video.findOne({
        where: {
          video_id: { [Op.eq]: videoId },
          privacy: { [Op.eq]: "public" },
          status: { [Op.eq]: "published" }
        }
      });
      if (!video) throw new Error("Video not found");
      else return video;
    } catch (error) {
      return new Error(new Object(error).toString());
    }
  };

  static findPublicPublishedVideosByCreatorId;
  static findPublicPublishedVideosByTitle;

  static findPrivatePublishedVideos;
  static findPrivatePublishedVideoById;
  static findPrivatePublishedVideosByCreatorId;

  static findUnlistedPublishedVideos;
  static findUnlistedPublishedVideoById;
  static findUnlistedPublishedVideosByCreatorId;

  static findPrivateVideos;
  static findPrivateVideoById;
  static findPrivateVideosByCreatorId;

  static findUnlistedVideos;
  static findUnlistedVideoById;
  static findUnlistedVideosByCreatorId;

  static findDraftVideos;
  static findDraftVideoById;
  static findDraftVideosByCreatorId;

  static findRemovedVideos;
  static findRemovedVideoById;
  static findRemovedVideosByCreatorId;

  static findAllVideos;
  static findAllVideoById;
  static findAllVideosByCreatorId;
  static findAllVideosByTitle;

  // POST
  static uploadVideo = async (
    videoData: {
      creator_user_id: string;
      title: string;
      description: string;
    }
  ) => {
    try {
      const newVideo = await Video.create(videoData);
      return newVideo;
    } catch (error) {
      return new Error(`Cannot upload video: ${new Object(error).toString()}`);
    }
  };

  // PATCH
  static updateVideo = async (
    videoId: string,
    updatedData: {
      title?: string;
      description?: string;
      file_path?: string;
      thumbnail_path?: string;
      duration?: number;
      view_count?: number;
      last_update_view_count?: Date;
      like_count?: number;
      last_update_like_count?: Date;
      dislike_count?: number;
      privacy?: typeof VideoPrivacy[number];
      status?: typeof VideoStatus[number];
    }
  ) => {
    const video = await Video.findByPk(videoId);
    try {
      if (!video) throw new Error("Video not found");
      const updatedVideo = await video.update(updatedData);
      if (updatedVideo instanceof Error) throw updatedVideo;
      else return updatedVideo;
    } catch (error) {
      return new Error(new Object(error).toString());
    }
  };

  static deleteVideo = async (
    videoId: string
  ) => {
    const video = await Video.findByPk(videoId);
    try {
      if (!video) throw new Error(`Video not found`);
      await video.destroy();
      return {};
    } catch (error) {
      return new Error(new Object(error).toString());
    }
  };
}

export default VideoService;