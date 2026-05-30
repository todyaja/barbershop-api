"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const review_entity_1 = require("../entities/review.entity");
let ReviewsService = class ReviewsService {
    constructor(repo) {
        this.repo = repo;
    }
    findAll(barberId) {
        const qb = this.repo.createQueryBuilder('review')
            .leftJoinAndSelect('review.customer', 'customer')
            .leftJoinAndSelect('review.barber', 'barber')
            .orderBy('review.created_at', 'DESC');
        if (barberId)
            qb.andWhere('review.barber_id = :barberId', { barberId });
        return qb.getMany();
    }
    findByBooking(bookingId) {
        return this.repo.createQueryBuilder('review')
            .leftJoinAndSelect('review.customer', 'customer')
            .leftJoinAndSelect('review.barber', 'barber')
            .where('review.booking_id = :bookingId', { bookingId })
            .getOneOrFail();
    }
    async getAverageRating(barberId) {
        const result = await this.repo.createQueryBuilder('review')
            .select('AVG(review.rating)', 'avg')
            .where('review.barber_id = :barberId', { barberId })
            .getRawOne();
        return parseFloat((result === null || result === void 0 ? void 0 : result.avg) || '0');
    }
    create(data) {
        const review = this.repo.create(data);
        return this.repo.save(review);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.repo.findOneOrFail({ where: { id } });
    }
    async remove(id) {
        await this.repo.delete(id);
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map