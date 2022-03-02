import { Database } from '@deepkit/orm';
import { MongoDatabaseAdapter } from '@deepkit/mongo';
import { Trip } from './models/trip';

export class TripsDatabase extends Database<MongoDatabaseAdapter> {
  constructor() {
    super(
      new MongoDatabaseAdapter(
        'mongodb://ale:ale@localhost:27017/testo?authSource=admin&readPreference=primary&ssl=false',
      ),
      [Trip],
    );
  }
}
