import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from './schemas/payments.schema';
import { VnpayService } from 'nestjs-vnpay';
import { VnpLocale } from 'vnpay';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    private readonly vnpayService: VnpayService,
  ) {}

  async createPaymentUrl(userId: string, orderId: string, amount: number): Promise<string> {
    const payment = new this.paymentModel({
      userId,
      orderId,
      amount,
      status: 'pending',
    });

    await payment.save();

    const paymentUrl = this.vnpayService.buildPaymentUrl({
      vnp_Amount: amount * 100, 
      vnp_TxnRef: payment._id.toString(),
      vnp_OrderInfo: `Thanh toán đơn hàng ${orderId}`,
      vnp_OrderType: 'other',
      vnp_Locale: VnpLocale.VN,
      vnp_IpAddr: '127.0.0.1',
      vnp_ReturnUrl: process.env.VNP_RETURN_URL,
    });

    return paymentUrl;
  }

  async handlePaymentCallback(query: any): Promise<boolean> {
    const isValid = this.vnpayService.verifyReturnUrl(query);
    if (!isValid) {
      throw new BadRequestException('Giao dịch không hợp lệ');
    }
  
    const payment = await this.paymentModel.findById(query.vnp_TxnRef);
    if (!payment) {
      throw new BadRequestException('Không tìm thấy giao dịch');
    }
  
    payment.transactionId = query.vnp_TransactionNo;
    payment.status = query.vnp_ResponseCode === '00' ? 'completed' : 'failed';
    await payment.save();
  
    return payment.status === 'completed';
  }
}
