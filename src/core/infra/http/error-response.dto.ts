import { t } from '@deepkit/type';

export class ErrorResponseDto {
  @t.number statusCode = 500;

  @t.number errorCode = 0;

  @t.string srcMessage = '';

  @t.string translatedMessage = '';
}
