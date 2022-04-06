import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { PostCodeController } from './postCode.controller';
import { homesProviders } from './home.providers';

@Module({
  providers: [...homesProviders],
  controllers: [HomeController, PostCodeController],
})
export class HomeModule {}
