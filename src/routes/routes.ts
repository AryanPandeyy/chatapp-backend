import { Router } from 'express';
import { signup } from '../controllers/signup';
import { login } from '../controllers/login';

const routes = () => {
    const router = Router();
    router.post('/signup', signup);
    router.post('/login', login);
    return router;
}
export { routes };
