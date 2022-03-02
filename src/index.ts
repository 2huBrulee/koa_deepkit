import 'reflect-metadata';
import { App } from '@deepkit/app';
import { ConsoleTransport, DefaultFormatter, Logger } from '@deepkit/logger';
import { TripsModule } from './trips/trips.module';
import { KoaModule } from './core/infra/http/koa/koa.module';

const start = async () => {
  const app = new App({
    imports: [
      new TripsModule(),
      new KoaModule({
        port: 12_000,
      }),
    ],
    providers: [Logger],
  });

  app.setup((module, _config) => {
    module
      .setupProvider(Logger)
      .addTransport(new ConsoleTransport(true))
      .addFormatter(new DefaultFormatter());
  });

  await app.run(['koa:listen']);
};

void start();
