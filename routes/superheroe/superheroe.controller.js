const express = require('express');
const SuperHeroeService = require('./superheroe.service');
const superheroeRouter = express.Router();

superheroeRouter.get('/', SuperHeroeService.getSuperHeroes);

superheroeRouter.post('/', SuperHeroeService.addSuperHeroe);

superheroeRouter.delete('/:id/', SuperHeroeService.deleteSuperHeroe);

module.exports = superheroeRouter;