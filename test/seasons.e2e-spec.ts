import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { Repository } from 'typeorm';

import { SeasonsModule } from '../src/modules/seasons/seasons.module';
import { SeasonEntity } from 'src/entities/season.entity';

import * as testData from './testData.json';
import { TestDataBaseModule } from './databaseTest.module';

describe('Seasons', () => {
    let app: INestApplication;
    let repository : Repository<SeasonEntity>;
    

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

        repository = moduleRef.get('SeasonEntityRepository');
    });

    afterEach(async () => {
        await repository.query('DELETE FROM season;');
    });

    afterAll(async () => {
        await app.close();
    });
    
    it('/GET seasons', async () => {
        await repository.save(testData);

        const expectedReturn = testData.map(season => {
            const { id, ...newSeason } = season;
            return newSeason;
        })

        return request(app.getHttpServer())
            .get('/seasons')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(expectedReturn);
    });
        
    it('/GET single season', async () => {
        const response = await repository.save(testData);
            
        const { id, ...filteredResponse } = response[0];
            
        return request(app.getHttpServer())
            .get(`/seasons/${id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(filteredResponse);
    });
    
    it('/POST create season', async () => {
        const { id: testId, ...body } = testData[0];
        
        const response = await request(app.getHttpServer())
            .post('/seasons')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(body);
        
        const { id: createdId, ...createdSeason } = response.body;

        // console.log(response.body);

        // return await request(app.getHttpServer())
        //     .get(`/seasons/${createdId}`)
        //     .set('Accept', 'application/json')
        //     .expect('Content-Type', /json/)
        //     .expect(200)
        //     .expect(createdSeason);
            
    });

});