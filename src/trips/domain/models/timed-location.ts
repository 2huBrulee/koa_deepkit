import { t } from '@deepkit/type';
import { Location } from './location';

export class TimedLocation extends Location {
  @t.number.required time!: number;

  @t.string.required address!: string;
}
