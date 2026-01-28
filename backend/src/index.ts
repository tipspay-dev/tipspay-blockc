import express from "express";
import hostingRoutes from "./routes/hosting";

const app = express();
app.use(express.json());

app.use("/api", hostingRoutes);

app.listen(4000, () => console.log("Backend running on port 4000"));

