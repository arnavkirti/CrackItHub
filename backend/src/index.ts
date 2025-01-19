import express from "express";
import cors from "cors";
import userRoutes from "./routes/user";
import adminRoutes from "./routes/admin";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

const PORT: Number = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
