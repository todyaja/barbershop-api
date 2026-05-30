import { ReviewsService } from './reviews.service';
import { Review } from '../entities/review.entity';
export declare class ReviewsController {
    private service;
    constructor(service: ReviewsService);
    findAll(barberId?: string): Promise<Review[]>;
    findByBooking(bookingId: string): Promise<Review>;
    getAverageRating(barberId: string): Promise<number>;
    create(data: Partial<Review>): Promise<Review>;
    update(id: string, data: Partial<Review>): Promise<Review>;
    remove(id: string): Promise<void>;
}
