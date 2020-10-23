import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import orphanageView from '../views/orphanages_view';
import Orfanato from '../models/Orphanage'
import Orphanage from '../models/Orphanage';

export default {

   async index(request: Request, response: Response) {
    const orphanageRepositoriy = getRepository(Orphanage);
    const orphanages =  await orphanageRepositoriy.find(
    {
       relations: ['images']
    });
    
    return response.json(orphanageView.renderMany(orphanages));

 },

 async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanageRepositoriy = getRepository(Orphanage);
    
    const orphanage =  await orphanageRepositoriy.findOneOrFail(id,
    {
       relations: ['images']
    });
    
    return response.json(orphanageView.render(orphanage));

 },

 async create(request: Request, response: Response) {
   console.log(request.body); 
   const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
   } = request.body; 



  const requestImages = request.files as Express.Multer.File[];
  
  const images = requestImages.map(image => {
   return { path: image.filename }
  });

  const orphanagesRepository = getRepository(Orphanage);     

  const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images    
  };

  const schema = Yup.object().shape({
      name: Yup.string().required(), 
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(Yup.object().shape({
         path: Yup.string().required()
      })
     )
    });

    await schema.validate(data, {
       abortEarly: false,
    })

    const orphanage = orphanagesRepository.create(data);

    
  
   await orphanagesRepository.save(orphanage);
 
    return response.status(201).json(orphanageView.render(orphanage));
 
  }
};