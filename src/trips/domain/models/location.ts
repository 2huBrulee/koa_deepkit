import { t } from '@deepkit/type';

export class Location {
  @t.number.required lat!: number;

  @t.number.required lon!: number;
}
