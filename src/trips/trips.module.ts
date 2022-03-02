import { createModule } from '@deepkit/app';
import { TripsDatabase } from './domain/database';
import { FindTripsUseCase } from './use-cases/find-trips.use-case';
import { CreateTripUseCase } from './use-cases/create-trip.use-case';
import { CreateTripController } from './controllers/create-trip.controller';
import { GetTripsController } from './controllers/get-trips.controller';

export class TripsModule extends createModule({
  providers: [
    GetTripsController,
    CreateTripController,
    FindTripsUseCase,
    CreateTripUseCase,
    TripsDatabase,
  ],
}) {}
