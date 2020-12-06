import { Router } from 'express';

import AuthenticationUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const authenticateUser = new AuthenticationUserService();

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        return response.json({ user: userWithoutPassword, token });
    } catch (error) {
        return response.status(error.statusCode).json({ error: error.message });
    }
});

export default sessionsRouter;
