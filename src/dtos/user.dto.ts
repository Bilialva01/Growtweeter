import { Retweet } from "../models/retweet";
import { TweetBase } from "../models/tweetBase";

export interface CreateUserDto {
  name: string;
  email: string;
  username: string;
  password: string;
  avatar?: string | null;
}

export interface UpdateUserDto {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar?: string | null;
  password?: string;
  enable?: boolean;
  token?: string | null;
}

export interface UserResponse {
  id: string;
  username: string;
  enable: boolean;
  createdAt: Date;
}
