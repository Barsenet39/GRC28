const router = require("express").Router();

// Import controllers for each role
const customerAuth = require("../controllers/customer/authController");
const dgAuth = require("../controllers/DirectorGeneral/authController");
const ddAuth = require("../controllers/DeputyDirector/authController");
const dd1Auth = require("../controllers/DirectorateDirector1/authController");
const dd2Auth = require("../controllers/DirectorateDirector2/authController");
const dhCSMAuth = require("../controllers/DivisionHeadCSM/authController");
const dhCSRMAuth = require("../controllers/DivisionHeadCSRM/authController");
const dh2Auth = require("../controllers/DivisionHead2/authController");
const expertAuth = require("../controllers/Expert/authController");
const tmAuth = require("../controllers/TechnicalManager/authController");
const pmAuth = require("../controllers/ProjectManager/authController");

const verifyEmail = require("../middlewares/verifyEmail");

// Customer Routes
router.post("/customer/register", customerAuth.createUser);
router.post("/customer/signin", customerAuth.signInUser);
router.post("/customer/forgot-password", customerAuth.forgotPassword);
router.post("/customer/reset-password", customerAuth.resetPassword);

// Director General Routes
router.post("/dg/register", dgAuth.createUser);
router.post("/dg/signin", dgAuth.signInUser);
router.post("/dg/verify-email", dgAuth.verifyEmail);
router.post("/dg/logout", dgAuth.logoutUser);
router.post("/dg/forgot-password", dgAuth.forgotPassword);
router.post("/dg/reset-password", dgAuth.resetPassword);

// Deputy Director Routes
router.post("/dd/register", ddAuth.createUser);
router.post("/dd/signin", ddAuth.signInUser);
router.post("/dd/forgot-password", ddAuth.forgotPassword);
router.post("/dd/reset-password", ddAuth.resetPassword);

// Directorate Director 1 Routes
router.post("/dd1/register", dd1Auth.createUser);
router.post("/dd1/signin", dd1Auth.signInUser);
router.post("/dd1/forgot-password", dd1Auth.forgotPassword);
router.post("/dd1/reset-password", dd1Auth.resetPassword);

// Directorate Director 2 Routes
router.post("/dd2/register", dd2Auth.createUser);
router.post("/dd2/signin", dd2Auth.signInUser);
router.post("/dd2/forgot-password", dd2Auth.forgotPassword);
router.post("/dd2/reset-password", dd2Auth.resetPassword);

// Division Head CSM Routes
router.post("/dhcsm/register", dhCSMAuth.createUser);
router.post("/dhcsm/signin", dhCSMAuth.signInUser);
router.post("/dhcsm/forgot-password", dhCSMAuth.forgotPassword);
router.post("/dhcsm/reset-password", dhCSMAuth.resetPassword);

// Division Head CSRM Routes
router.post("/dhcsrm/register", dhCSRMAuth.createUser);
router.post("/dhcsrm/signin", dhCSRMAuth.signInUser);
router.post("/dhcsrm/forgot-password", dhCSRMAuth.forgotPassword);
router.post("/dhcsrm/reset-password", dhCSRMAuth.resetPassword);

// Division Head 2 Routes
router.post("/dh2/register", dh2Auth.createUser);
router.post("/dh2/signin", dh2Auth.signInUser);
router.post("/dh2/forgot-password", dh2Auth.forgotPassword);
router.post("/dh2/reset-password", dh2Auth.resetPassword);

// Expert Routes
router.post("/expert/register", expertAuth.createUser);
router.post("/expert/signin", expertAuth.signInUser);
router.post("/expert/forgot-password", expertAuth.forgotPassword);
router.post("/expert/reset-password", expertAuth.resetPassword);

// Technical Manager Routes
router.post("/tm/register", tmAuth.createUser);
router.post("/tm/signin", tmAuth.signInUser);
router.post("/tm/forgot-password", tmAuth.forgotPassword);
router.post("/tm/reset-password", tmAuth.resetPassword);

// Project Manager Routes
router.post("/pm/register", pmAuth.createUser);
router.post("/pm/signin", pmAuth.signInUser);
router.post("/pm/forgot-password", pmAuth.forgotPassword);
router.post("/pm/reset-password", pmAuth.resetPassword);

module.exports = router;
