import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { Router } from "express";
import {
  getAllVideos,
  publishVideo,
  getVideoById,
  updateVideoById,
  deleteVideoById,
  getVideosByUser,
  searchVideos,
  getTrendingVideos,
  likeVideo,
  unlikeVideo,
  incrementViewCount,
} from "../controllers/video.controller.js";

const router = Router();

router.use(verifyJWT);

const videoUpload = upload.fields([
  { name: "video", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);

//Route for getting and publishing a video
router.route("/").get(getAllVideos).post(videoUpload, publishVideo);

// Route for getting videos by user
router.route("/user/:userId").get(getVideosByUser);

// Route for searching videos
router.route("/search").get(searchVideos);

// Route for getting trending videos
router.route("/trending").get(getTrendingVideos);

// Route for finding and deleting a video
router
  .route("/:videoId")
  .get(getVideoById)
  .patch(videoUpload, updateVideoById)
  .delete(deleteVideoById);

router.route("/:videoId/like").post(likeVideo);
router.route("/:videoId/unlike").post(unlikeVideo);
router.route("/:videoId/view").post(incrementViewCount);

export default router;
