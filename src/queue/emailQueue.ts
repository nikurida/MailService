// src/queue/emailQueue.ts

import Bull from 'bull';
import sendEmail from '../services/emailService';
import type { EmailJob } from '../models/emailJob';

const emailQueue = new Bull<EmailJob>('emailQueue', {
    redis: { host: 'localhost', port: 6379 }
});

emailQueue.process(async (job) => {
    try {
        await sendEmail(job.data);
        console.log('Email processed from queue:', job.data);
    } catch (error) {
        console.error('Failed to send email from queue:', error);
        throw error;
    }
});

export const addEmailToQueue = async (emailData: EmailJob) => {
    await emailQueue.add(emailData, {
        priority: emailData.priority
    });
};

export default emailQueue;
