/* eslint-disable @typescript-eslint/ban-types */
import { ClassType } from '@deepkit/core';
import { RouteDefinition } from '../infra/http/types';

export const IS_CONTROLLER = 'IS_CONTROLLER';
export const ROUTE_DEF = 'ROUTE_DEF';

export const setAsControllerClass = (target: Object) => {
  Reflect.defineMetadata(IS_CONTROLLER, true, target);
};

export const isControllerClass = (target: Object): target is ClassType =>
  Reflect.getMetadata(IS_CONTROLLER, target) === true;

export const setRouteDefinition = (
  target: Object,
  routeDefinition: RouteDefinition,
) => {
  Reflect.defineMetadata(ROUTE_DEF, routeDefinition, target);
};

export const getRouteDefinition = (target: Object): RouteDefinition =>
  Reflect.getMetadata(ROUTE_DEF, target) as RouteDefinition;

export const appController =
  (routeDefinition: RouteDefinition): ClassDecorator =>
  (target: Object) => {
    setAsControllerClass(target);
    setRouteDefinition(target, routeDefinition);
  };
