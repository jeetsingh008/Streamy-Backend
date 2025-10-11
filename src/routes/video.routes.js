import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { Router } from "express";

const router = Router();

router.use(verifyJWT);

const videoUpload = upload.fields([
  { name: "video", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);

//Route for getting and publishing a video
router.route("/").get(getAllVideos).post(videoUpload, publishVideo);

// Route for finding and deleting a video
router
  .route("/:videoId")
  .get(getVideoById)
  .patch(videoUpload, updateVideoById)
  .delete(deleteVideoById);

export default router;
