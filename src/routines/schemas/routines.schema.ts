import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from 'src/products/schemas/products.schema';

@Schema()
export class Routine {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  skinType: string;

  @Prop()
  steps: string[]; // Example: ['Cleanser', 'Toner', 'Moisturizer']

  @Prop({ type: [{ type: String, ref: 'Product' }] })
  recommendedProducts: Product[];

  @Prop()
  duration: string; // Example: '15 minutes'

  @Prop()
  frequency: string; // Example: 'Daily'
}

export const RoutineSchema = SchemaFactory.createForClass(Routine);