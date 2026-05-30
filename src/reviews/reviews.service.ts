import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private repo: Repository<Review>,
  ) {}

  findAll(barberId?: string) {
    const qb = this.repo.createQueryBuilder('review')
      .leftJoinAndSelect('review.customer', 'customer')
      .leftJoinAndSelect('review.barber', 'barber')
      .orderBy('review.created_at', 'DESC');

    if (barberId) qb.andWhere('review.barber_id = :barberId', { barberId });
    return qb.getMany();
  }

  findByBooking(bookingId: string) {
    return this.repo.createQueryBuilder('review')
      .leftJoinAndSelect('review.customer', 'customer')
      .leftJoinAndSelect('review.barber', 'barber')
      .where('review.booking_id = :bookingId', { bookingId })
      .getOneOrFail();
  }

  async getAverageRating(barberId: string): Promise<number> {
    const result = await this.repo.createQueryBuilder('review')
      .select('AVG(review.rating)', 'avg')
      .where('review.barber_id = :barberId', { barberId })
      .getRawOne();
    return parseFloat(result?.avg || '0');
  }

  create(data: Partial<Review>) {
    const review = this.repo.create(data);
    return this.repo.save(review);
  }

  async update(id: string, data: Partial<Review>) {
    await this.repo.update(id, data);
    return this.repo.findOneOrFail({ where: { id } });
  }

  async remove(id: string) {
    await this.repo.delete(id);
  }
}
