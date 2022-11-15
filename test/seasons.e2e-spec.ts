import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { Repository } from 'typeorm';

import { SeasonsModule } from '../src/modules/seasons/seasons.module';
import { SeasonEntity } from 'src/entities/season.entity';

import * as testDataJson from './testData.json';
import { TestDataBaseModule } from './databaseTest.module';

describe('Seasons', () => {
    let app: INestApplication;
    let repository: Repository<SeasonEntity>;
    const testSeasonVal = 0;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                AutomapperModule.forRoot({ strategyInitializer: classes() }),
                TestDataBaseModule,
                SeasonsModule, 
            ],
        })
        .compile();
        
        app = moduleRef.createNestApplication();
        await app.init();

        repository = moduleRef.get<Repository<SeasonEntity>>('SeasonEntityRepository');
    });

    afterEach(async () => {
        await repository.query('DELETE FROM season;');
    });

    afterAll(async () => {
        await app.close();
    });
    
    it('/GET seasons', async () => {
        const response = await repository.save(testDataJson);

        return request(app.getHttpServer())
            .get('/seasons')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(response);
    });
        
    it('/GET single season', async () => {
        const response = await repository.save(testDataJson);

        return request(app.getHttpServer())
            .get(`/seasons/${response[testSeasonVal].id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(response[testSeasonVal]);
    });
    
    it('/POST create season', async () => {
        const body = testDataJson[testSeasonVal];

        const response = await request(app.getHttpServer())
            .post('/seasons')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(res => {
                const { id, ...resBody } = res.body;
                return resBody === body;
            });

        return await request(app.getHttpServer())
            .get(`/seasons/${response.body.id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(response.body);
            
    });

    it('/POST user cannot create season id', async () => {
        const body = { 
            id: 1, 
            seasonNumber: testDataJson[testSeasonVal].seasonNumber,
            year: testDataJson[testSeasonVal].year,
            image_url: testDataJson[testSeasonVal].image_url,
            winnerId: testDataJson[testSeasonVal].winnerId
        };

        return await request(app.getHttpServer())
            .post('/seasons')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(res => {
                return res.body.id !== body.id;
            });
    });

});