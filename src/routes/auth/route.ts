import { Router } from "express";
import { UserService } from "../../service/user/user.service";
import { userRepo } from "../../repositories/user/user.repo";

const router = Router();
const userService = new UserService(userRepo);

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    await userService.register(email, password);
    res.json({ message: "Register success" });
  } catch (err: any) {
    if (err.message === "EMAIL_ALREADY_EXISTS") {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(400).json({ message: "Invalid input" });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await userService.login(
      email,
      password
    );
    res.json(result);
  } catch (err: any) {
    if (err.message === "PASSWORD_INCORRECT") {
      return res.status(400).json({ message: "Password is incorrect" });
    }
    next(err);
  }
});

export default router;
