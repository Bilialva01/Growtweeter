export interface CreateReplyDto {
  idUser: string;
  idTweetBase: string;
  content: string;
}

export interface UpdateReplyDto {
  idReply: string;
  idUser: string;
  content?: string;
}
export interface FoundReplyDto {
  idUser: string;
  idReply: string;
}
