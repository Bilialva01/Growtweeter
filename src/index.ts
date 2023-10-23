import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { userRoutes } from "./routes/user.routes";
import { authRoutes } from "./routes/auth.routes";
import { ResponseDto } from "./dtos/response.dto";
import { tweetRoutes } from "./routes/tweet.routes";
import { replieRoutes } from "./routes/replie.routes";
import { likeRoutes } from "./routes/like.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes());
app.use("/auth", authRoutes());
app.use("/tweet", tweetRoutes());
app.use("/replie", replieRoutes());
app.use("/like", likeRoutes());

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`rodando na porta:${port}`);
});
app.get("/", (req: Request, res: Response) => {
  const response: ResponseDto = {
    code: 200,
    message: "GrowTwitter",
  };

  return res.status(response.code).send(response);
});
