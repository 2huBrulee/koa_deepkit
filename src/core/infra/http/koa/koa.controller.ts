import { cli, Command } from '@deepkit/app';
import { KoaService } from './koa.service';

@cli.controller('koa:listen')
export class KoaController implements Command {
  constructor(private readonly koaService: KoaService) {}

  async execute(): Promise<number | void> {
    await this.koaService.listen();
  }
}
