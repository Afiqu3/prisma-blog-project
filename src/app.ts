import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import config from "./config";
import { userRouter } from "./modules/user/user.route";
import { authRouter } from "./modules/auth/auth.route";
import { postRouter } from "./modules/post/post.route";
import { commentRouter } from "./modules/comment/comment.route";
import { notFound } from "./middlewares/notFound";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { subscriptionRouter } from "./modules/subscription/subscription.route";
// import httpStatus from "http-status";

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/subscription", subscriptionRouter);

app.use(notFound);

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   console.log(err);
//   res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//     success: false,
//     statusCode: httpStatus.INTERNAL_SERVER_ERROR,
//     message: err.message,
//     error: err.stack,
//   });
// });

app.use(globalErrorHandler);

export default app;
