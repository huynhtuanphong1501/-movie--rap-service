import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GetModule } from './module-api/get/get.module';
import { PrismaModule } from './module-system/prisma/prisma.module';

@Module({
  imports: [GetModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
