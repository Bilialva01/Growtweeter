export interface CreateTweetDto {
  idUser: string;
  content: string;
}

export interface UpdateTweetDto {
  idTweet: string;
  idUser:string;
  content?: string;
}

export interface FoundTweetDto{
  idUser:string;
  idTweet:string
}
