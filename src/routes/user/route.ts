import { Router } from "express";
import { UserService } from "../../service/user/user.service";
import { userRepo } from "../../repositories/user/user.repo";
import { authMiddleware } from "../..//middleware/auth.middleware";
import { requireRole } from "../../middleware/auth.middleware";

const router = Router();
const userService = new UserService(userRepo);

router.put("/changePassword", authMiddleware, requireRole(["ADMIN", "USER"]), async (req, res) => {
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

router.get("/users", authMiddleware, requireRole(["ADMIN"]),  async (req, res, next) => {
  try {
    const users = await userService.listAllUsers();
    res.json({ users });
  } catch (err) {
    next(err);
  }
});

export default router;
