import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/products.schema';
import { CreateProductDto } from './dto/create-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Transform the DTO to match the Product model requirements
    const productData: Product = {
      name: createProductDto.name,
      description: createProductDto.description || '',
      imageUrl: createProductDto.imageUrl || '',
      price: createProductDto.price,
      suitableFor: createProductDto.suitableFor || [],
      averageRating: createProductDto.averageRating || 0
    };
    
    const newProduct = new this.productModel(productData);
    return newProduct.save();
  }

  async findAll(query: any): Promise<Product[]> {
    return this.productModel.find(query).exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, updateDto: Partial<CreateProductDto>): Promise<Product> {
    const existingProduct = await this.productModel.findById(id).exec();
    
    if (!existingProduct) {
      return null;
    }
    
    // Apply updates while maintaining required fields
    if (updateDto.name) existingProduct.name = updateDto.name;
    if (updateDto.description !== undefined) existingProduct.description = updateDto.description;
    if (updateDto.imageUrl !== undefined) existingProduct.imageUrl = updateDto.imageUrl;
    if (updateDto.price !== undefined) existingProduct.price = updateDto.price;
    if (updateDto.suitableFor) existingProduct.suitableFor = updateDto.suitableFor;
    if (updateDto.averageRating !== undefined) existingProduct.averageRating = updateDto.averageRating;
    
    return existingProduct.save();
  }

  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
  
  // New method to update product rating
  async updateRating(productId: string, averageRating: number): Promise<Product> {
    const product = await this.productModel.findByIdAndUpdate(
      productId,
      { averageRating: averageRating },
      { new: true }
    ).exec();
    
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    
    return product;
  }
}