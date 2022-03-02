import { createModuleConfig } from '@deepkit/app';
import { t } from '@deepkit/type';

export const koaModuleConfig = createModuleConfig({
  port: t.number,
});

export class KoaModuleConfig extends koaModuleConfig.all() {}
