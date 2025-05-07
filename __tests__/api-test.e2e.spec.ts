// @ts-ignore
import request from "supertest";
// @ts-ignore
import express from "express";
import {httpStatus} from "../src/core/types/httpStatuses";
import {setupApp} from "../src/setup-app";
import {PATH} from "../src/core/path/path";
import {InputVideo} from "../src/video/dto/input-video";
import {Video, VideoResolutions} from "../src/video/types/Video";
import {UpdateVideo} from "../src/video/dto/update-video";

const testVideo:InputVideo = {
    title: 'Test title',
    author: 'Test author',
    availableResolutions: [VideoResolutions.P144, VideoResolutions.P480]
}
describe("Driver API", () => {
    const app = express();
    setupApp(app);

    //correct
    beforeAll(async () => {
        await request(app)
            .delete(`${PATH.testing}/all-data`)
            .expect(httpStatus.NoContent);
    });

    // Тест на создание нового видео (POST /videos)
    it('should add a new video', async () => {
        // 1. Создаем тестовые данные
        const newVideoData: InputVideo = testVideo;  //Используем заранее заготовленные данные

        // 2. Отправляем POST-запрос на /videos с данными
        const response = await request(app)
            .post(PATH.videos)
            .send(newVideoData) // Отправляем данные в теле запроса
            .expect(httpStatus.Created); // Ожидаем статус 201 Created

        // 3. Проверяем, что в ответе есть созданный видео
        const createdVideo: Video = response.body;
        expect(createdVideo).toBeDefined(); //Проверка, что объект создан
        expect(createdVideo.title).toBe(newVideoData.title); // Проверка, что название совпадает
        expect(createdVideo.author).toBe(newVideoData.author); // Проверка, что автор совпадает
        expect(createdVideo.availableResolutions).toEqual(newVideoData.availableResolutions);

        // 4. (Необязательно) Проверяем, что видео добавлено в базу данных (или другое хранилище)
        const getAllResponse = await request(app) //  Получаем все видео для проверки
            .get(PATH.videos)
            .expect(httpStatus.Ok);
        expect(getAllResponse.body).toBeInstanceOf(Array);
        const addedVideo = getAllResponse.body.find((v: Video) => v.id === createdVideo.id); // Ищем созданное видео
        expect(addedVideo).toBeDefined();
    });
    //incorrect
    // it('should create video', async ()=>{
    //     const video:InputVideo={...testVideo, title: 'Test video title'};
    //     await request(app)
    //         .post(PATH.videos)
    //         .send({ data: video })
    //         .expect(httpStatus.Created);
    // });
    //короче, как я понял, не нужно никаких data. Такого нету, есть просто params, headers и body
    //correct
    it('should return all videos', async  ()=>{
        await request(app).get(PATH.videos).expect(httpStatus.Ok)
    });
    //correct
    it('should add two videos', async ()=>{
       const video1 = {...testVideo, title: 'Video1'};
       const video2={...testVideo, title:'Video2'};

        await request(app)
           .post(PATH.videos)
           .send(video1)
           .expect(httpStatus.Created);
       await request(app)
           .post(PATH.videos)
           .send(video2)
           .expect(httpStatus.Created);
       const db = await request(app).get(PATH.videos).expect(httpStatus.Ok);
       expect(db.body).toBeInstanceOf(Array);
       expect(db.body.length).toBeGreaterThanOrEqual(2);
    });
    //correct
    it('should change video', async ()=>{
       const newVideo= {...testVideo, title: 'Title to change'};
       const video = await request(app).post(PATH.videos).send(newVideo).expect(httpStatus.Created);
        //Проверяем, что в ответе есть созданный видео
        const createdVideo: Video = video.body;
        expect(createdVideo).toBeDefined();

        const changes: UpdateVideo = {
            title: testVideo.title,
            author: testVideo.author,
            canBeDownloaded: true,
            minAgeRestriction: 16,
            publicationDate: new Date().toISOString(),
            availableResolutions: [VideoResolutions.P360,VideoResolutions.P1080]
        };
        const id = createdVideo.id;
        await request(app).put(`${PATH.videos}/${id.toString()}`).send(changes).expect(httpStatus.NoContent);
        const response = await request(app).get(`${PATH.videos}/${id.toString()}`).expect(httpStatus.Ok);
        expect(response).toBeDefined();
        expect(response.body.id === id);
    });
    it('should remove video by id', async ()=>{
       const newVideo = {...testVideo, title: 'title to remove'};
       const video1 = await request(app).post(PATH.videos).send(newVideo).expect(httpStatus.Created);
       const createdVideo1: Video = video1.body;
       expect(createdVideo1).toBeDefined();
       const secondVideo = {...testVideo, title:'Another video'};
       const video2 = await request(app).post(PATH.videos).send(secondVideo).expect(httpStatus.Created);
       const createdVideo2: Video = video2.body;
       expect(createdVideo2).toBeDefined();
       const videos = await request(app).get(PATH.videos).expect(httpStatus.Ok);
       const db = videos.body;
       expect(db).toBeInstanceOf(Array);
       expect(db.length===2);

       await request(app).delete(`${PATH.videos}/${createdVideo1.id.toString()}`).expect(httpStatus.NoContent);
       const afterVideos = await request(app).get(PATH.videos).expect(httpStatus.Ok);
       const afterDB = afterVideos.body;
       expect(afterDB).toBeInstanceOf(Array);
       expect(afterDB.length===1);
    });
    it('should remove video', async ()=>{
        const newVideo = {...testVideo, title: 'title to remove'};
        const video1 = await request(app).post(PATH.videos).send(newVideo).expect(httpStatus.Created);
        const createdVideo1: Video = video1.body;
        expect(createdVideo1).toBeDefined();
        await request(app).delete(`${PATH.videos}/${createdVideo1.id}`).expect(httpStatus.NoContent);
        const videos = await request(app).get(PATH.videos).expect(httpStatus.Ok);
        const db = videos.body;
        expect(db).toBeInstanceOf(Array);
        expect(db.length===0);

        const secondVideo = {...testVideo, title:'Another video'};
        const video2 = await request(app).post(PATH.videos).send(secondVideo).expect(httpStatus.Created);
        const createdVideo2: Video = video2.body;
        expect(createdVideo2).toBeDefined();

        const videos2 = await request(app).get(PATH.videos).expect(httpStatus.Ok);
        const db2 = videos2.body;
        expect(db2).toBeInstanceOf(Array);
        expect(db2.length===1);

        expect(createdVideo1.id !== db2.id );
    })
});