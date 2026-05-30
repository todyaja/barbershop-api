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
exports.PromoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const promo_reward_entity_1 = require("../entities/promo-reward.entity");
const promo_credit_entity_1 = require("../entities/promo-credit.entity");
let PromoService = class PromoService {
    constructor(rewardsRepo, creditsRepo) {
        this.rewardsRepo = rewardsRepo;
        this.creditsRepo = creditsRepo;
    }
    getRewardsByUser(userId) {
        return this.rewardsRepo.find({
            where: { user_id: userId, is_used: false },
            order: { expires_at: 'ASC' },
        });
    }
    createReward(data) {
        const reward = this.rewardsRepo.create(data);
        return this.rewardsRepo.save(reward);
    }
    async markRewardAsUsed(id) {
        await this.rewardsRepo.update(id, { is_used: true, used_at: new Date() });
        return this.rewardsRepo.findOneOrFail({ where: { id } });
    }
    async getExpiringRewards(days = 7) {
        const now = new Date();
        const future = new Date();
        future.setDate(future.getDate() + days);
        return this.rewardsRepo.createQueryBuilder('r')
            .leftJoinAndSelect('r.user', 'user')
            .where('r.is_used = false')
            .andWhere('r.expires_at >= :now', { now })
            .andWhere('r.expires_at <= :future', { future })
            .getMany();
    }
    getCreditsByUser(userId) {
        return this.creditsRepo.find({
            where: { user_id: userId },
            order: { created_at: 'DESC' },
        });
    }
    async grantCredits(userId, credits, note, grantedBy) {
        const credit = this.creditsRepo.create({ user_id: userId, credits, note, granted_by: grantedBy });
        return this.creditsRepo.save(credit);
    }
    async getTotalCredits(userId) {
        const result = await this.creditsRepo.createQueryBuilder('c')
            .select('SUM(c.credits)', 'total')
            .where('c.user_id = :userId', { userId })
            .getRawOne();
        return parseInt((result === null || result === void 0 ? void 0 : result.total) || '0');
    }
};
exports.PromoService = PromoService;
exports.PromoService = PromoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(promo_reward_entity_1.PromoReward)),
    __param(1, (0, typeorm_1.InjectRepository)(promo_credit_entity_1.PromoCredit)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PromoService);
//# sourceMappingURL=promo.service.js.map