import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from 'src/products/schemas/products.schema';

@Schema()
export class SkinType {
  @Prop({ required: true, unique: true })
  type: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: String, ref: 'Product' }] })
  recommendedProducts: Product[];

  @Prop()
  careTips: string;
}

export const SkinTypeSchema = SchemaFactory.createForClass(SkinType);