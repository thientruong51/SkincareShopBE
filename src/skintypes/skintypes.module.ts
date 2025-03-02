import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SkinType, SkinTypeSchema } from './schemas/skintypes.schema';
import { SkintypesService } from './skintypes.service';
import { SkintypesController } from './skintypes.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SkinType.name, schema: SkinTypeSchema },
    ]),
  ],
  providers: [SkintypesService],
  controllers: [SkintypesController],
})
export class SkintypesModule {}