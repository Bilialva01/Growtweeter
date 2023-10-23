import { Like } from "./like";

export class Replie {
  public likes: Like[];
  constructor(
    private _id: string,
    private _idUser: string,
    private _content: string,
    private _idTweetBase: string
  ) {
    this.likes = [];
  }

  public get id() {
    return this._id;
  }
  public get idUser() {
    return this._idUser;
  }
  public get idTweetBase() {
    return this._idTweetBase;
  }

  public get content() {
    return this._content;
  }
  public toJson() {
    return {
      id: this._id,
      idUser: this._idUser,
      idTweetBase: this.idTweetBase,
      content: this._content,
      like: this.likes,
    };
  }
}
