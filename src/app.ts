import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./docs/swagger.json";

import { userRoutes } from "./routes/user.routes";
import { tweetRoutes } from "./routes/tweet.routes";
import { authRoutes } from "./routes/auth.routes";
import rootRoutes from "./routes/root.routes";
import { replieRoutes } from "./routes/replie.routes";
import { likeRoutes } from "./routes/like.routes";
import { followRoutes } from "./routes/follow.routes";
import { followerRoutes } from "./routes/follower.routes";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cors());
app.use(rootRoutes);
app.use("/users", userRoutes());
app.use("/auth", authRoutes());
app.use("/tweets", tweetRoutes());
app.use("/replies", replieRoutes());
app.use("/likes", likeRoutes());
app.use("/follow", followRoutes());
app.use("/follower", followerRoutes());

app.use("/docs", swaggerUi.serve);
app.use("/docs", swaggerUi.setup(swaggerDoc));

export default app;
