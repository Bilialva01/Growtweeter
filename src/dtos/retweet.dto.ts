export interface CreateRetweetDto {
  idUser: string;
  idTweetBase: string;
  content: string;
}

export interface UpdateRetweetDto {
  idRetweet: string;
  idUser: string;
  content?: string;
}
export interface FoundRetweetDto {
  idUser: string;
  idRetweet: string;
}
