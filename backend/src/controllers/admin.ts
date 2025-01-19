import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export const AdminSignup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, role, exam } = req.body;

    if (!name || !email || !password || !role || !exam) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        exam,
      },
    });

    const token = jwt.sign(
      {
        adminId: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET as string,
      { expiresIn: "3h" }
    );

    res.status(200).json({
      message: "New User Created Successfully",
      token,
      admin: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        exam: user.exam,
      },
    });
  } catch (error) {
    console.log("Error during Signup", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
