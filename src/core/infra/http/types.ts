export enum RouteMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
}

export type AppRequest = {
  body: Record<string, any>;
  headers: Record<string, any>;
  query: Record<string, any>;
  params: Record<string, any>;
};

export interface Controller<Result = any> {
  handle(request: AppRequest): Promise<Result>;
}

export type RouteDefinition = {
  method: RouteMethod;
  path: string;
  shouldBeAuthenticated?: boolean;
};
