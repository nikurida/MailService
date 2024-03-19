import Bull from 'bull';
import nodemailer from 'nodemailer';
import type { EmailJob } from '../models/emailJob';

const emailQueue = new Bull<EmailJob>('emailQueue', {
    redis: { host: 'localhost', port: 6379 }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const addEmailToQueue = async (emailData: EmailJob) => {
    await emailQueue.add(emailData, {
        priority: emailData.priority
    });
};

emailQueue.process(async (job) => {
    const { to, cc, bcc, subject, text, body } = job.data;

    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_ADDRESS,
            to,
            cc,
            bcc,
            subject,
            text,
            html: body
        });

        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
});
