const express = require('express');
const SuperHeroeService = require('./superheroes.service');
const superheroeRouter = express.Router();

superheroeRouter.get('/', SuperHeroeService.getSuperHeroes);

superheroeRouter.post('/', SuperHeroeService.addSuperHeroe);

superheroeRouter.delete('/:id/', SuperHeroeService.deleteSuperHeroe);

module.exports = superheroeRouter;