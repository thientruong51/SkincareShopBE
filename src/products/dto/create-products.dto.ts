import { IsString, IsNumber, IsArray, IsOptional, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  price: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  suitableFor?: string[];

  @IsNumber()
  @IsOptional()
  averageRating?: number;
}
