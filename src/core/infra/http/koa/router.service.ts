import { injectable, InjectorContext } from '@deepkit/injector';
import { Logger } from '@deepkit/logger';
import { RoutesRegistry } from './routes-registry';
import { Controller, RouteMethod } from '../types';

@injectable
export class RouterService {
  constructor(
    private readonly logger: Logger,
    private readonly injectorContext: InjectorContext,
    private readonly routesRegistry: RoutesRegistry,
  ) {}

  getControllerFor(path: string, method: RouteMethod) {
    this.logger.debug(`getControllerFor(${path}, ${method})`);

    const routeDefinition = this.routesRegistry.getFor(path, method);

    if (!routeDefinition) {
      return null;
    }

    const controller = this.injectorContext.get(
      routeDefinition.controller,
      routeDefinition.module,
    ) as Controller;

    return { controller, routeDefinition };
  }
}
