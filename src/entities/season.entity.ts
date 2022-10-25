import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity('season')
export class SeasonEntity {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number

    @AutoMap()
    @Column()
    seasonNumber: string

    @AutoMap()
    @Column()
    winnerId?: number

    @AutoMap()
    @Column()
    image_url: string

    @AutoMap()
    @Column()
    year: number
}