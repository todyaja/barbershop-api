import { PaymentsService } from './payments.service';
import { Payment } from '../entities/payment.entity';
export declare class PaymentsController {
    private service;
    constructor(service: PaymentsService);
    findByBooking(bookingId: string): Promise<Payment>;
    create(data: Partial<Payment>): Promise<Payment>;
    update(id: string, data: Partial<Payment>): Promise<Payment>;
    markAsPaid(id: string, transactionId?: string): Promise<Payment>;
}
