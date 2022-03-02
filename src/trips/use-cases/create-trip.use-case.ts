// eslint-disable-next-line max-classes-per-file
import { Logger } from '@deepkit/logger';
import { t, validates } from '@deepkit/type';
import { injectable } from '@deepkit/injector';
import { Either } from 'fp-ts/Either';
import { either } from 'fp-ts';
import { Trip } from '../domain/models/trip';
import { TripsDatabase } from '../domain/database';
import { UseCase } from '../../core/domain/use-case';
import { Location } from '../domain/models/location';
import { TimedLocation } from '../domain/models/timed-location';
import { DatabaseError } from '../errors/database.error';

@injectable
export class CreateTripUseCase
  implements UseCase<CreateTripUseCaseParameters, CreateTripUseCaseResult>
{
  constructor(
    private readonly database: TripsDatabase,
    private readonly logger: Logger,
  ) {}

  async execute(parameters: CreateTripUseCaseParameters) {
    this.logger.info('CreateTripUseCase.execute', parameters);

    try {
      if (parameters.readings.length === 0) {
        throw new Error('No readings provided');
      }

      const orderedReadings = parameters.readings.sort(
        (a, b) => a.time - b.time,
      );

      const start = new TimedLocation();

      const firstReading = orderedReadings.at(0);

      if (!firstReading) {
        throw new Error('No start location provided');
      }

      start.time = firstReading.time;
      start.lon = firstReading.location.lon;
      start.lat = firstReading.location.lat;
      start.address = '';

      const end = new TimedLocation();

      const lastReading = orderedReadings.at(-1);

      if (!lastReading) {
        throw new Error('No end location provided');
      }

      end.time = lastReading.time;
      end.lon = lastReading.location.lon;
      end.lat = lastReading.location.lat;
      end.address = '';

      const trip = new Trip();

      trip.start = start;
      trip.end = end;
      trip.distance = 10;
      trip.duration = 10;
      trip.overspeedsCount = 0;
      trip.boundingBox = orderedReadings.map((r) => {
        const location = new Location();
        location.lon = r.location.lon;
        location.lat = r.location.lat;

        return location;
      });

      if (!validates(Trip, trip)) throw new Error('invalid trip');

      const session = this.database.createSession();

      session.add(trip);

      await session.commit();

      return either.right(trip);
    } catch (error) {
      this.logger.error(error);

      return either.left(new DatabaseError(''));
    }
  }
}

export class Reading {
  @t.number.required time!: number;

  @t.type(Location).required location!: Location;

  @t.number.required speed!: number;

  @t.number.required speedLimit!: number;
}

export class CreateTripUseCaseParameters {
  @t.array(t.type(Reading)).required readings!: Reading[];
}

export type CreateTripUseCaseResult = Either<DatabaseError, Trip>;
