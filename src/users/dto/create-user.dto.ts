import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'Please enter your name.' })
  name: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'The email of the user',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty({ message: 'Please enter your email.' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'Please enter your password.' })
  password: string;

  @ApiProperty({
    example: 'user',
    description: 'The role of the user',
    required: false,
  })
  @IsString()
  @IsNotEmpty({ message: 'Please enter your role.' })
  @IsEnum(['user', 'admin'], { message: 'Role must be either user or admin.' })
  role: string;
}
