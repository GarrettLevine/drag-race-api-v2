import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('season')
export class SeasonEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    seasonNumber: string

    @Column()
    winnerId?: number

    @Column()
    image_url: string

    @Column()
    year: number
}