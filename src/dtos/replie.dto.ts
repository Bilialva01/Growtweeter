export interface CreateReplieDto {
  idUser: string;
  idTweetBase: string;
  content: string;
}

export interface UpdateReplieDto {
  idReplie: string;
  idUser: string;
  content?: string;
}
export interface FoundReplieDto {
  idUser: string;
  idReplie: string;
}
