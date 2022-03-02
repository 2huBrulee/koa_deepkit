import { plainToClass, validate } from '@deepkit/type';
import { FindTripsUseCase } from '../use-cases/find-trips.use-case';
import { appController } from '../../core/helpers/decorator';
import {
  AppRequest,
  Controller,
  RouteMethod,
} from '../../core/infra/http/types';
import { FindTripsQueryDto } from '../infra/dtos/find-trips-query.dto';
import { ValidationError } from '../../core/errors/validation.error';

@appController({
  method: RouteMethod.GET,
  path: '/trips',
})
export class GetTripsController implements Controller {
  constructor(private readonly findTripsUseCase: FindTripsUseCase) {}

  async handle(request: AppRequest) {
    const data = plainToClass(FindTripsQueryDto, request.query);

    const validationResult = validate(FindTripsQueryDto, data);

    if (validationResult.length > 0) {
      throw new ValidationError(validationResult.join(', '));
    }

    return this.findTripsUseCase.execute(data);
  }
}
