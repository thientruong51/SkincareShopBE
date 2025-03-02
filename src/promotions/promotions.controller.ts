import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
  } from '@nestjs/common';
  import { PromotionsService } from './promotions.service';
  import { CreatePromotionDTO } from './dto/create-promotion.dto';
  import { UpdatePromotionDTO } from './dto/update-promotion.dto';
  import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiOkResponse,
    ApiNoContentResponse,
  } from '@nestjs/swagger';
  import { MessageResponse } from 'src/decorators/message-response.decorator';
  import { Public } from 'src/decorators/public.decorator';
  
  @ApiBearerAuth()
  @ApiTags('promotions')
  @Controller('promotions')
  export class PromotionsController {
    constructor(private readonly promotionsService: PromotionsService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new promotion' })
    @ApiOkResponse({ description: 'Promotion has been created successfully.' })
    @MessageResponse('Create a new promotion')
    async create(@Body() createPromotionDto: CreatePromotionDTO) {
      return this.promotionsService.create(createPromotionDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Find all promotions' })
    @ApiOkResponse({ description: 'Fetch all promotions successfully.' })
    @MessageResponse('Find all promotions')
    async findAll() {
      return this.promotionsService.findAll();
    }
  
    @Public()
    @Get('active')
    @ApiOperation({ summary: 'Find all active promotions' })
    @ApiOkResponse({ description: 'Fetch all active promotions successfully.' })
    @MessageResponse('Find all active promotions')
    async findAllActive() {
      return this.promotionsService.findAllActive();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Find a promotion by id' })
    @ApiOkResponse({ description: 'Fetch a promotion successfully.' })
    @MessageResponse('Find a promotion by id')
    async findOne(@Param('id') id: string) {
      return this.promotionsService.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Update a promotion' })
    @ApiOkResponse({ description: 'Promotion has been updated successfully.' })
    @MessageResponse('Update a promotion')
    async update(
      @Param('id') id: string,
      @Body() updatePromotionDto: UpdatePromotionDTO,
    ) {
      return this.promotionsService.update(id, updatePromotionDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a promotion' })
    @ApiNoContentResponse({
      description: 'Promotion has been deleted successfully.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async remove(@Param('id') id: string) {
      return this.promotionsService.remove(id);
    }
  }