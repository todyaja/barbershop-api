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
exports.PromoController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const promo_service_1 = require("./promo.service");
let PromoController = class PromoController {
    constructor(service) {
        this.service = service;
    }
    getRewardsByUser(userId) {
        return this.service.getRewardsByUser(userId);
    }
    createReward(data) {
        return this.service.createReward(data);
    }
    markRewardAsUsed(id) {
        return this.service.markRewardAsUsed(id);
    }
    getExpiringRewards(days) {
        return this.service.getExpiringRewards(days ? parseInt(days) : 7);
    }
    getCreditsByUser(userId) {
        return this.service.getCreditsByUser(userId);
    }
    getTotalCredits(userId) {
        return this.service.getTotalCredits(userId);
    }
    grantCredits(body) {
        return this.service.grantCredits(body.userId, body.credits, body.note, body.grantedBy);
    }
};
exports.PromoController = PromoController;
__decorate([
    (0, common_1.Get)('rewards/:userId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PromoController.prototype, "getRewardsByUser", null);
__decorate([
    (0, common_1.Post)('rewards'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PromoController.prototype, "createReward", null);
__decorate([
    (0, common_1.Post)('rewards/:id/use'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PromoController.prototype, "markRewardAsUsed", null);
__decorate([
    (0, common_1.Get)('rewards/expiring'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Query)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PromoController.prototype, "getExpiringRewards", null);
__decorate([
    (0, common_1.Get)('credits/:userId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PromoController.prototype, "getCreditsByUser", null);
__decorate([
    (0, common_1.Get)('credits/:userId/total'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PromoController.prototype, "getTotalCredits", null);
__decorate([
    (0, common_1.Post)('credits'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PromoController.prototype, "grantCredits", null);
exports.PromoController = PromoController = __decorate([
    (0, common_1.Controller)('promo'),
    __metadata("design:paramtypes", [promo_service_1.PromoService])
], PromoController);
//# sourceMappingURL=promo.controller.js.map