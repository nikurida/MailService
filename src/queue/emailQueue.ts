import sendEmail from '../services/emailService';
import type { EmailJob } from '../models/emailJob';
import queue from '../config/queueConfig';

const emailQueue = queue.process(async (job) => {
    try {
        await sendEmail(job.data);
        console.log('Email processed from queue:', job.data);
    } catch (error) {
        console.error('Failed to send email from queue:', error);
    }
});

export const addEmailToQueue = async (emailData: EmailJob) => {
    const job = await queue.add(emailData, {
        priority: emailData.priority
    }); 
    console.log(job);
};

export default emailQueue;
