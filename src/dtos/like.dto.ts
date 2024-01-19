export interface CreateLikeDto {
  idUser: string;
  idTweet?: string;
  idRetweet?:string;
  idReply?:string;
  
}
export interface FoundLikeDTO {
  idUser: string;
  idLike: string;
}

export interface UpdateLikeDto {
  idLike: string;
  idUser: string;
  like?: string;
}
