"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const branches_module_1 = require("./branches/branches.module");
const users_module_1 = require("./users/users.module");
const services_module_1 = require("./services/services.module");
const barbers_module_1 = require("./barbers/barbers.module");
const bookings_module_1 = require("./bookings/bookings.module");
const schedules_module_1 = require("./schedules/schedules.module");
const time_slots_module_1 = require("./time-slots/time-slots.module");
const payments_module_1 = require("./payments/payments.module");
const reviews_module_1 = require("./reviews/reviews.module");
const loyalty_module_1 = require("./loyalty/loyalty.module");
const promo_module_1 = require("./promo/promo.module");
const entities_1 = require("./entities");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    url: config.get('DATABASE_URL'),
                    entities: [
                        entities_1.Branch, entities_1.User, entities_1.Service, entities_1.Barber, entities_1.Booking, entities_1.Schedule,
                        entities_1.TimeSlot, entities_1.Payment, entities_1.Review, entities_1.LoyaltyStamp, entities_1.PromoReward, entities_1.PromoCredit,
                    ],
                    synchronize: true,
                }),
            }),
            auth_module_1.AuthModule,
            branches_module_1.BranchesModule,
            users_module_1.UsersModule,
            services_module_1.ServicesModule,
            barbers_module_1.BarbersModule,
            bookings_module_1.BookingsModule,
            schedules_module_1.SchedulesModule,
            time_slots_module_1.TimeSlotsModule,
            payments_module_1.PaymentsModule,
            reviews_module_1.ReviewsModule,
            loyalty_module_1.LoyaltyModule,
            promo_module_1.PromoModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map