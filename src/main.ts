import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RABBITMQ_URL } from './common/constants/app.constant';
import { Transport } from '@nestjs/microservices/enums/index';

async function bootstrap() {
  console.log("[Microservice] RAP service");
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL!],
      queue: 'rap_queue',
      queueOptions: {
        durable: true,
      },
      socketOptions: {
        connectionOptions: {
          clientProperties: {
            connection_name: 'rap-service',
          },
        },
      },
    },
  });
  await app.listen();
}
bootstrap();
