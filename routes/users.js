const router = require("express").Router();
const userController = require("../app/controllers/UserController");
const multer = require("multer");
const fileUploader = require("../app/middleware/uploadMiddleware");
const auth = require("../app/middleware/auth");

router.post(
  "/register",
  fileUploader.single("avatar"),
  userController.register
);

router.patch(
  "/avatar",
  fileUploader.single("avatar"),
  userController.updateAvatar
);

router.patch(
  "/cover-img",
  fileUploader.single("coverImg"),
  userController.updateCoverImg
);

router.use(multer().none());

router.post("/login", userController.login);

router.get("/logout", userController.logout);

module.exports = router;
