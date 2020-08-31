import { Request, Response } from 'express';

import db from '../database/connection';

class LiveController {
    async show(request: Request, response: Response){
        const atualTime = new Date().toLocaleString();
        const isoAtualTime = new Date(atualTime).toISOString();

        const { flag } = request.params;
        const date = new Date();

        if(!flag){
            return response.status(400).json({
                error: "Missing filters to search lives"
            })
        }

        if(flag === "next")
        {
        const lives = await db('lives')
            .where('liveDate', '>=', isoAtualTime)
            .select(['lives.*']);

            return response.json({"content":lives});

        }else if(flag === "previous"){
        const lives = await db('lives')
            .where('liveDate', '<', isoAtualTime)
            .select(['lives.*']);

            return response.json({"content":lives});

        }
    }

    async create(request: Request, response: Response){
        const {
            liveName,
            channelName,
            liveDate,
            liveTime,
            liveLink
        } = request.body;
     
        const trx = await db.transaction();
        
        const registrationDate = new Date().toLocaleString();
        const liveDateFormated =  new Date(liveDate).toISOString();

      try{
         const insertedUsersIds = await trx('lives').insert({
            liveName,
            channelName,
            liveDate: liveDateFormated,
            liveTime,
            liveLink,
            registrationDate
         });
                  
         await trx.commit();
         return response.status(201).send();
      
         }catch(err){
             await trx.rollback();
            console.log(err);
             return response.status(400).json({
                 error: "Unexpected error while creating new Live"
             })
         }
    }
}

export default LiveController