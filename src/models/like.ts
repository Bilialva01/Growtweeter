export class Like {
  constructor(
    private _id: string,
    private _idTweet: string,
    private _idUser: string,
    public like: string
  ) {
    this.like = "❤";
  }

  public get id() {
    return this._id;
  }
  public get idUser() {
    return this._idUser;
  }
  public get idTweet() {
    return this._idTweet;
  }
  public toJson() {
    return {
      id: this._id,
      idUser: this._idUser,
      idTweet: this._idTweet,
      like: this.like,
    };
  }
}
