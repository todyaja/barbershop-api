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
exports.LoyaltyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const loyalty_stamp_entity_1 = require("../entities/loyalty-stamp.entity");
let LoyaltyService = class LoyaltyService {
    constructor(repo) {
        this.repo = repo;
    }
    async getByUser(userId) {
        return this.repo.findOne({ where: { user_id: userId } });
    }
    async addStamp(userId) {
        let stamp = await this.repo.findOne({ where: { user_id: userId } });
        if (!stamp) {
            stamp = this.repo.create({ user_id: userId, stamp_count: 1 });
            return this.repo.save(stamp);
        }
        stamp.stamp_count = Math.min(stamp.stamp_count + 1, 7);
        stamp.last_updated_at = new Date();
        return this.repo.save(stamp);
    }
    async resetStamps(userId) {
        let stamp = await this.repo.findOne({ where: { user_id: userId } });
        if (!stamp) {
            stamp = this.repo.create({ user_id: userId, stamp_count: 0 });
            return this.repo.save(stamp);
        }
        stamp.stamp_count = 0;
        stamp.last_updated_at = new Date();
        return this.repo.save(stamp);
    }
};
exports.LoyaltyService = LoyaltyService;
exports.LoyaltyService = LoyaltyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(loyalty_stamp_entity_1.LoyaltyStamp)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LoyaltyService);
//# sourceMappingURL=loyalty.service.js.map