import { Request, Response, Router } from 'express';
import {httpStatus} from "../core/types/httpStatuses";
import {InputVideo} from "../video/dto/input-video";
import {Video} from "../video/types/Video";
import {repository} from "../core/repository/data-acsess-layer";
import {UpdateVideo} from "../video/dto/update-video";
import {restart} from "nodemon";
import {validateVideo} from "../video/validation/input-video-validation";
import {createErrorsMessages} from "../core/utils/create-error-message";


export const videosRouter = Router({});

videosRouter
    .get('', (req: Request, res: Response) => {
        const videos = repository.findAllVideos();
        res.status(httpStatus.Ok).send(videos)
    })
    .get('/:id', (req:Request,res:Response)=>{
        const id = parseInt(req.params.id);
        const video = repository.findVideo(id);
        if(video === null){
            res.status(httpStatus.NotFound).send('Error message');
            return
        }
        res.status(httpStatus.Ok).send(video)
        //ты так и не разобрался с датами в формате ISO
    })
    .post('',(req:Request<{},{},InputVideo>,res:Response)=>{
        // Request<{}, {}, DriverInputDto>: Request - это тип, импортированный из библиотеки express. <> указывают на использование дженериков (generics), чтобы уточнить типы данных, связанные с запросом.
        // {}: Первый дженерик указывает тип для req.params (параметры маршрута). Пустой объект {} означает, что параметры маршрута не ожидаются (например, /users/:id был бы примером маршрута с параметром id). '' в .post('') также подтверждает, что параметров маршрута нет.
        //
        // {}: Второй дженерик указывает тип для req.query (параметры строки запроса). Пустой объект {} означает, что параметры строки запроса не ожидаются (например, ?name=John&age=30 был бы примером строки запроса).
        //
        // InputVideo: Третий дженерик (самый важный в данном случае!) указывает тип для req.body (тело запроса).

        //errors и проверка валидации
        const errors = validateVideo(req.body);
        if(errors.length>0){
            res.status(httpStatus.BadRequest).send(createErrorsMessages(errors));
            return
        }
        const newVideo: Video = {
            id: new Date().getTime(),
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: req.body.canBeDownloaded ?? false,
            minAgeRestriction: req.body.minAgeRestriction ?? null,
            createdAt: req.body.createdAt || new Date().toISOString(),
            publicationDate: req.body.publicationDate ||  new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            availableResolutions: req.body.availableResolutions
        };
        repository.createVideo(newVideo);
        const video = repository.findVideo(newVideo.id);
        res.status(httpStatus.Created).send(video)
    })
    .put('/:id',(req:Request<{id:string},{},UpdateVideo>,res:Response)=>{
        const id = parseInt(req.params.id);
        const video = repository.findVideo(id);
        if(video === null){
            res.status(httpStatus.NotFound).send('Video not found');
            return
        }
        //делаем валидацию и затем
        const errors = validateVideo(req.body);
        if(errors.length>0){
            res.status(httpStatus.BadRequest).send(createErrorsMessages(errors));
            return
        }
        repository.udpateVideo(video,req.body);
        res.status(httpStatus.NoContent).send('Updated')
    })
    .delete('/:id',(req:Request,res:Response)=>{
        const id = parseInt(req.params.id);
        const index = repository.findIndex(id);
        if(index === -1){
            res.status(httpStatus.NotFound).send('Video not found');
            return
        }
        repository.removeVideo(id)
        res.status(httpStatus.NoContent).send('Deleted')
    })