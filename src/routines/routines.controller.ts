import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
  } from '@nestjs/common';
  import { RoutinesService } from './routines.service';
  import { Routine } from './schemas/routines.schema';
  
  @Controller('routines')
  export class RoutinesController {
    constructor(private readonly routinesService: RoutinesService) {}
  
    @Post()
    async create(@Body() routineData: any): Promise<Routine> {
      return this.routinesService.create(routineData);
    }
  
    @Get()
    async findAll(): Promise<Routine[]> {
      return this.routinesService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Routine> {
      return this.routinesService.findOne(id);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() routineData: any,
    ): Promise<Routine> {
      return this.routinesService.update(id, routineData);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Routine> {
      return this.routinesService.delete(id);
    }
  }