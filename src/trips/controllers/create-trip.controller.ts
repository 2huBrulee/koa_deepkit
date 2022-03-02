import { either } from 'fp-ts';
import { plainToClass, validate } from '@deepkit/type';
import { CreateTripUseCase } from '../use-cases/create-trip.use-case';
import { appController } from '../../core/helpers/decorator';
import {
  AppRequest,
  Controller,
  RouteMethod,
} from '../../core/infra/http/types';
import { CreateTripBodyDto } from '../infra/dtos/create-trip-body.dto';
import { ValidationError } from '../../core/errors/validation.error';

@appController({
  method: RouteMethod.POST,
  path: '/trips',
})
export class CreateTripController implements Controller {
  constructor(private readonly createTripUseCase: CreateTripUseCase) {}

  async handle(request: AppRequest) {
    const data = plainToClass(CreateTripBodyDto, request.body);

    const validationResult = validate(CreateTripBodyDto, data);

    if (validationResult.length > 0) {
      throw new ValidationError(validationResult.join(', '));
    }

    const result = await this.createTripUseCase.execute(data);

    if (either.isLeft(result)) throw result.left;

    return result.right;
  }
}
