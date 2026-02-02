import { Router } from "express";
import { UserService } from "../service/user.service";
import { userRepo } from "../repositories/user.repo";

const router = Router();
const userService = new UserService(userRepo);

router.put("/changePassword", async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    await userService.changePassword(email, oldPassword, newPassword);
    res.json({ message: "Password changed success" });
  } catch (err: any) {
    if (err.message === "USER_NOT_FOUND") {
      return res.status(404).json({ message: "User not found" });
    }
    if (err.message === "INVALID_PASSWORD") {
      return res.status(400).json({ message: "Wrong password" });
    }
    res.status(400).json({ message: "Invalid input" });
  }
});

export default router;
