import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
  } from '@nestjs/common';
  import { SkintypesService } from './skintypes.service';
  import { SkinType } from './schemas/skintypes.schema';
  
  @Controller('skintypes')
  export class SkintypesController {
    constructor(private readonly skintypesService: SkintypesService) {}
  
    @Post()
    async create(@Body() skinTypeData: SkinType): Promise<SkinType> {
      return this.skintypesService.create(skinTypeData);
    }
  
    @Get()
    async findAll(): Promise<SkinType[]> {
      return this.skintypesService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<SkinType> {
      return this.skintypesService.findOne(id);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() skinTypeData: SkinType,
    ): Promise<SkinType> {
      return this.skintypesService.update(id, skinTypeData);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<SkinType> {
      return this.skintypesService.delete(id);
    }
  }