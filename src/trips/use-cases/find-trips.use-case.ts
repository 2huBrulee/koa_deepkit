// eslint-disable-next-line max-classes-per-file
import { injectable } from '@deepkit/injector';
import { Logger } from '@deepkit/logger';
import { t } from '@deepkit/type';
import { FilterQuery } from '@deepkit/mongo';
import { TripsDatabase } from '../domain/database';
import { Trip } from '../domain/models/trip';
import { UseCase } from '../../core/domain/use-case';

@injectable
export class FindTripsUseCase
  implements UseCase<FindTripsUseCaseParameters, Trip[]>
{
  constructor(
    private readonly database: TripsDatabase,
    private readonly logger: Logger,
  ) {}

  async execute(parameters: FindTripsUseCaseParameters) {
    this.logger.log('FindTripsUseCase.execute', parameters);

    const distanceQuery: FilterQuery<Trip> | undefined = parameters.distance_gte
      ? {
          distance: {
            $gte: parameters.distance_gte,
          },
        }
      : undefined;

    return this.database
      .query(Trip)
      .filter({
        ...distanceQuery,
      })
      .orderBy('id', 'asc')
      .limit(parameters.limit ?? 10)
      .skip(parameters.offset ?? 0)

      .find();
  }
}

export class FindTripsUseCaseParameters {
  @t.number limit?: number;

  @t.number offset?: number;

  @t.number start_gte?: number;

  @t.number start_lte?: number;

  @t.number distance_gte?: number;
}
