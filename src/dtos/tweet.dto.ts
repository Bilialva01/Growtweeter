export interface CreateTweetDto {
  idUser: string;
  content: string;
}

export interface UpdateTweetDto {
  idUser:string;
  idTweet: string;
  content?: string;
}

export interface FoundTweetDto {
  idUser: string;
  idTweet: string;
}
