import d from "dotenv";
d.config();
import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import { s } from "./models/user";

const app = express();
app.use(bodyParser.json());

app.use("/api/users", userRoutes);

s.sync().then(() => console.log("Database synced"));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
