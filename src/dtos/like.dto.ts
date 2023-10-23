export interface CreateLikeDto {
  idUser: string;
  idTweet: string;
  like: "❤";
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
