import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SignupDto {
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
}
