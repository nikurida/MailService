import type { Request, Response } from 'express';
import { addEmailToQueue } from '../queue/emailQueue';
import type { EmailJob } from '../models/emailJob';

export const enqueueEmail = async (req: Request, res: Response) => {
    try {
        const emailData: EmailJob = req.body;
        await addEmailToQueue(emailData);
        res.status(200).json({ message: 'Email added to queue' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error processing request' });
    }
};
