import { NestFactory } from '@nestjs/core';
import { HeimGatewayModule } from './heim-gateway.module';
import { Logger } from '@nestjs/common';
import { NotFoundExceptionFilter } from './not-found-exception.filter';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(HeimGatewayModule);
  await app.useGlobalFilters(new NotFoundExceptionFilter());
  await app.listen(3000, () => logger.log('Heim Api Gateway is started!'));
}
bootstrap();
