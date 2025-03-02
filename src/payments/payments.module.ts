import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment, PaymentSchema } from './schemas/payments.schema';
import { VnpayModule } from 'nestjs-vnpay';
import { ConfigModule } from '@nestjs/config';
import { HashAlgorithm, ignoreLogger } from 'vnpay';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    VnpayModule.register({
      tmnCode: process.env.VNP_TMNCODE,
      secureSecret: process.env.VNP_HASHSECRET,
      vnpayHost: process.env.VNP_URL.replace('/paymentv2/vpcpay.html', ''),
      testMode: true, // Bật chế độ sandbox
      hashAlgorithm: HashAlgorithm.SHA512,
      enableLog: true,
      loggerFn: ignoreLogger,
    }),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
