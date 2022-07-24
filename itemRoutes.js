const express = require('express');
const router = new express.Router();
let items = require('./fakeDb');

router.get('/', (req, res) => {
    return res.json(items);
});

router.post('/', (req, res) => {
    items.push(req.body);
    return res.json({
        "added": req.body
    })
});

router.get('/:name', (req, res) => {
    items.forEach((item) => {
        if (req.params['name'] === item.name) {
            return res.json(item);
        }
    })
});

router.patch('/:name', (req, res) => {
    items.forEach((item) => {
        if (req.params['name'] === item.name) {
            item.name = req.body['name'];
            return res.json({
                "updated": req.body
            });
        }
    })
});

router.delete('/:name', (req, res) => {
    items.forEach((item) => {
        if (req.params['name'] === item.name) {
            items.splice(items.indexOf(item), 1);
            return res.json({
                "message": "Deleted"
            })
        }
    })
})

module.exports = router;