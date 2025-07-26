import express from 'express';
import { handleUserSignup } from '../controllers/user';

const router = express.Router();

router.post('/', handleUserSignup)
