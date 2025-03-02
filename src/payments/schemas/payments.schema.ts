import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true, ref: 'User' })
  userId: string;

  @Prop({ required: true, ref: 'Order' })
  orderId: string;

  @Prop({ required: true })
  amount: number;

  @Prop()
  transactionId?: string; 

  @Prop({ default: 'VNPAY' })
  paymentMethod: string;

  @Prop({ enum: ['pending', 'completed', 'failed'], default: 'pending' })
  status: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
