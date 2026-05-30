import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
export declare class ReviewsService {
    private repo;
    constructor(repo: Repository<Review>);
    findAll(barberId?: string): Promise<Review[]>;
    findByBooking(bookingId: string): Promise<Review>;
    getAverageRating(barberId: string): Promise<number>;
    create(data: Partial<Review>): Promise<Review>;
    update(id: string, data: Partial<Review>): Promise<Review>;
    remove(id: string): Promise<void>;
}
