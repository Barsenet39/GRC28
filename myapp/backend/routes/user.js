const router = require("express").Router();
const userController = require("../controllers/userController");
const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken");

// UPADATE USER
router.put("/", verifyTokenAndAuthorization, userController.updateUser);

router.get(
  "/verify/:otp",
  verifyTokenAndAuthorization,
  userController.verifyAccount
);
router.get("/customer_service", userController.getAdminNumber);
router.post(
  "/feedback",
  verifyTokenAndAuthorization,
  userController.userFeedback
);
router.get(
  "/verify_phone/:phone",
  verifyTokenAndAuthorization,
  userController.verifyPhone
);

router.delete("/", verifyTokenAndAuthorization, userController.deleteUser);
router.get("/", verifyTokenAndAuthorization, userController.getUser);
router.get("/dg", verifyTokenAndAuthorization, userController.getGeneralD);
router.get("/sgd", verifyTokenAndAuthorization, userController.getSubGeneralD);
router.get("/dh", verifyTokenAndAuthorization, userController.getDH);
router.get("/dd", verifyTokenAndAuthorization, userController.getDD);

module.exports = router;
