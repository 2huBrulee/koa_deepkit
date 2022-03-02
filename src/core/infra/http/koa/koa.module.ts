import { AppModule, createModule } from '@deepkit/app';
import { ProviderWithScope, Token } from '@deepkit/injector';
import Koa from 'koa';
import { isControllerClass } from '../../../helpers/decorator';
import { RoutesRegistry } from './routes-registry';
import { KoaService } from './koa.service';
import { KoaController } from './koa.controller';
import { koaModuleConfig } from './koa.config';
import { RouterService } from './router.service';

export class KoaModule extends createModule({
  controllers: [KoaController],
  providers: [KoaService, RouterService, Koa],
  exports: [KoaService],
  config: koaModuleConfig,
}) {
  protected routesRegistry = new RoutesRegistry();

  override process() {
    this.addProvider({
      provide: RoutesRegistry,
      useValue: this.routesRegistry,
    });
  }

  override processProvider(
    module: AppModule<any>,
    token: Token,
    provider: ProviderWithScope,
  ) {
    if (isControllerClass(token)) {
      this.routesRegistry.register(token, module);
    }

    super.processProvider(module, token, provider);
  }
}
