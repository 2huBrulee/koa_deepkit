import { injectable } from '@deepkit/injector';
import { ClassType } from '@deepkit/core';
import { pathToRegexp } from 'path-to-regexp';
import { AppModule } from '@deepkit/app';
import { RouteDefinition, RouteMethod } from '../types';
import { getRouteDefinition } from '../../../helpers/decorator';

type RoutesRegistryEntry = RouteDefinition & {
  controller: ClassType;
  module: AppModule<any>;
  matcher: (path: string, method: RouteMethod) => boolean;
};

@injectable
export class RoutesRegistry {
  private controllers: Array<RoutesRegistryEntry> = [];

  register(controller: ClassType, module: AppModule<any>) {
    const routeDefinition = getRouteDefinition(controller);

    if (!routeDefinition)
      throw new Error(`Controller ${controller.name} has no route definition.`);

    const pathRegexp = pathToRegexp(routeDefinition.path);

    const doesUrlMatch = (url: string) =>
      routeDefinition.path.includes(':')
        ? pathRegexp.test(url)
        : url === routeDefinition.path;

    this.controllers.push({
      controller,
      module,
      ...routeDefinition,
      matcher: (path, method) =>
        doesUrlMatch(path) && method === routeDefinition.method,
    });
  }

  getFor(path: string, method: RouteMethod) {
    return this.controllers.find((c) => c.matcher(path, method));
  }
}
