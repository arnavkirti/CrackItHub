import express from "express";
import { AdminSignup } from "../controllers/admin";

const router = express.Router();

router.post("/signup", AdminSignup);

export default router;
