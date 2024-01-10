declare namespace Express {
  interface Request {
    authUser: {
      id: string;
      nome: string;
      email: string;
      username: string;
      avatar: string;
      enable: boolean;
      iat: number;
    };
  }
}
