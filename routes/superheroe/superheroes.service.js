const mongoose = require('mongoose');
const SuperHeroe = require('./superheroe.model');

class SuperHeroeService {
    static async addSuperHeroe(req, res) {
        try {
            console.log('POST /superheroe');
            const id = req.body.id;

            let superheroeDB = await SuperHeroe.findOne({id: id});

            if (superheroeDB) {
                if (req.body.id == superheroeDB.id) {
                    throw new BadRequest({message: 'character id already exists'});
                }
            }
            const superheroe = new SuperHeroe(req.body);
            await superheroe.save();
            res.status(200).send(superheroe);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async getSuperHeroes(req, res) {
        try {
            console.log('GET /superheroe');
            console.log(req.query);
            const superheroe = await SuperHeroe.find(req.query);
            res.send(superheroe);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async deleteSuperHeroe(req, res) {
        try {
            console.log('DELETE /superheroe/:id');
            console.log(req.params.id);
            const superheroe = await SuperHeroe.findById(req.params.id);
            superheroe.delete();
            res.status(200).send({message: 'superheroe has been remove to favourite list'});
        } catch (err) {
            res.status(500).send(err);
        }
    }

}

module.exports = SuperHeroeService;