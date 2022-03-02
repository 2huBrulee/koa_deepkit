import { injectable } from '@deepkit/injector';
import { Logger } from '@deepkit/logger';
import Koa from 'koa';
import { match } from 'path-to-regexp';
import koaBody from 'koa-body';
import cors from '@koa/cors';

import { KoaModuleConfig } from './koa.config';
import { RouterService } from './router.service';
import { AppRequest, RouteMethod } from '../types';
import { ErrorResponseDto } from '../error-response.dto';
import { AppError } from '../../../errors/base.error';

@injectable
export class KoaService {
  constructor(
    private readonly logger: Logger,
    private readonly koaInstance: Koa,
    private readonly koaConfig: KoaModuleConfig,
    private readonly router: RouterService,
  ) {}

  private async setupApp() {
    this.koaInstance.use(
      cors({
        origin: '*',
      }),
    );
    this.koaInstance.use(koaBody());

    this.koaInstance.use(async (context, next) => {
      try {
        await next();
      } catch (error) {
        this.logger.error(error);

        const errorResponse = new ErrorResponseDto();

        errorResponse.statusCode =
          error instanceof AppError ? error.status : 500;
        errorResponse.srcMessage =
          error instanceof AppError ? error.message : 'Internal Server Error';

        context.status = errorResponse.statusCode;
        context.body = errorResponse;
      }
    });

    this.koaInstance.use(async (context) => {
      const { method, headers, query, request, path } = context;

      const result = this.router.getControllerFor(path, method as RouteMethod);

      if (!result) {
        context.status = 404;
        context.body = 'Not found';
        return;
      }

      const { controller, routeDefinition } = result;

      const urlMatcher = match(routeDefinition.path, {
        decode: decodeURIComponent,
      });

      const matchResult = urlMatcher(path);

      const appRequest: AppRequest = {
        body: request.body as Record<string, any>,
        params: matchResult ? matchResult.params : {},
        query,
        headers,
      };

      context.body = (await controller.handle(appRequest)) as unknown;
    });
  }

  async listen() {
    this.logger.info(`Starting Koa server`);

    await this.setupApp();

    const { port } = this.koaConfig;

    this.koaInstance.listen(port);
    this.logger.info(`Koa server started on port ${port}`);
  }
}
