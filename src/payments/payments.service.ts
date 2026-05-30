import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private repo: Repository<Payment>,
  ) {}

  findByBooking(bookingId: string) {
    return this.repo.findOneOrFail({ where: { booking_id: bookingId } });
  }

  create(data: Partial<Payment>) {
    const payment = this.repo.create(data);
    return this.repo.save(payment);
  }

  async update(id: string, data: Partial<Payment>) {
    await this.repo.update(id, data);
    return this.repo.findOneOrFail({ where: { id } });
  }

  async markAsPaid(id: string, transactionId?: string) {
    const payment = await this.repo.findOneOrFail({ where: { id } });
    payment.status = 'paid';
    payment.payment_date = new Date();
    payment.transaction_id = transactionId || (null as any);
    return this.repo.save(payment);
  }
}
