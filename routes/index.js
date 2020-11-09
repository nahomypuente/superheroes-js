const express = require('express');
const superheroe = require('./superheroe/superheroe.controller');
const router = express.Router();

router.use('/superheroe', superheroe);

router.get('/', (req, res) => {
    res.status(200).json({
        superheroe: {
            GET: [
                '/superheroe',
            ],
            POST: [
                '/superheroe',
            ],
            DELETE: [
                '/superheroe/:id',
            ],
        }
    })
});
module.exports = router;