import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MessageResponse } from 'src/decorators/message-response.decorator';
import { Public } from 'src/decorators/public.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/decorators/user.decorator';
import { IUser } from 'src/interfaces/user.interface';

@ApiBearerAuth()
@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @MessageResponse('Create a new user')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({ description: 'User has been created successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async create(@Body() createUserDto: CreateUserDto, @User() user: IUser) {
    return this.usersService.create(createUserDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Find all users' })
  @ApiOkResponse({ description: 'Fetch all users successfully.' })
  @MessageResponse('Find all users')
  async findAll(
    @Query() query: { page: string; limit: string },
    @Query() queryString: string,
  ) {
    const { page, limit } = query;
    return this.usersService.findAll(+page, +limit, queryString);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Find a user by id' })
  @ApiOkResponse({ description: 'Fetch a user successfully.' })
  @MessageResponse('Find a user by id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne({ _id: id });
  }

  @Patch()
  @ApiOperation({ summary: 'Update a user' })
  @ApiOkResponse({ description: 'User has been updated successfully.' })
  @MessageResponse('Update a user')
  async update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiNoContentResponse({
    description: 'User has been deleted successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
