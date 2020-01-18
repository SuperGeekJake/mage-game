import path from 'path';
import { Server, InMemory } from 'boardgame.io/server';
import KoaStatic from 'koa-static';
import { config as mage } from '@mage/engine/src';

const server = Server({
  games: [mage],
  db: InMemory,
});

if (process.env.NODE_ENV === 'production') {
  const app = require.resolve('@mage/webapp');
  const appPublic = path.join(app, '..');
  server.app.use(KoaStatic(appPublic));
}

server.run(process.env.PORT || 3001);
