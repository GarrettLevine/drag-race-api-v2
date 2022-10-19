import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Season {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    seasonNumber: string

    @Column({ nullable: true, type: "int" })
    winnerId?: number

    @Column()
    image_url: string

    @Column()
    year: number
}