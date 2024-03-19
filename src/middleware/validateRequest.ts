import type { Request, Response, NextFunction } from 'express';
import type { AnySchema } from 'yup';
import { ValidationError } from 'yup';

const validateRequest = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error: unknown) {
        if (error instanceof ValidationError) {
            res.status(400).json({ error: error.errors });
        } else if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
};

export default validateRequest;

