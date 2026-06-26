import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const logInUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const logInResult = await authService.logInUserIntoDB(payload);

    sendResponse(res, {
      success: true,
      message: "Successfully Logged In",
      statusCode: httpStatus.OK,
      data: logInResult,
    });
  },
);

export const authController = {
  logInUser,
};
