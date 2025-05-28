import Customer from "../../models/Customer.js";
import DirectorGeneral from "../../models/DirectorGeneral.js";
import DeputyDirector from "../../models/DeputyDirector.js";
import DirectorateDirector1 from "../../models/DirectorateDirector1.js";
import DirectorateDirector2 from "../../models/DirectorateDirector2.js";
import DivisionHeadCSM from "../../models/DivisionHeadCSM.js";
import DivisionHeadCSRM from "../../models/DivisionHeadCSRM.js";
import DivisionHead2 from "../../models/DivisionHead2.js";
import Expert from "../../models/Expert.js";
import TechnicalManager from "../../models/TechnicalManager.js";
import ProjectManager from "../../models/ProjectManager.js";

import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import sendLoginAlertEmail from "../../utils/login_alert.js";

const roleModels = {
  customer: Customer,
  dg: DirectorGeneral,
  dd: DeputyDirector,
  dd1: DirectorateDirector1,
  dd2: DirectorateDirector2,
  dhcsm: DivisionHeadCSM,
  dhcsrm: DivisionHeadCSRM,
  dh2: DivisionHead2,
  expert: Expert,
  tm: TechnicalManager,
  pm: ProjectManager,
};

export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!role || !roleModels[role]) {
    return res.status(400).json({ status: false, message: "Invalid user role." });
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ status: false, message: "Invalid email format" });
  }

  if (password.length < 8) {
    return res.status(400).json({
      status: false,
      message: "Password should be at least 8 characters long",
    });
  }

  const MAX_ATTEMPTS = 3;
  const LOCKOUT_TIME = 15 * 60 * 1000;

  try {
    const UserModel = roleModels[role];
    const user = await UserModel.findOne({ email }, { __v: 0, createdAt: 0, updatedAt: 0 });

    if (!user) {
      return res.status(401).json({ status: false, message: "User not found" });
    }

    if (user.lockUntil && user.lockUntil > Date.now()) {
      const remainingTime = Math.ceil((user.lockUntil - Date.now()) / 1000 / 60);
      return res.status(403).json({
        status: false,
        message: `Account locked. Try again in ${remainingTime} minutes.`,
      });
    }

    const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET)
      .toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== password) {
      user.failedAttempts = (user.failedAttempts || 0) + 1;

      if (user.failedAttempts >= MAX_ATTEMPTS) {
        user.lockUntil = Date.now() + LOCKOUT_TIME;
        await user.save();
        return res.status(403).json({
          status: false,
          message: `Too many failed attempts. Account locked for ${LOCKOUT_TIME / 60000} minutes.`,
        });
      }

      await user.save();
      return res.status(401).json({ status: false, message: "Wrong password" });
    }

    user.failedAttempts = 0;
    user.lockUntil = null;
    await user.save();

    const userToken = jwt.sign(
      {
        id: user._id,
        role,
        email: user.email,
      },
      process.env.JWT_SEC,
      { expiresIn: "21d" }
    );

    await sendLoginAlertEmail(user.email, req.ip, req.headers["user-agent"]);

    const { password: _, otp, ...userData } = user._doc;

    return res.status(200).json({
      ...userData,
      userToken,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};
