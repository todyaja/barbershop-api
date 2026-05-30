import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
export declare class PaymentsService {
    private repo;
    constructor(repo: Repository<Payment>);
    findByBooking(bookingId: string): Promise<Payment>;
    create(data: Partial<Payment>): Promise<Payment>;
    update(id: string, data: Partial<Payment>): Promise<Payment>;
    markAsPaid(id: string, transactionId?: string): Promise<Payment>;
}
