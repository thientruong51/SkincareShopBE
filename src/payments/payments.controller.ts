import { Controller, Get, Post, Body, Query, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Response } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create')
  async createPayment(
    @Body() body: { userId: string; orderId: string; amount: number },
    @Res() res: Response,
  ) {
    const paymentUrl = await this.paymentsService.createPaymentUrl(body.userId, body.orderId, body.amount);
    return res.redirect(paymentUrl);
  }

  @Get('callback')
  async handleCallback(@Query() query: any, @Res() res: Response) {
    const success = await this.paymentsService.handlePaymentCallback(query);
    if (success) {
      return res.status(200).json({ message: 'Thanh toán thành công' });
    } else {
      return res.status(400).json({ message: 'Thanh toán thất bại' });
    }
  }
}
