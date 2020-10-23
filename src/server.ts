import path from 'path';
import 'dotenv/config';
import express  from 'express';

import './database/connection';
import 'express-async-errors';
import errorHandler from './errors/handler';
import routes from './routes';
import multer from 'multer';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(routes);
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/:id', (request, response) => {
    console.log(request.query);
    console.log(request.params);
    response.json('Seja bem vindo');
});

//  app.post('/orfanato', async (request, response) => {
//     const {
//         name,
//         latitude,
//         longitude,
//         about,
//         instructions,
//         opening_hours,
//         open_on_weekends
//     } = request.body; 

//     const orphanagesRepository = getRepository(Orphanage);

//     const orphanage = orphanagesRepository.create({
//         name,
//         latitude,
//         longitude,
//         about,
//         instructions,
//         opening_hours,
//         open_on_weekends
//     });

//     await orphanagesRepository.save(orphanage);








//     console.log(request.body);   
//     response.status(201).json(request.body);
// });




//app.use(errorHandler);

app.listen(process.env.PORT || 3333, () => {
    console.log("executando ");
})

