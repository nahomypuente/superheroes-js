const mongoose = require('mongoose');
const SuperHeroe = require('./superheroe.model');

class SuperHeroeService {
    static async addSuperHeroe(req, res) {
        try {
            console.log('POST /superheroe');
            const id_character = req.body.id;

            let superheroeDB = await SuperHeroe.findOne({id_character});
            console.log(superheroeDB);
            if (superheroeDB) {
                if (req.body.id == superheroeDB.id_character) {
                    throw new({message: 'character id already exists'});
                }
            }
            const superheroe = new SuperHeroe();
            superheroe.id_character = req.body.id;
            superheroe.name = req.body.name;
            superheroe.description = req.body.description;
            superheroe.image = req.body.image;
            await superheroe.save();
            res.status(200).send(superheroe);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async getSuperHeroes(req, res) {
        try {
            console.log('GET /superheroe');
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