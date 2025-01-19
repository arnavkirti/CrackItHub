import express from "express";
import { UserSignup } from "../controllers/user";
const router = express.Router();

router.post("/signup", UserSignup);

export default router;
