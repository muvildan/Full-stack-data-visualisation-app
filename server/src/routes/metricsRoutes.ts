import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send('You are in the API!');
});

router.post('/', (_req, res) => {
    res.send('You have posted to the API!');
});

export default router;