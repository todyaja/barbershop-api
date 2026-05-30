import { Barber } from './barber.entity';
export declare class Schedule {
    id: string;
    barber_id: string;
    barber: Barber;
    day_of_week: number;
    open_time: string;
    close_time: string;
    is_closed: boolean;
    created_at: Date;
    updated_at: Date;
}
