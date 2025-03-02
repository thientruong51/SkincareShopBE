import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { Public } from 'src/decorators/public.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';
import { User } from 'src/decorators/user.decorator';
import { IUser } from 'src/interfaces/user.interface';
import { MessageResponse } from 'src/decorators/message-response.decorator';
import { Request, Response } from 'express';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @MessageResponse('User has been successfully signed up.')
  @ApiOperation({ summary: 'Signup a new user' })
  @ApiCreatedResponse({ description: 'User has been successfully created.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBody({
    type: SignupDto,
    description: 'Json structure for user object',
  })
  @Post('signup')
  async signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

  @Public()
  @MessageResponse('User login successful')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Log a user in' })
  @ApiCreatedResponse({ description: 'User login successful' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBody({
    type: LoginDto,
    description: 'Json structure for login object',
  })
  @Post('login')
  async login(
    @User() user: IUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(user, response);
  }

  @MessageResponse('Logout success')
  @ApiOperation({ summary: 'Logout a user' })
  @ApiOkResponse({ description: 'Logout successful' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response, @User() user: IUser) {
    return this.authService.logout(response, user._id);
  }

  @MessageResponse("Get current user's data")
  @Get('current-user')
  @ApiOkResponse({ description: 'Get User data successful' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getCurrentUser(@User() user: IUser) {
    return { user };
  }

  @MessageResponse('Refresh and assign new access token')
  @Public()
  @Get('refresh-token')
  refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refresh_token = request.cookies['skincare-refresh-token'];

    return this.authService.processNewToken(refresh_token, response);
  }
}
