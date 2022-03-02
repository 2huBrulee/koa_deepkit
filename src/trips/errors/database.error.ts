import { AppError } from '../../core/errors/base.error';

export class DatabaseError extends AppError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'DatabaseError';
  }
}
