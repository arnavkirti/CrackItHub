import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export const UserSignup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role, exam } = req.body;

    if (!name || !email || !password || !role || !exam) {
      res.status(400).json(new ApiError(400, "All Fields are required"));
      return; // Make sure to return to prevent further execution
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      res.status(404).json(new ApiError(404, "User already exists"));
      return; // Make sure to return to prevent further execution
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
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET as string,
      { expiresIn: "3h" }
    );

    // Set the cookie and then send the response
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3 * 60 * 60 * 1000, // 3 hours in milliseconds
    });

    res.status(200).json(new ApiResponse(200, "User Registered Successfully", user));
  } catch (error) {
    console.log("Error during Signup", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const UserLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json(new ApiError(400, "Both Fields are required"));
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      res.status(404).json(new ApiError(404, "User not Found"));
      return; // Ensure to return to avoid further execution
    }

    // Assuming you are using bcryptjs to compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      res.status(405).json(new ApiError(405, "Invalid Password"));
      return; // Ensure to return to avoid further execution
    }

    const token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      },
      JWT_SECRET as string, // Ensure JWT_SECRET is typed correctly and exists
      { expiresIn: "3h" }
    );

    // Set the cookie and then send the response
    res.cookie("token", token, {
      httpOnly: true, // Set cookie to be HTTP-only for security
      maxAge: 3 * 60 * 60 * 1000, // 3 hours in milliseconds
    });

    res.status(200).json(new ApiResponse(200, "User Logged In Successfully", existingUser));
  } catch (error) {
    console.log("Error during Login", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**resolved this error :
 * Error: Cannot set headers after they are sent to the client
    at ServerResponse.setHeader (node:_http_outgoing:659:11)
    at ServerResponse.header (C:\Users\addiv\OneDrive\Desktop\WebDev\PROJECTS\Project=4\CrackItHub\backend\node_modules\express\lib\response.js:794:10)
    at ServerResponse.send (C:\Users\addiv\OneDrive\Desktop\WebDev\PROJECTS\Project=4\CrackItHub\backend\node_modules\express\lib\response.js:174:12)
    at ServerResponse.json (C:\Users\addiv\OneDrive\Desktop\WebDev\PROJECTS\Project=4\CrackItHub\backend\node_modules\express\lib\response.js:278:15)
    at C:\Users\addiv\OneDrive\Desktop\WebDev\PROJECTS\Project=4\CrackItHub\backend\src\controllers\user.ts:62:21
    at Generator.next (<anonymous>)
    at fulfilled (C:\Users\addiv\OneDrive\Desktop\WebDev\PROJECTS\Project=4\CrackItHub\backend\src\controllers\user.ts:5:58) {
  code: 'ERR_HTTP_HEADERS_SENT'
 */