const router = require('express').Router();
const { all, create, deleteById } = require('../services/notes');
const { mapErrors } = require('../utils/parser');

router.get('/:id', async (req, res) => {
    try {
        const plannerId = req.params.id;
        const notes = await all(plannerId);
        res.json(notes);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

router.post('/:id', async (req, res) => {
    try {
        const plannerId = req.params.id;
        const note = await create(plannerId, req.body.description);
        res.json(note);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const note = await deleteById(id);
        res.json(note);
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

module.exports = router;