import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { postService } from './post.service';
import httpStatus from 'http-status';

const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;

    const payload = req.body;

    const result = await postService.createPostInDB(payload, id as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Post Created SuccessFully',
      data: result,
    });
  },
);

const getAllPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getAllPostsFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Posts retrieved successfully',
      data: result,
    });
  },
);

const getPostById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    const result = await postService.getPostByIdFromDB(postId as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Post retrieved successfully',
      data: result,
    });
  },
);

const getMyPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    console.log(authorId);
    const result = await postService.getMyPostsFromDB(authorId as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'My posts retrieved successfully',
      data: result,
    });
  },
);

const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === 'ADMIN';

    const postId = req.params.postId;

    if (!postId) {
      throw new Error('Post Id Required In Params');
    }

    const payload = req.body;

    const result = await postService.updatePostInDB(
      postId as string,
      payload,
      authorId as string,
      isAdmin,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Post updated successfully',
      data: result,
    });
  },
);

const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === 'ADMIN';

    const postId = req.params.postId;
    if (!postId) {
      throw new Error('Post Id Required In Params');
    }

    await postService.deletePostInDB(
      postId as string,
      authorId as string,
      isAdmin,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Post deleted successfully',
      data: null,
    });
  },
);

const getPostStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getPostStatsFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Post stats retrieved successfully',
      data: result,
    });
  },
);

export const postController = {
  createPost,
  getAllPosts,
  getPostById,
  getMyPosts,
  updatePost,
  deletePost,
  getPostStats,
};
