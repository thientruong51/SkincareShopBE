import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  imageUrl: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [{ type: String }] })
  suitableFor: string[]; // ['oily', 'dry', 'normal', 'combination']

  @Prop({ default: 0 })
  averageRating: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
