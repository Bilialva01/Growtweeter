import { User } from "./user.model";

export class Follow {
  constructor(
    private _id: string,
    public following: User[],
    public follower: User[]
  ) {
    this.following = [];
    this.follower = [];
  }
  public get id() {
    return this._id;
  }
  public toJson() {
    return {
      id: this._id,
      followers: this.follower,
      following: this.following,
    };
  }
}
