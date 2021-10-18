import express from 'express';
import userRouter from './user';
import albumRouter from './album';
import authRouter from './auth';
import songRouter from './song';
import artistRouter from './artist';

const router = express.Router();

router.use('/user', userRouter);
router.use('/artist', artistRouter);
router.use('/album', albumRouter);
router.use('/auth', authRouter);
router.use('/song', songRouter);

module.exports = router;
