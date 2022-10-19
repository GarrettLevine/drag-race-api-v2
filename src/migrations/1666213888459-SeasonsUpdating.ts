import { MigrationInterface, QueryRunner } from "typeorm"

export class SeasonsUpdating1666213888459 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `Alter TABLE "seasons" ADD COLUMN "year" INTEGER NOT NULL`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "seasons" DROP COLUMN "year"`
        );
    }

}
