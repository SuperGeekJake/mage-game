declare module 'boardgame.io/server' {
  export interface IServer {
    app: {
      use: (middleware: any) => void;
    };
    run: (port: string | number) => void;
  }

  export interface ServerOptions {
    games: any[],
    db: Object
  }

  export function Server(opts: ServerOptions): IServer;

  export const InMemory = Object;
}
