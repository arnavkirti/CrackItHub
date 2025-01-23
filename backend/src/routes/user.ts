import express from "express";
import { UserLogin, UserSignup } from "../controllers/user";
const router = express.Router();

router.post("/signup", UserSignup);
router.post('/login', UserLogin);

export default router;
