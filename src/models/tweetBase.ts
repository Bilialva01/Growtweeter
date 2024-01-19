import { Reply } from "./reply";
import { Like } from "./like";

export class TweetBase {
  public likes: Like[];
  public reply: Reply[];
  constructor(
    private _id: string,
    private _idUser: string,
    private _content: string
  ) {
    this.likes = [];
    this.reply = [];
  }

  public get id() {
    return this._id;
  }
  public get idUser() {
    return this._idUser;
  }

  public get content() {
    return this._content;
  }
  public toJson() {
    return {
      id: this._id,
      idUser: this._idUser,
      content: this._content,
      likes: this.likes,
    };
  }
}
