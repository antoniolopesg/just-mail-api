import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';
import { SignUpService } from '../services/SignUpService';

const router = Router();

const usersController = new UsersController(new SignUpService());

router.post('/signup', usersController.store.bind(usersController));

export default router;
