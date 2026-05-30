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
exports.TimeSlotsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const time_slot_entity_1 = require("../entities/time-slot.entity");
let TimeSlotsService = class TimeSlotsService {
    constructor(repo) {
        this.repo = repo;
    }
    findAvailable(barberId, date) {
        return this.repo.find({
            where: { barber_id: barberId, date, is_available: true },
            order: { time: 'ASC' },
        });
    }
    findByBarber(barberId, startDate, endDate) {
        return this.repo.createQueryBuilder('ts')
            .where('ts.barber_id = :barberId', { barberId })
            .andWhere('ts.date >= :startDate', { startDate })
            .andWhere('ts.date <= :endDate', { endDate })
            .orderBy('ts.date', 'ASC')
            .addOrderBy('ts.time', 'ASC')
            .getMany();
    }
    create(data) {
        const slot = this.repo.create(data);
        return this.repo.save(slot);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.repo.findOneOrFail({ where: { id } });
    }
    async book(id, bookingId) {
        await this.repo.update(id, { is_available: false, booking_id: bookingId });
        return this.repo.findOneOrFail({ where: { id } });
    }
    async release(barberId, date, time) {
        const slot = await this.repo.findOneOrFail({ where: { barber_id: barberId, date, time } });
        slot.is_available = true;
        slot.booking_id = null;
        return this.repo.save(slot);
    }
};
exports.TimeSlotsService = TimeSlotsService;
exports.TimeSlotsService = TimeSlotsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(time_slot_entity_1.TimeSlot)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TimeSlotsService);
//# sourceMappingURL=time-slots.service.js.map