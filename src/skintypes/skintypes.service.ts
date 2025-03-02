// src/skintypes/skintypes.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SkinType } from './schemas/skintypes.schema';

@Injectable()
export class SkintypesService {
  constructor(
    @InjectModel(SkinType.name) private skinTypeModel: Model<SkinType>,
  ) {}

  async create(skinTypeData: SkinType): Promise<SkinType> {
    const createdSkinType = new this.skinTypeModel(skinTypeData);
    return createdSkinType.save();
  }

  async findAll(): Promise<SkinType[]> {
    return this.skinTypeModel.find().exec();
  }

  async findOne(id: string): Promise<SkinType> {
    return this.skinTypeModel.findById(id).exec();
  }

  async update(id: string, skinTypeData: SkinType): Promise<SkinType> {
    return this.skinTypeModel
      .findByIdAndUpdate(id, skinTypeData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<SkinType> {
    return this.skinTypeModel.findByIdAndDelete(id).exec();
  }
}