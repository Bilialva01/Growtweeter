export interface FoundFollowDTO {
  idUser: string; // id do usuário que irá seguir alguém
  idUserFollower: string; // id do usuário que será seguido
}

export interface DeleteFollowerDTO {
  id: string; // id da acao
  idUser: string; // id do usuario que está seguindo
}
