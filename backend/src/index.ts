import express from "express";
import { scanRouter } from "./api/scan";

const app = express();
app.use("/scan", scanRouter);

app.listen(3000);
