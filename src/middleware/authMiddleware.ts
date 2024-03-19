import { Request, Response, NextFunction } from 'express';

const TOKEN_SECRET = 'seu_token_secreto'; // Coloque seu token secreto aqui ou carregue de uma variável de ambiente

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    if (token !== `Bearer ${TOKEN_SECRET}`) {
        return res.status(403).json({ error: 'Invalid token' });
    }

    next();
};

export default authMiddleware;