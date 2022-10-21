import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class SeasonsUpdating1666213888459 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'season',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isGenerated: true,
                        isPrimary: true
                    },
                    {
                        name: 'seasonNumber',
                        type: 'varchar(20)',
                        isNullable: false
                    },
                    {
                        name: 'winnerId',
                        type: 'int',
                        isNullable: true
                    },
                    {
                        name: 'year',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'image_url',
                        type: 'varchar',
                        isNullable: false
                    }
                ]
            }),
             true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('season');
    }

}
