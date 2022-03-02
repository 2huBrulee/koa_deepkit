import { entity, t, uuid } from '@deepkit/type';
import { TimedLocation } from './timed-location';
import { Location } from './location';

@entity.name('trips')
export class Trip {
  @t.primary.uuid id = uuid();

  @t.type(TimedLocation).required start!: TimedLocation;

  @t.type(TimedLocation).required end!: TimedLocation;

  @t.number.required distance!: number;

  @t.number.required duration!: number;

  @t.number.required overspeedsCount!: number;

  @t.array(t.type(Location)).required boundingBox!: Location[];
}
