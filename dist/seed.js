"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const ds = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    entities: [__dirname + '/entities/*.entity{.ts,.js}'],
});
async function seed() {
    await ds.initialize();
    console.log('Connected to database');
    const userRepo = ds.getRepository('User');
    const branchRepo = ds.getRepository('Branch');
    const serviceRepo = ds.getRepository('Service');
    const barberRepo = ds.getRepository('Barber');
    const scheduleRepo = ds.getRepository('Schedule');
    const existingUsers = await userRepo.count();
    if (existingUsers > 0) {
        console.log('Database already seeded, skipping...');
        await ds.destroy();
        return;
    }
    const admin = await userRepo.save(userRepo.create({ phone: '081234567890', name: 'Admin', role: 'admin' }));
    const customer1 = await userRepo.save(userRepo.create({ phone: '081111111111', name: 'Budi', role: 'customer' }));
    const customer2 = await userRepo.save(userRepo.create({ phone: '082222222222', name: 'Andi', role: 'customer' }));
    const customer3 = await userRepo.save(userRepo.create({ phone: '083333333333', name: 'Sari', role: 'customer' }));
    console.log('Users created');
    await branchRepo.save([
        branchRepo.create({ name: 'Kingpin Barbershop - Sudirman', address: 'Jl. Sudirman No. 123, Jakarta Pusat', phone: '021-1234567', open_time: '09:00', close_time: '21:00' }),
        branchRepo.create({ name: 'Kingpin Barbershop - Kemang', address: 'Jl. Kemang Raya No. 45, Jakarta Selatan', phone: '021-7654321', open_time: '10:00', close_time: '22:00' }),
        branchRepo.create({ name: 'Kingpin Barbershop - BSD', address: 'BSD Green Office Park, Tangerang', phone: '021-9876543', open_time: '09:00', close_time: '20:00' }),
    ]);
    console.log('Branches created');
    const svc1 = await serviceRepo.save(serviceRepo.create({ name: 'Reguler Haircut', description: 'Potongan rambut reguler dengan cuci rambut', price: 50000, duration: 30, category: 'Reguler' }));
    const svc2 = await serviceRepo.save(serviceRepo.create({ name: 'Premium Haircut', description: 'Potongan premium + styling + hair tonic', price: 85000, duration: 45, category: 'Premium' }));
    const svc3 = await serviceRepo.save(serviceRepo.create({ name: 'Kids Haircut', description: 'Potongan rambut anak dengan suasana menyenangkan', price: 40000, duration: 25, category: 'Kids' }));
    const svc4 = await serviceRepo.save(serviceRepo.create({ name: 'Beard Trim', description: 'Trim jenggot dan kumis dengan rapi', price: 35000, duration: 20, category: 'Grooming' }));
    const svc5 = await serviceRepo.save(serviceRepo.create({ name: 'Hair Color', description: 'Pewarnaan rambut dengan produk berkualitas', price: 150000, duration: 90, category: 'Premium' }));
    console.log('Services created');
    const barber1 = await barberRepo.save(barberRepo.create({ name: 'Rizky', phone: '081999999999', bio: 'Barber berpengalaman 5 tahun, spesialis fade dan undercut', specialties: 'Fade,Undercut,Pompadour' }));
    const barber2 = await barberRepo.save(barberRepo.create({ name: 'Dimas', phone: '081888888888', bio: 'Spesialis gaya klasik dan modern', specialties: 'Classic,Modern,Textured Crop' }));
    const barber3 = await barberRepo.save(barberRepo.create({ name: 'Fajar', phone: '081777777777', bio: 'Barber muda dengan gaya trendy', specialties: 'Korean Style,Buzz Cut,Crew Cut' }));
    console.log('Barbers created');
    for (const barber of [barber1, barber2, barber3]) {
        for (let day = 1; day <= 6; day++) {
            await scheduleRepo.save(scheduleRepo.create({ barber_id: barber.id, day_of_week: day, open_time: '09:00', close_time: '18:00' }));
        }
    }
    console.log('Schedules created');
    console.log('Seed completed successfully!');
    await ds.destroy();
}
seed().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map