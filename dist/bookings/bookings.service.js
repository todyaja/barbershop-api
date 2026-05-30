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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_entity_1 = require("../entities/booking.entity");
let BookingsService = class BookingsService {
    constructor(repo) {
        this.repo = repo;
    }
    findAll(filters) {
        const qb = this.repo.createQueryBuilder('booking')
            .leftJoinAndSelect('booking.customer', 'customer')
            .leftJoinAndSelect('booking.barber', 'barber')
            .leftJoinAndSelect('booking.service', 'service')
            .leftJoinAndSelect('booking.branch', 'branch')
            .orderBy('booking.date', 'DESC')
            .addOrderBy('booking.time', 'ASC');
        if (filters === null || filters === void 0 ? void 0 : filters.customerId)
            qb.andWhere('booking.customer_id = :customerId', { customerId: filters.customerId });
        if (filters === null || filters === void 0 ? void 0 : filters.barberId)
            qb.andWhere('booking.barber_id = :barberId', { barberId: filters.barberId });
        if (filters === null || filters === void 0 ? void 0 : filters.status)
            qb.andWhere('booking.status = :status', { status: filters.status });
        if (filters === null || filters === void 0 ? void 0 : filters.dateFrom)
            qb.andWhere('booking.date >= :dateFrom', { dateFrom: filters.dateFrom });
        if (filters === null || filters === void 0 ? void 0 : filters.dateTo)
            qb.andWhere('booking.date <= :dateTo', { dateTo: filters.dateTo });
        return qb.getMany();
    }
    findOne(id) {
        return this.repo.createQueryBuilder('booking')
            .leftJoinAndSelect('booking.customer', 'customer')
            .leftJoinAndSelect('booking.barber', 'barber')
            .leftJoinAndSelect('booking.service', 'service')
            .leftJoinAndSelect('booking.branch', 'branch')
            .where('booking.id = :id', { id })
            .getOneOrFail();
    }
    findTodays() {
        const today = new Date().toISOString().split('T')[0];
        return this.repo.createQueryBuilder('booking')
            .leftJoinAndSelect('booking.customer', 'customer')
            .leftJoinAndSelect('booking.barber', 'barber')
            .leftJoinAndSelect('booking.service', 'service')
            .leftJoinAndSelect('booking.branch', 'branch')
            .where('booking.date = :today', { today })
            .orderBy('booking.time', 'ASC')
            .getMany();
    }
    findByDate(date) {
        return this.repo.createQueryBuilder('booking')
            .leftJoinAndSelect('booking.customer', 'customer')
            .leftJoinAndSelect('booking.barber', 'barber')
            .leftJoinAndSelect('booking.service', 'service')
            .leftJoinAndSelect('booking.branch', 'branch')
            .where('booking.date = :date', { date })
            .orderBy('booking.time', 'ASC')
            .getMany();
    }
    create(data) {
        const booking = this.repo.create(data);
        return this.repo.save(booking);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async updateStatus(id, status) {
        await this.repo.update(id, { status });
        return this.findOne(id);
    }
    async remove(id) {
        await this.repo.delete(id);
    }
    async getStats() {
        const today = new Date().toISOString().split('T')[0];
        const totalBookings = await this.repo.count();
        const pendingBookings = await this.repo.count({ where: { status: 'pending' } });
        const completedBookings = await this.repo.count({ where: { status: 'completed' } });
        const todaysBookings = await this.repo.createQueryBuilder('b').where('b.date = :today', { today }).getCount();
        const revenueResult = await this.repo.createQueryBuilder('b')
            .select('SUM(b.total_price)', 'revenue')
            .where('b.status = :status', { status: 'completed' })
            .getRawOne();
        return {
            totalBookings,
            totalRevenue: parseFloat((revenueResult === null || revenueResult === void 0 ? void 0 : revenueResult.revenue) || '0'),
            pendingBookings,
            completedBookings,
            todaysBookings,
        };
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map