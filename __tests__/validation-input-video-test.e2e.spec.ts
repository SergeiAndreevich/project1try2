// @ts-ignore
import express from "express";
import {setupApp} from "../src/setup-app";
// @ts-ignore
import request from "supertest";
import {PATH} from "../src/core/path/path";
import {httpStatus} from "../src/core/types/httpStatuses";
import {InputVideo} from "../src/video/dto/input-video";
import {Video, VideoResolutions} from "../src/video/types/Video";
import {UpdateVideo} from "../src/video/dto/update-video";

describe('Validate input videos api', ()=> {
    const app = express();
    setupApp(app);

    const testVideo: InputVideo = {
        title: 'Test title',
        author: 'Test author',
        availableResolutions: [VideoResolutions.P144, VideoResolutions.P480]
    }

    //correct
    beforeAll(async () => {
        await request(app)
            .delete(`${PATH.testing}/all-data`)
            .expect(httpStatus.NoContent);
    });
    it('should not create video', async () => {
        const invalidDataSet1 = await request(app)
            .post(PATH.videos)
            .send({title: '     ', author: '    ', availableResolutions: ['P148']})
            .expect(httpStatus.BadRequest);

        expect(invalidDataSet1.body.errorMessages === 3);
        const response = await request(app).get(PATH.videos).expect(httpStatus.Ok);
        expect(response.body).toHaveLength(0);
    });
    it('should not create video', async () => {
        const invalidDataSet1 = await request(app)
            .post(PATH.videos)
            .send({title: 'A    ', author: 'A', availableResolutions: ['P148']})
            .expect(httpStatus.BadRequest);

        expect(invalidDataSet1.body.errorMessages === 2);
        const response = await request(app).get(PATH.videos).expect(httpStatus.Ok);
        expect(response.body).toHaveLength(0);
    });
    it('should not change video', async () => {
        const newVideo = await request(app)
            .post(PATH.videos)
            .send({title: 'A', author: 'As', availableResolutions: ['P144']})
            .expect(httpStatus.Created);


        const response = await request(app).get(PATH.videos).expect(httpStatus.Ok);
        //важно. Перечитай потом и обрати сюда вниание
        const newVideoVideoFormat:Video = newVideo.body;
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toBeInstanceOf(Object);
        expect(response.body[0].title== newVideoVideoFormat.title);

        const changes: UpdateVideo = {
            title: '',
            author: '',
            canBeDownloaded: true,
            minAgeRestriction: 16,
            publicationDate: new Date().toISOString(),
            availableResolutions: [VideoResolutions.P360,VideoResolutions.P1080]
        };
        const id = newVideoVideoFormat.id;
        const invalidDataSet = await request(app).put(`${PATH.videos}/${id.toString()}`).send(changes).expect(httpStatus.BadRequest);
        expect(invalidDataSet.body.errorMessages === 2);
    });
})