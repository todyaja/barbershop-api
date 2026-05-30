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
exports.TimeSlotsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const time_slots_service_1 = require("./time-slots.service");
let TimeSlotsController = class TimeSlotsController {
    constructor(service) {
        this.service = service;
    }
    findAvailable(barberId, date) {
        return this.service.findAvailable(barberId, date);
    }
    findByBarber(barberId, startDate, endDate) {
        return this.service.findByBarber(barberId, startDate, endDate);
    }
    create(data) {
        return this.service.create(data);
    }
    update(id, data) {
        return this.service.update(id, data);
    }
    book(id, bookingId) {
        return this.service.book(id, bookingId);
    }
    release(body) {
        return this.service.release(body.barberId, body.date, body.time);
    }
};
exports.TimeSlotsController = TimeSlotsController;
__decorate([
    (0, common_1.Get)('available'),
    __param(0, (0, common_1.Query)('barberId')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TimeSlotsController.prototype, "findAvailable", null);
__decorate([
    (0, common_1.Get)('barber/:barberId'),
    __param(0, (0, common_1.Param)('barberId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], TimeSlotsController.prototype, "findByBarber", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TimeSlotsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TimeSlotsController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/book'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('bookingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TimeSlotsController.prototype, "book", null);
__decorate([
    (0, common_1.Put)('release'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TimeSlotsController.prototype, "release", null);
exports.TimeSlotsController = TimeSlotsController = __decorate([
    (0, common_1.Controller)('time-slots'),
    __metadata("design:paramtypes", [time_slots_service_1.TimeSlotsService])
], TimeSlotsController);
//# sourceMappingURL=time-slots.controller.js.map