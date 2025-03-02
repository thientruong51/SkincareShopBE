import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, ref: 'User' })
  userId: string;

  @Prop({
    type: [{ productId: String, quantity: Number, price: Number }],
    required: true,
  })
  items: { productId: string; quantity: number; price: number }[];

  @Prop({
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  })
  status: string;

  @Prop()
  totalAmount: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
