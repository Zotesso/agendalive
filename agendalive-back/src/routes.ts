import express from 'express';

import LiveController from './controllers/LiveController';

const routes = express.Router();

const liveController = new LiveController();

routes.get('/lives/:flag', liveController.show);

routes.post('/lives', liveController.create);

export default routes;